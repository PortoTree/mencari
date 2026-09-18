# 🚀 Project TODO List

## ✅ Completed
- [x] (Frontend) Integrasi Auth UI (Login, Register, Forgot Password).
- [x] (Frontend) Implementasi indikator kekuatan password.
- [x] (Frontend) Pemusatan Cloudflare Turnstile di halaman `/secure`.
- [x] (Frontend) Sinkronisasi flow auto-submit & save draft setelah lewati Cloudflare.
- [x] (Frontend) Perbaikan styling visual logo (ukuran, margin optical).
- [x] (Frontend) Pisahkan halaman Root (`/`) menjadi Welcome Page publik, dan Feed dipindah ke `/beranda`.
- [x] (Frontend) Session Management & Route Guard (Token via Cookies, middleware.ts).
- [x] (Frontend) Perbaikan tema terang & gelap (Dark Mode & UI Layout ala Facebook) di `/beranda`.
- [x] (Frontend) Optimasi z-index dropdown profil, hover effect kontras, fix icon SVG Matahari, & presisi default avatar.
- [x] (Frontend) Perbaikan layout Sidebar Obrolan: Header dengan icon pencarian & dropdown, Tombol PING merah di footer, Switch Chat/Friend list, dan Right Sidebar Chat Info (page.tsx).
- [x] (Frontend) Modifikasi logic Friendlist tab: Menambahkan kategori Teman Aktif (online) dan Teman Offline secara terpisah.
- [x] (Frontend) Update icon UI Header Sidebar Obrolan: Menghilangkan icon pensil solid menjadi bulatan+ (tambah obrolan/grup), menghilangkan tombol opsi di mode friendlist, serta update tooltips untuk icon header (Opsi, Buat obrolan, Daftar teman).
- [x] (Frontend) Modifikasi logic Searchbox & Custom Tooltips: Mengubah tooltip bawaan browser menjadi custom tooltip Tailwind di semua icon header. Mengubah placeholder kotak pencarian secara dinamis (Cari obrolan... -> Cari nama pengguna...) berdasarkan state, beserta update file translasi ID & EN.
- [x] (Frontend) Tambah Filter Tab Obrolan: Menambahkan tab filter Semua, Belum dibaca, dan Favorit beserta icon filter di bawah searchbox pada state obrolan. (Fix double border issue, tambah dropdown Grup Chat & Arsip di icon filter).
- [x] (Frontend) Update isi dropdown Chat Room (Tambah ke favorit, Laporkan, Blokir dll) dengan custom hover & icon warna (merah/orange).

## 🔄 In Progress
- [ ] (Frontend/Backend) Build post creation modal & real-time Feed Layout (`/beranda`).
- [ ] (Frontend) Implementasi State Management (Zustand/Context) untuk simpan data user aktif.

## 📅 Next Up
- [ ] (Backend) Setup Cloudinary Media Upload (Avatar/Postingan).
- [ ] (Frontend) Bikin halaman `/profile` dan `/[username]` (Edit bio, ganti avatar).
- [ ] (Backend) Integrasi notifikasi real-time (opsional, tahap lanjut).
