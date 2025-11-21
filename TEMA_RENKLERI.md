# SHIROA Tema Renk Kodları

## Night (Dark) Theme
```
from-[#94a3b8] via-[#64748b] to-[#cbd5e1]
```
Renkler: #94a3b8, #64748b, #475569, #cbd5e1 (gri-mavi tonları)

## Day (Light) Theme
```
from-[#f59e0b] via-[#ef4444] to-[#ec4899]
```
Renkler: #f59e0b, #ef4444, #ec4899, #8b5cf6 (turuncu-kırmızı-pembe-mor)

## Sakura (Japanese) Theme
```
from-[#f472b6] via-[#ec4899] to-[#be185d]
```
Renkler: #ec4899, #f472b6, #be185d, #db2777 (pembe tonları)

## Cyber (Neon) Theme
```
from-[#00f5ff] via-[#a855f7] to-[#8b5cf6]
```
Renkler: #00f5ff, #a855f7, #7c3aed, #8b5cf6 (cyan-mor)

## Sunset Theme
```
from-[#ff6b35] via-[#ff8c42] to-[#ffa07a]
```
Renkler: #ff6b35, #ff8c42, #ffa07a, #ff6b9d, #9d4edd, #00ced1 (turuncu-pembe-mor-cyan)

---

## Kullanım Yerleri

### Ana Sayfa - "sound" kelimesi
Dosya: `frontend/src/app/page.tsx`
Satır: ~37

### Footer - HYDRABON yazısı
Dosya: `frontend/src/components/Footer.tsx`
Satır: ~13-25 (getThemeColor fonksiyonu)

### Auth Sayfası - SHIROA logosu
Dosya: `frontend/src/app/auth/page.tsx`
Satır: ~72
Şu an sabit: `from-blue-500 via-purple-500 to-pink-500`

### Sidebar - Tema kartları
Dosya: `frontend/src/components/Sidebar.tsx`
Her tema için özel gradient tanımlı
