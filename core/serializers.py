from rest_framework import serializers
from .models import KiloKaydi, SuTakibi, KullaniciHedefi

class KiloSerializer(serializers.ModelSerializer):
    class Meta:
        model = KiloKaydi
        fields = '__all__'

class SuSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuTakibi
        fields = '__all__'

class HedefSerializer(serializers.ModelSerializer):
    class Meta:
        model = KullaniciHedefi
        fields = '__all__'