# Urutan Pengerjaan Proyek "Mencari"

Berikut adalah peta jalan (*roadmap*) pengerjaan fitur-fitur utama di aplikasi. Urutan ini disusun berdasarkan prioritas sistem, dari fondasi yang paling mendasar hingga fitur *advanced* (lanjutan). 

Setiap kali kita menyelesaikan sebuah fase atau fitur, kita akan mencoretnya (menggunakan format `~~teks~~` atau *checklist* `[x]`).

---

## Phase 0: Keamanan & Fondasi Database (SEGERA)
Sebelum masuk ke fitur baru yang kompleks, kita wajib membereskan fondasi keamanan agar data user tidak bocor atau bisa dimanipulasi orang lain.
- [x] **Fix Supabase Row Level Security (RLS)**: Mengaktifkan dan mengatur RLS untuk tabel `User`, `Profile`, dll. Ini adalah *technical debt* dari pengerjaan profil.

## Phase 1: Koneksi Sosial & Moderasi
Fondasi dari *social network* adalah hubungan antar pengguna. Ini dikerjakan duluan agar fitur lain (seperti *timeline* postingan atau *chat*) punya landasan data.
- [x] **Follow / Friendship user to user**: Logika API dan UI untuk follow atau tambah teman.
- [x] **Block user to user**: Fitur keamanan bagi user untuk memblokir interaksi dengan user lain.
- [x] **Pengaturan privasi user**: Fitur di dalam edit profil modal pada setiap user agar user dapat mengatur privasi akunnya (misal: public, hanya teman, private).

## Phase 1.5: Sistem Notifikasi Global
Karena user sudah bisa saling follow, mereka butuh pemberitahuan secara real-time.
- [x] **Database Notifikasi**: Skema Prisma untuk menampung notifikasi (Follow, Like, Komen, dll).
- [x] **UI/UX Dropdown Notifikasi**: Tampilan *bell icon* di Navbar beserta daftar notifikasinya.

## Phase 2: Sistem Konten Utama (Core)
Setelah user saling terkoneksi, mereka butuh media untuk berinteraksi dan berbagi.
- [ ] **Database Postingan**: Skema Prisma, API, dan UI untuk membuat (*create*), membaca (*read*), mengedit (*update*), dan menghapus (*delete*) postingan.
- [ ] **Interaksi Postingan**: Logika untuk Like, Comment, Share, dan Save (Simpan) postingan.

## Phase 3: Portofolio & Etalase
Melengkapi profil pengguna dengan tempat unjuk karya.
- [ ] **Database Gallery**: Logika untuk menyimpan dan menampilkan koleksi gambar/galeri user.
- [ ] **Database Project**: Logika untuk menampilkan detail proyek-proyek profesional yang pernah dikerjakan.

## Phase 4: Komunitas & Real-time
Skala yang lebih luas untuk interaksi dalam kelompok, butuh penanganan *socket* (real-time) yang stabil.
- [ ] **Database Komunitas**: Sistem pembuatan Grup/Komunitas, hak akses (Admin/Member), dan profil grup.
- [ ] **Postingan komunitas**: secara privasi ini khusus untuk komunitas, bukan untuk user ke user. jadi yang melihat hanya orang yang join komunitas, kecuali jika owner/admin komunitas tersebut membuat pengaturan privasi pada komunitas menjadi public.
- [ ] **Live Real-time Chat & Group Chat**: Fitur pesan langsung antar user (DM) dan percakapan di dalam komunitas (Grup).

## Phase 5: Monetisasi & Custom Page (End-Game)
Fitur lanjutan (premium/creator) yang mengandalkan semua fitur dasar yang sudah berjalan stabil.
- [ ] **Database Toko Produk**: Skema untuk pendaftaran toko, etalase produk digital/fisik.
- [ ] **Halaman Web Link Custom**: Logika *routing* dinamis agar user punya URL unik (contoh: `https://domain.online/{link}`) layaknya Linktree/Lynk.id, lengkap dengan integrasi produk.

---

*Catatan: Dokumen ini akan diperbarui secara berkala. Fitur yang sudah selesai akan diberi tanda centang `[x]` atau dicoret.*