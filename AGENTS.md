# Aturan & Panduan Standar AI Agent untuk Proyek "pibesday"

Dokumen ini adalah **pedoman resmi** yang WAJIB dipatuhi oleh seluruh AI Agent saat merancang, menulis kode, memodifikasi layout, dan menyempurnakan fitur pada proyek website **pibesday**.

---

## 1. Komunikasi & Bahasa
- **Bahasa Utama**: Selalu gunakan **Bahasa Indonesia** yang hangat, santun, komunikatif, dan solutif.
- **Gaya Respon**: Ringkas, padat, berfokus pada solusi praktis, dan menyertakan tautan file markdown yang dapat diklik (`file:///...`).
- **Verifikasi Sebelum Mengubah**: Pahami konteks file dan komponen yang ada sebelum melakukan perubahan untuk menghindari *breaking changes*.

---

## 2. Hirarki Tipografi & Ukuran Teks (Design System)
Semua teks harus menggunakan skala hirarki yang konsisten, mudah dibaca (*accessible*), dan proporsional antara layar mobile & desktop:

| Tingkatan Teks | Font Family | Ukuran Mobile | Ukuran Desktop | Weight / Letter Spacing | Penggunaan Utama |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero)** | Serif (`Playfair Display` / font serif) | `36px` - `38px` (`leading-tight`) | `52px` - `56px` (`leading-none`) | SemiBold (600), `-0.02em` | Judul utama pembuka halaman / Hero Title |
| **Headline Large** | Serif | `26px` - `28px` | `32px` - `36px` | SemiBold (600), `-0.01em` | Judul Section (cth: "25 Sips Kenangan", "Toples Cinta") |
| **Headline Medium** | Serif | `20px` - `22px` | `24px` | Medium (500) | Judul kartu besar / Sub-section |
| **Title Large** | Sans (`Plus Jakarta Sans` / Inter) | `18px` | `20px` | SemiBold (600) | Judul kartu individual / Modal title |
| **Title Medium** | Sans | `15px` - `16px` | `16px` | SemiBold (600) | Sub-judul kartu / label tombol utama |
| **Body Large** | Sans | `16px` (`leading-relaxed`) | `18px` (`leading-relaxed`) | Regular (400) | Paragraf pembuka / kutipan romantis utama |
| **Body Medium** | Sans | `14px` (`leading-normal`) | `15px` (`leading-relaxed`) | Regular (400) | Isi pesan kartu, deskripsi sips, teks penjelasan |
| **Label / Caption** | Sans | `12px` - `13px` | `13px` | SemiBold (600), `tracking-wider` | Tag kategori, info voucher, status badge |
| **Badge / Mini** | Sans | `10px` - `11px` | `11px` | Medium (500), `tracking-widest` uppercase | Pill badge (cth: "CHAPTER 25", "SPECIAL BREW") |

---

## 3. Sistem Jarak (*Spacing System*), Grid, & Layout
Layout harus menganut ritme **8pt spacing system** yang konsisten agar tampilan terasa lapang, mewah, dan tidak sesak:

### A. Jarak Antar Section (Sumbu Y)
- **Mobile (`< 640px`)**: Jarak antar section vertikal menggunakan `py-10` hingga `py-12` (`40px` - `48px`), dengan `gap-y-8` (`32px`) antar kelompok elemen.
- **Desktop (`>= 1024px`)**: Jarak antar section vertikal menggunakan `py-16` hingga `py-20` (`64px` - `80px`), dengan ruang napas visual yang jelas.
- **Pemisah Alur**: Gunakan elemen pemisah lembut (*divider*) seperti garis aksen bergradasi pudar (`h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent`) atau floating icon kapsul.

### B. Margin & Padding Container (Sumbu X)
- **Max Container Width**: Selalu batasi lebar konten utama dengan `max-w-5xl` atau `max-w-6xl mx-auto`.
- **Horizontal Screen Padding (Gutter)**:
  - Mobile: `px-4` sampai `px-5` (`16px` - `20px`) agar kartu tidak menempel ke tepi layar.
  - Desktop: `px-6` sampai `px-12` (`24px` - `48px`).

