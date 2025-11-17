# 🚀 SHIROA Başlatma Rehberi

## Hızlı Başlangıç (En Kolay Yol)

### Adım 1: START_SIMPLE.bat'ı Çalıştır
```
START_SIMPLE.bat dosyasına çift tıkla
```

Bu otomatik olarak:
- ✅ Backend'i başlatır (http://localhost:3001)
- ✅ Frontend'i başlatır (http://localhost:3000)
- ✅ Tarayıcıyı açar

**İlk çalıştırmada hata alırsan:**

---

## Manuel Başlatma (Sorun Çözme)

### 1. Backend Başlatma

```bash
cd backend
npm install
npm run start:dev
```

**Hata: "MongoDB connection failed"**
- MongoDB yüklü değil, sorun yok!
- Backend yine de çalışır (PostgreSQL kullanır)

**Hata: "PostgreSQL connection failed"**
- PostgreSQL yüklü değil, sorun yok!
- Şimdilik frontend mock data ile çalışır

### 2. Frontend Başlatma

```bash
cd frontend
npm install
npm run dev
```

Tarayıcıda aç: http://localhost:3000

---

## Test Kullanıcısı Oluşturma

### Yöntem 1: Frontend'den Kayıt Ol
1. http://localhost:3000/register
2. Email: test@test.com
3. Password: 123456
4. Kayıt ol!

### Yöntem 2: Admin Kullanıcı Oluştur
```bash
cd backend
npm run create-admin
```

---

## Şu An Çalışan Özellikler

### ✅ Frontend (Mock Data ile)
- Ana sayfa
- Track listesi (12 test track)
- Tema değiştirme
- Playlist yönetimi
- Community feed
- Producer dashboard
- Notification center

### ⚠️ Backend Bağlantısı Gerekli
- Gerçek kayıt/giriş
- Track upload
- Satın alma
- Email gönderimi

---

## Database Kurulumu (Opsiyonel)

### MongoDB (Kolay)
1. MongoDB Compass indir: https://www.mongodb.com/try/download/compass
2. Kur ve aç
3. Connect: `mongodb://localhost:27017`
4. Database oluştur: `shiroa`

### PostgreSQL (Biraz Zor)
1. PostgreSQL indir: https://www.postgresql.org/download/
2. Kur (şifre: postgres)
3. pgAdmin aç
4. Database oluştur: `shiroa`

**Veya ücretsiz cloud kullan:**
- MongoDB: https://www.mongodb.com/cloud/atlas (512MB free)
- PostgreSQL: https://neon.tech (3GB free)

---

## Sorun Giderme

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### "Module not found"
```bash
cd frontend
npm install

cd ../backend
npm install
```

### Backend çalışmıyor ama frontend'i test etmek istiyorum
Frontend zaten mock data ile çalışıyor! Backend olmadan da test edebilirsin.

---

## Sonraki Adımlar

1. ✅ Frontend çalışıyor → Tema değiştir, sayfaları gez
2. ✅ Backend çalışıyor → Kayıt ol, giriş yap
3. ✅ Database bağlı → Track upload et
4. ✅ Stripe test → Test kartı ile satın al

---

## Yardım

Sorun mu var? Hata mesajını kopyala ve bana gönder!
