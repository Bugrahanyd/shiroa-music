# 🛡️ SHIROA Hata Önleme Sistemi

## Kurulum Tamamlandı ✅

### Eklenen Dosyalar

#### Backend
1. **env.validation.ts** - Ortam değişkenleri doğrulama
2. **all-exceptions.filter.ts** - Global hata yakalama
3. **error-logging.interceptor.ts** - Hata loglama
4. **error-boundary.guard.ts** - İstek doğrulama

#### Frontend
1. **error-boundary.tsx** - React hata sınırı
2. **error-handler.ts** - Hata yönetimi yardımcıları

#### Dokümantasyon
1. **error-prevention-system.md** - Detaylı hata önleme kılavuzu

---

## Kullanım

### Backend'de Hata Önleme

#### 1. Ortam Değişkenleri Otomatik Doğrulama
```typescript
// app.module.ts'de zaten aktif
ConfigModule.forRoot({ 
  validationSchema: envValidationSchema // ✅ Otomatik doğrulama
})
```

**Eksik değişken varsa uygulama başlamaz:**
```bash
Error: "JWT_SECRET" is required
Error: "DATABASE_URL" is required
```

#### 2. Global Hata Yakalama
```typescript
// main.ts'e ekle
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

const logger = app.get(LoggerService);
app.useGlobalFilters(new AllExceptionsFilter(logger));
```

#### 3. Hata Loglama
```typescript
// main.ts'e ekle
import { ErrorLoggingInterceptor } from './common/interceptors/error-logging.interceptor';

app.useGlobalInterceptors(new ErrorLoggingInterceptor(logger));
```

---

### Frontend'de Hata Önleme

#### 1. Error Boundary Kullanımı
```typescript
// layout.tsx veya layout-client.tsx
import { ErrorBoundary } from '@/lib/error-boundary';

export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```

#### 2. Error Handler Kullanımı
```typescript
import { ErrorHandler } from '@/lib/error-handler';

try {
  await api.getTracks();
} catch (error) {
  const message = ErrorHandler.handle(error, 'getTracks');
  showToast(message);
}

// Retry ile
const tracks = await ErrorHandler.withRetry(
  () => api.getTracks(),
  3, // 3 deneme
  1000 // 1 saniye gecikme
);
```

---

## Kritik Kontroller

### Başlamadan Önce
```bash
# 1. Ortam değişkenlerini doğrula
node validate-env.js

# 2. Veritabanı bağlantılarını kontrol et
make up
make logs backend

# 3. Build hatalarını kontrol et
cd backend && npm run build
cd frontend && npm run build
```

### Her Commit'ten Önce
```bash
# Type check
npm run build

# Lint
npm run lint

# Test
npm test
```

---

## Yaygın Hatalar ve Çözümleri

### 1. "JWT_SECRET is required"
```bash
# .env dosyasına ekle
JWT_SECRET=en_az_32_karakter_uzunlugunda_guvenli_bir_anahtar_buraya
```

### 2. "Cannot connect to database"
```bash
# Docker servislerini başlat
docker-compose up -d postgres mongodb redis

# Bağlantıyı kontrol et
docker-compose logs postgres
```

### 3. "localStorage is not defined"
```typescript
// ❌ YANLIŞ
const token = localStorage.getItem('token');

// ✅ DOĞRU
import { safeStorage } from '@/lib/storage';
const token = safeStorage.getItem('token');
```

### 4. "CORS policy blocked"
```typescript
// main.ts'de allowedOrigins'e ekle
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-domain.com' // Yeni domain
];
```

### 5. "Cannot read property of undefined"
```typescript
// ❌ YANLIŞ
const title = track.title;

// ✅ DOĞRU
const title = track?.title ?? 'Unknown';
```

---

## Monitoring

### Health Check
```bash
# Backend sağlık kontrolü
curl http://localhost:4000/health

# Beklenen yanıt:
{
  "status": "ok",
  "timestamp": "2025-01-21T...",
  "services": {
    "database": "connected",
    "redis": "connected",
    "mongodb": "connected"
  }
}
```

### Log Kontrolü
```bash
# Backend logları
tail -f backend/logs/combined-*.log
tail -f backend/logs/error-*.log

# Docker logları
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## Acil Durum Komutları

```bash
# Tüm servisleri yeniden başlat
make clean && make build && make up

# Sadece backend'i yeniden başlat
docker-compose restart backend

# Veritabanını sıfırla
docker-compose down -v
docker-compose up -d postgres mongodb

# Cache'i temizle
docker-compose restart redis
rm -rf frontend/.next
```

---

## Güvenlik Kontrol Listesi

- [x] JWT secret 32+ karakter
- [x] Şifreler bcrypt ile hashlenmiş
- [x] Rate limiting aktif
- [x] CORS yapılandırılmış
- [x] Helmet güvenlik başlıkları
- [x] Input validation (class-validator)
- [x] SQL injection koruması (TypeORM/Mongoose)
- [x] XSS koruması (sanitization)
- [x] HTTPS production'da zorunlu

---

## Performans İyileştirmeleri

### Backend
- [x] Redis caching
- [x] Database indexing
- [x] Connection pooling
- [x] Rate limiting
- [x] Compression middleware

### Frontend
- [x] Code splitting (Next.js otomatik)
- [x] Image optimization
- [x] Lazy loading
- [x] Error boundaries
- [x] Safe storage wrapper

---

## Destek

Hata ile karşılaşırsanız:

1. **Logları kontrol edin**: `make logs`
2. **Health check yapın**: `curl http://localhost:4000/health`
3. **Ortam değişkenlerini doğrulayın**: `node validate-env.js`
4. **Servisleri yeniden başlatın**: `make clean && make up`

Detaylı bilgi için: `error-prevention-system.md`

---

**Son Güncelleme**: 2025-01-21
**Versiyon**: 1.0.0
