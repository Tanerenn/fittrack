from django.db import models

class KiloKaydi(models.Model):
    tarih = models.DateField()
    kilo = models.DecimalField(max_digits=5, decimal_places=1)
    notlar = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.tarih} - {self.kilo}"

class SuTakibi(models.Model):
    tarih = models.DateField()
    bardak_sayisi = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.tarih} - {self.bardak_sayisi}"

# YENİ EKLENEN MODEL
class KullaniciHedefi(models.Model):
    HEDEF_SECENEKLERI = [
        ('VER', 'Kilo Vermek'),
        ('AL', 'Kilo Almak'),
        ('KORU', 'Kiloyu Korumak'),
    ]
    baslangic_kilo = models.DecimalField(max_digits=5, decimal_places=1)
    hedef_kilo = models.DecimalField(max_digits=5, decimal_places=1)
    hedef_turu = models.CharField(max_length=10, choices=HEDEF_SECENEKLERI, default='VER')
    boy = models.IntegerField(help_text="cm cinsinden")
    cinsiyet = models.CharField(max_length=1, choices=[('E', 'Erkek'), ('K', 'Kadın')], default='E')
    dogum_tarihi = models.DateField(null=True, blank=True)
    olusturulma = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Hedef: {self.get_hedef_turu_display()}"