from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import KiloKaydi, SuTakibi, KullaniciHedefi
from .serializers import KiloSerializer, SuSerializer, HedefSerializer
from datetime import date

class KiloViewSet(viewsets.ModelViewSet):
    queryset = KiloKaydi.objects.all().order_by('tarih')
    serializer_class = KiloSerializer

    # Aynı tarihe mükerrer kayıt girmesin, güncellesin
    def perform_create(self, serializer):
        tarih = serializer.validated_data['tarih']
        obj, created = KiloKaydi.objects.update_or_create(
            tarih=tarih,
            defaults={'kilo': serializer.validated_data['kilo']}
        )
        return obj

class SuViewSet(viewsets.ModelViewSet):
    queryset = SuTakibi.objects.all().order_by('-tarih')
    serializer_class = SuSerializer

    @action(detail=False, methods=['post'])
    def tarihli_islem(self, request):
        secilen_tarih = request.data.get('tarih', date.today())
        islem = request.data.get('islem') # 'arttir', 'azalt', 'set'
        miktar = request.data.get('miktar', 1)

        kayit, created = SuTakibi.objects.get_or_create(tarih=secilen_tarih)
        
        if islem == 'arttir':
            kayit.bardak_sayisi += 1
        elif islem == 'azalt' and kayit.bardak_sayisi > 0:
            kayit.bardak_sayisi -= 1
        elif islem == 'set': # Doğrudan sayı girmek için
            kayit.bardak_sayisi = int(miktar)
            
        kayit.save()
        return Response(SuSerializer(kayit).data)

    @action(detail=False, methods=['get'])
    def bugun(self, request):
        # Frontend kolaylığı için bugünü getiren endpoint
        bugun_tarih = date.today()
        kayit, _ = SuTakibi.objects.get_or_create(tarih=bugun_tarih)
        return Response(SuSerializer(kayit).data)

class HedefViewSet(viewsets.ModelViewSet):
    queryset = KullaniciHedefi.objects.all().order_by('-olusturulma')
    serializer_class = HedefSerializer