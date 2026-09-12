# 📋 Project TODO List

## ✅ Completed
- [x] (Frontend) Integrasi Auth UI (Login, Register, Forgot Password).
- [x] (Frontend) Implementasi indikator kekuatan password.
- [x] (Frontend) Pemusatan Cloudflare Turnstile di halaman `/secure`.
- [x] (Frontend) Sinkronisasi flow auto-submit & save draft setelah lewati Cloudflare.
- [x] (Frontend) Perbaikan styling visual logo (ukuran, margin optical).

## 🚀 In Progress
- [ ] (Frontend/Backend) Build Home/Feed Layout (`/`).
- [ ] (Frontend) Implementasi State Management (Zustand/Context) untuk simpan data user aktif.

## 📝 Next Up
- [x] (Frontend) Pisahkan halaman Root (`/`) menjadi Welcome Page publik, dan Feed dipindah ke `/beranda`.
- [x] (Frontend) Session Management & Route Guard.
  - [x] Ubah penyimpanan token dari `localStorage` ke `Cookies`.
  - [x] Buat file `middleware.ts` untuk proteksi rute (`/beranda` butuh auth, auth pages redirect kalau sudah login).
- [ ] (Frontend) Implementasi State Management (Zustand/Context) untuk simpan data user aktif.
- [ ] (Backend) Setup Cloudinary Media Upload (Avatar/Postingan).
- [ ] (Frontend) Bikin halaman `/profile` (Edit bio, ganti avatar).
- [ ] (Backend) Integrasi notifikasi real-time (opsional, tahap lanjut).
