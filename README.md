# 🏋️‍♂️ FitTrack Pro - Akıllı Kilo ve Sağlık Takip Asistanı

FitTrack Pro, kullanıcıların kilo değişimlerini takip etmesini, su tüketimini izlemesini ve yapay zeka destekli analizlerle hedeflerine ulaşmasını sağlayan modern bir web uygulamasıdır.

<img width="1916" height="899" alt="image" src="https://github.com/user-attachments/assets/e534114b-fe42-4cde-b80a-a1492e200fcd" />


## 🚀 Özellikler

- **Gelişmiş Dashboard:** Kilo, su ve hedef takibi tek ekranda.
- **AI Koç:** Kilo verme hızınıza ve su tüketiminize göre akıllı yorumlar yapar.
- **Su Takibi:** Dalga animasyonlu görsel su takibi ve geçmiş günleri düzenleme.
- **Karanlık Mod (Dark Mode):** Göz yormayan modern arayüz.
- **İnteraktif Grafikler:** Recharts ile detaylı veri görselleştirme.
- **Kişisel Hedefler:** Kilo alma, verme veya koruma modları.

## 🛠 Teknolojiler

**Backend:**
- Python & Django
- Django REST Framework (API)
- SQLite (Veritabanı)

**Frontend:**
- React.js (Vite)
- Bootstrap 5 & Custom CSS
- Recharts (Grafikler)
- Axios (API Bağlantısı)

## 📦 Kurulum

Projeyi bilgisayarınıza indirdikten sonra şu adımları izleyin:

### 1. Kurulumlar
```bash
# 1.Backend kurulumu
# Sanal ortam oluştur ve aktif et
python -m venv venv
# Windows için: venv\Scripts\activate
# Mac/Linux için: source venv/bin/activate

# Gereksinimleri yükle
pip install -r requirements.txt

# Veritabanını oluştur
python manage.py migrate

# Sunucuyu başlat
python manage.py runserver

### 2. Frontend Kurulumu
cd frontend

# Paketleri yükle
npm install

# Uygulamayı başlat
npm run dev
