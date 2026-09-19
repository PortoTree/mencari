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

- [x] (Frontend) Update Chat List Dropdown: Menyesuaikan isi dropdown pada chat list (menambahkan Lihat profil, Laporkan) dan menyesuaikan warnanya agar sama persis seperti Room Chat options.

- [x] (Frontend) Fix Chat List Dropdown Options: Menghapus opsi khusus Room Chat (seperti Lihat Profil, Laporkan, dll) dari dropdown hover di list obrolan dan hanya menyisakan Arsip, Sematkan, Tandai Belum Dibaca, Blokir, dan Hapus Obrolan.

- [x] (Frontend) Fix Desktop Chat List Dropdown: Menambahkan icon titik 3 horizontal dan dropdown berisi 10 menu (termasuk lihat profil, arsip, pin, dll) ke dalam list obrolan versi Desktop.

- [x] (Frontend) Fix Vercel Build Error: Rename backup files (page_recovered.tsx, page_start.tsx) yang bikin error TS, dan tambah @ts-ignore di import JSON.


## Update 2026-09-19T02:06:53.725Z
- (Frontend) Menambahkan fitur searchbox toggle di header Chat Room (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan icon kalender di sebelah searchbox chat room (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan logika autoclose (klik di luar area) pada room searchbox dengan ref dan event listener (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah UI room searchbox menjadi floating (absolute) tanpa background layer dengan pointer-events-none, dan membungkus icon calendar dengan bulatan tombol (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mempersempit lebar searchbox floating dengan menambahkan max-w-3xl, mx-auto, dan px-8 (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperkecil lagi ukuran floating searchbox menjadi max-w-lg dan px-12 agar lebih proporsional (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan styling kontras (bg-white/dark:bg-[#18191A]), border (gray-300/dark:[#4E4F50]), dan shadow-md pada searchbox floating agar lebih terbaca dan tidak menabrak warna bubble chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memposisikan searchbox rata kanan (mentok kanan) dengan absolute right-0 dan pr-6 (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan section intro pada chat room (avatar, nama, status pembuatan obrolan, dan info end-to-end encryption) sesuai preferensi user (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah warna text 'Anda membuat obrolan ini' dari biru menjadi abu-abu netral agar lebih sesuai (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengganti icon gallery chat input menjadi icon paperclip (attachment) dan menambahkan popup menu berisi opsi Upload Gambar & Upload File lengkap dengan icon masing-masing (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memindahkan icon emoji ke luar (sebelah icon lampiran), lalu menaruh icon kirim (paper airplane) di posisi sebelumnya di dalam input (src/app/[locale]/beranda/page.tsx)