### C. Jarak Antar Card (Sumbu X & Y)
- **Grid Layout**:
  - Mobile: Single column (`grid-cols-1`) dengan `gap-4` (`16px`).
  - Tablet: 2 kolom (`grid-cols-1 sm:grid-cols-2`) dengan `gap-5` (`20px`).
  - Desktop: 2-3 kolom (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) dengan `gap-6` (`24px`).
- **Bento Grid**: Jika menggunakan kartu dengan ukuran bervariasi (*asymmetric bento*), gunakan `gap-4 md:gap-6` dengan tinggi minimum yang konsisten (`min-h-[220px]`).

---

## 4. Standar Desain Kartu (*Card Design Standards*)
Setiap komponen Card harus memiliki estetika yang anggun, memiliki kedalaman (*depth*), dan sentuhan fisik (*tactile feel*):

- **Padding Dalam Kartu (Internal Padding)**:
  - Kartu Kompak / Mini: `p-3.5` hingga `p-4` (`14px` - `16px`).
  - Kartu Standar (Sips / Voucher / Notes): `p-5` (mobile) hingga `p-6` (desktop).
  - Kartu Unggulan / Featured (Kue / Amplop Utama): `p-6` hingga `p-8`.
- **Sudut Lengkung (*Border Radius*)**:
  - Kartu Konten: Wajib menggunakan `rounded-2xl` (`16px`) atau `rounded-3xl` (`24px`).
  - Tombol & Kapsul Badge: Wajib menggunakan `rounded-full` (`9999px`).
  - Polaroid: Gunakan `rounded-xs` atau `rounded-sm` dengan bagian bawah lebih lebar (*classic polaroid chin*).
- **Elevasi & Bayangan (*Shadow & Glow*)**:
  - Hindari drop shadow hitam pekat polos (`rgba(0,0,0,...)`).
  - Gunakan bayangan bernuansa hangat (*tinted ambient shadow*):
    - Resting State: `shadow-[0_8px_30px_-6px_rgba(44,24,16,0.08)]` (tema kopi) atau `rgba(225,29,72,0.08)` (tema romantis).
    - Hover / Active State: `shadow-[0_16px_40px_-6px_rgba(44,24,16,0.16)]` dengan translasi mikro `-translate-y-1`.
- **Efek Frosted Glass (*Glassmorphism*)**:
  - Gunakan background semi-transparan: `bg-surface/85 backdrop-blur-md` atau `backdrop-blur-xl`.
  - Border halus: `border border-amber-200/40` atau `border border-white/60`.

---

## 5. Palet Warna & Tema Halaman

### A. Tema Ultah 25 (*Warm Coffee & Cozy Brew*)
- **Deep Espresso / Roast** (Teks & Elemen Utama): `#2C1810` / `#3A2318`
- **Warm Amber & Caramel** (Aksen Emas & Highlight): `#8C5E28` / `#C48B47`
- **Latte & Warm Foam** (Permukaan Lembut): `#D4A373` / `#E6CCB2`
- **Porcelain / Warm Ivory** (Canvas Dasar): `#FAF7F2` / `#FFFDF9`
- **Rich Walnut** (Bayangan & Card Border): `#4A2E1B`

### B. Tema Ultah 24 & Edisi Romantis (*Sweet Pink Romance*)
- **Deep Wine / Romantic Crimson** (Teks Utama): `#400014` / `#881337`
- **Primary Rose Gold** (Focal Action & CTA): `#E11D48` / `#B80035`
- **Soft Blush Glow** (Badges & Ambient): `#F472B6` / `#FFCED4`
- **Soft Ivory Mist** (Canvas Dasar): `#FFF8F7` / `#FFF0F1`

---

## 6. Standar Interaktivitas & Aksesibilitas Mobile
- **Ukuran Area Sentuh (*Touch Targets*)**:
  - Seluruh tombol, link navigasi, dan elemen klik wajib memiliki ukuran area sentuh minimal **`44px x 44px`** agar mudah ditekan di layar ponsel.
