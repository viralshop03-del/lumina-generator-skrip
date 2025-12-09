# Generator Skrip Konten (Cloudflare Pages)

Aplikasi ini telah dikonversi menjadi **Cloudflare Pages Functions** (Backend) dan **Vanilla JS** (Frontend).
Tidak perlu `npm install` atau `build command`.

## Struktur Project

```
/public
  /index.html   (UI Utama)
  /styles.css   (Styling Tambahan)
  /app.js       (Logika Frontend)
/functions
  /api
    /generate.js (Logika AI & Database Hook)
wrangler.toml   (Config)
```

## Cara Deploy ke Cloudflare Pages

1.  Upload folder ini ke GitHub Repository.
2.  Masuk ke Dashboard Cloudflare > **Workers & Pages**.
3.  Klik **Create Application** > **Pages** > **Connect to Git**.
4.  Pilih Repository Anda.
5.  **Build Settings**:
    *   **Framework preset**: None
    *   **Build command**: (Kosongkan)
    *   **Build output directory**: `public`
6.  Klik **Save and Deploy**.

## Fitur
*   **Bring Your Own Key**: API Key disimpan di LocalStorage pengguna.
*   **Strategi Skrip**: FasterAPI, Contrarian, Disruptive (R.A.P.E.D).
*   **Visual Storyboard**: Breakdown scene per 4 detik.
*   **Tanpa Server**: Berjalan 100% di Edge Network Cloudflare.
