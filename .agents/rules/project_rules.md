# Aturan Desain & Rekayasa Kode Proyek "pibesday"

Dokumen aturan ini disinkronkan dengan [AGENTS.md](file:///d:/DIKA/pibesday/AGENTS.md) sebagai pedoman resmi:

## 1. Tipografi & Ukuran Teks
- **Display/Hero**: Serif, 36-38px (Mobile) / 52-56px (Desktop), font-semibold, leading-tight.
- **Headline Large (Section)**: Serif, 26-28px (Mobile) / 32-36px (Desktop).
- **Headline Medium (Sub-section / Card Title)**: Serif, 20-22px (Mobile) / 24px (Desktop).
- **Title Large / Medium**: Sans, 18px / 16px, font-semibold.
- **Body Large / Medium**: Sans, 16px / 14-15px, leading-relaxed.
- **Labels / Badges**: Sans, 11-13px, tracking-wider/widest, uppercase untuk pill badge.

## 2. Spacing & Grid System (8pt Grid)
- **Jarak Antar Section (Sumbu Y)**: Mobile `py-10` hingga `py-12` (40-48px), Desktop `py-16` hingga `py-20` (64-80px).
- **Margin Kontainer (Sumbu X)**: Max width `max-w-5xl` / `max-w-6xl mx-auto`, padding horizontal Mobile `px-4` - `px-5`, Desktop `px-6` - `px-12`.
- **Jarak Antar Card (Sumbu X & Y)**: Mobile `gap-4` (16px), Tablet `gap-5` (20px), Desktop `gap-6` (24px).

## 3. Standar Card & Komponen
- **Padding Kartu**: Kompak `p-4`, Standar `p-5 md:p-6`, Featured/Kue `p-6 md:p-8`.
- **Border Radius**: Kartu `rounded-2xl` atau `rounded-3xl`, Tombol/Badge `rounded-full`.
- **Elevasi & Shadow**: Gunakan warm tinted ambient shadow, bukan hitam pekat.
- **Glassmorphism**: `backdrop-blur-md` dengan border semi-transparan `border-amber-200/40` atau `border-white/60`.

## 4. Mobile First & Audio Etiquette
- Touch target minimal 44x44px.
- Audio autoplay dilarang tanpa gestur klik pengguna terlebih dahulu.
- Semua data konten wajib disimpan di `src/data/`, bukan di-hardcode di file JSX.