- **Micro-interactions**:
  - Tombol interaktif harus memiliki feedback tactile: `active:scale-95` atau `active:scale-[0.98]`.
  - Transisi halus untuk hover dan state: `transition-all duration-300 ease-out`.
- **Audio Autoplay Etiquette**:
  - Jangan pernah memutar audio secara otomatis saat halaman baru dibuka (*browser policy*).
  - Mulai musik atau efek suara HANYA setelah ada gestur klik dari pengguna (misal: saat membuka amplop awal, mengklik kue, atau tombol play BGM).
  - Sediakan kontrol audio mengambang (*floating toggle*) yang jelas agar pengguna bisa mematikan/menghidupkan lagu kapan saja.
- **Kamera & Media Responsif**:
  - Semua gambar polaroid/foto kenangan wajib memiliki `object-cover` dengan `aspect-ratio` yang terkunci (`aspect-square`, `aspect-[4/5]`, dll) agar tidak *stretch* atau loncat (*layout shift*).

---

## 7. Arsitektur Kode & Pemisahan Data
- **Folder `src/data/`**:
  - Teks surat, kalimat mutiara, daftar sips (1-25), daftar pertanyaan kuis, dan data voucher hadiah **WAJIB** disimpan dalam file JavaScript di `src/data/` (seperti [coffeeContent.js](file:///d:/DIKA/pibesday/src/data/coffeeContent.js)).
  - **Dilarang keras** menaruh array teks panjang langsung di dalam file komponen JSX.
- **Folder `src/components/`**:
  - Komponen harus bersifat modular, mandiri (*self-contained*), dan menerima *props* jika relevan.
- **Integritas Navigasi**:
  - Pertahankan navigasi cepat `#24` dan `#25` di sudut kanan atas agar pengguna dapat berpindah edisi kapan saja.
  - Setiap perubahan kode harus diuji dan dipastikan **bebas error sintaks pada dev server Vite**.

---

## 8. Kebijakan Penggunaan Library & Paket Pihak Ketiga (*Third-Party Libraries*)
- **Izin Penuh Menggunakan Library**: Jika diperlukan untuk mempercantik tampilan, menyempurnakan animasi (seperti `framer-motion`, `motion`, `canvas-confetti`, `lucide-react`), atau meningkatkan kualitas estetika dan pengalaman interaktif pengguna, AI Agent **SANGAT DIANJURKAN dan DIPERSILAKAN** untuk menginstal dan menggunakan library pihak ketiga yang relevan, stabil, dan terpercaya.
- **Kualitas & Keindahan di Atas Segalanya**: Jangan ragu memanfaatkan library animasi tingkat tinggi, sistem fisika partikel (*physics spring*), gestur sentuh, atau efek audio selama hal tersebut membuat hasil karya terasa lebih memukau, hidup (*alive*), dan profesional.
- **Standar Kompatibilitas**: Pastikan paket library yang dipilih kompatibel dengan React 19 dan Vite, tidak menimbulkan *breaking changes*, serta lolos proses build (`npm run build`).

---

## 9. Fakta Kunci & Profil Personal (Momen Sakral)
Seluruh AI Agent WAJIB mengingat fakta penting berikut dan tidak boleh salah mencantumkan data personal:
- **Penerima / Pasangan**: **Evina Dini Anjriani** (*Evina / Bidadari*).
- **Pengirim**: **Dika** (*Mas Dika*).
- **Tanggal Lahir Evina**: **17 Oktober 2001**.
- **Milestone Ulang Tahun ke-25**: **17 Oktober 2026**.
- **Kisah & Rute Cinta**: Hubungan jarak jauh (*LDR*) dengan rute temu bulanan **Bandung ⇄ Bekasi**.
- **Ketentuan Format Tanggal**:
  - Tanggal surat, stempel pos, badge perayaan, dan polaroid peringatan ke-25 **WAJIB** menggunakan **`17 Oktober 2026`** (atau variasi singkatnya: `17 OKT 2026` / `17 OKTOBER`), bukan tanggal lain.
  - Masa berlaku voucher kado berstatus **`NO-EXPIRE`** / tanpa batas waktu.

