# IHS — Institute for Hadith Sciences

Next.js (React) sitesi + Supabase tabanlı özel CRM (öğrenci/başvuru yönetimi) ve CMS (dinamik içerik).

## Sayfalar

| Sayfa | Yol |
|---|---|
| Ana sayfa (video hero, günün hadisi) | `/` |
| Tüm eğitimler | `/egitimler` |
| Program detayları (4 program, sekmeli) | `/program` (`#hadis-merkezli`, `#hadis-ilimleri`, `#tefsir-ilimleri`, `#meal-calismalari`) |
| Akademik kadro | `/kadro` |
| Enstitü (Hakkımızda / Projeler / Faaliyetler) | `/enstitu` |
| Başvuru formu (3 adım → Supabase) | `/basvuru` |
| Bağış | `/bagis` |
| Sorularla Hadis (arama + soru gönderme) | `/sorularla-hadis` |
| **Yönetim paneli (CRM + CMS)** | `/admin` |

## Kurulum

### 1. Bağımlılıklar ve geliştirme sunucusu

```bash
npm install
npm run dev        # http://localhost:3000
```

Site, Supabase yapılandırılmadan da çalışır (formlar kaydedilmez, içerik koddaki
varsayılanlardan gelir). Tam işlevsellik için:

### 2. Supabase projesi

1. [supabase.com](https://supabase.com) üzerinde ücretsiz bir proje oluşturun.
2. **SQL Editor**'da `supabase/schema.sql` dosyasının tamamını çalıştırın
   (tablolar + güvenlik kuralları + depolama).
3. **Project Settings → API**'den URL ve anon key değerlerini alın:

```bash
cp .env.local.example .env.local
# .env.local dosyasını doldurun
```

4. **Authentication → Users → Add user** ile yönetici hesabı oluşturun
   (e-posta + şifre). Bu hesapla `/admin/login` üzerinden giriş yapılır.

### 3. Hero video

Ana sayfa hero arka planı video destekler. Videonuzu şu adlarla
`public/uploads/` klasörüne koyun:

- `hero-bg.mp4` (zorunlu) — önerilen: 1080p, 10–20 sn, sessiz, < 8 MB
- `hero-bg.webm` (isteğe bağlı, daha küçük dosya)

Video yoksa mevcut fotoğraf (poster) gösterilmeye devam eder.

```bash
# ffmpeg ile sıkıştırma örneği:
ffmpeg -i kaynak.mp4 -an -vf scale=1920:-2 -crf 28 public/uploads/hero-bg.mp4
```

## Yönetim paneli (`/admin`)

- **Genel Bakış** — başvuru/öğrenci/mesaj sayıları, son başvurular.
- **Başvurular (CRM)** — durum hattı: Yeni → İncelemede → Görüşme → Kabul/Red → Kayıtlı.
  Not tutma ve tek tıkla "Öğrenci Olarak Kaydet".
- **Öğrenciler** — öğrenci kayıtları (arama, ekleme, düzenleme, durum: aktif/dondurdu/mezun/ayrıldı).
- **Mesajlar** — iletişim formundan gelen mesajlar, okundu işaretleme, mailto ile yanıt.
- **Gelen Sorular** — Sorularla Hadis'ten gelen sorular; cevap yazıp tek tıkla köşede yayımlama.
- **İçerik (CMS)** — Sorularla Hadis, Faaliyetler ve Akademik Kadro içerikleri (TR/DE ayrı ayrı).
  Tablolar boşken site koddaki varsayılan içeriği gösterir; kayıt eklenince site otomatik
  olarak Supabase'teki içeriği kullanır.

## Güvenlik modeli

`supabase/schema.sql` içindeki Row Level Security kuralları:

- Ziyaretçiler (anon) yalnızca **form gönderebilir** (başvuru, mesaj, soru) ve
  **yayındaki içeriği okuyabilir**.
- Yönetici işlemleri yalnızca Supabase Auth ile giriş yapmış kullanıcılara açıktır.

## Dağıtım (yayına alma)

### Hostinger (statik export)

Proje `next.config.ts` içinde `output: 'export'` ile yapılandırıldı; `npm run build`
çalıştırıldığında yüklemeye hazır site `out/` klasörüne yazılır.

1. Supabase bilgilerinizi `.env.local` dosyasına girin (girmezseniz site yine çalışır
   ama formlar ve `/admin` çalışmaz — bu değerler build sırasında dosyalara gömülür).
2. `npm run build`
3. `out/` klasörünün **içeriğini** (gizli `.htaccess` dahil) Hostinger File Manager
   veya FTP ile `public_html/` içine yükleyin.
4. Hero videoyu sunucuda `public_html/uploads/hero-bg.mp4` olarak yükleyebilirsiniz
   (build'e dahil etmek zorunda değilsiniz).

> Not: Supabase anahtarları değiştiğinde veya kod güncellendiğinde yeniden
> `npm run build` alıp `out/` içeriğini tekrar yüklemeniz gerekir.

### Vercel (alternatif)

Repo'yu bağlayın, iki ortam değişkenini (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`) ekleyin, deploy edin.
