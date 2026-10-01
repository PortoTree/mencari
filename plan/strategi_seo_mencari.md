# Rencana Strategi SEO & Label Postingan "Mencari"

Dokumen ini merangkum strategi arsitektur SEO berbasis **User Generated Content (UGC)** untuk fitur postingan pada platform nethubz.com. Tujuannya adalah mendatangkan *traffic* organik dari Google melalui postingan spesifik dari pengguna.

## 1. Pembaruan UI: Modal "Buat Postingan"
Pada modal pembuatan postingan, akan ditambahkan *dropdown* baru untuk **Label/Tag** yang diposisikan di bawah nama pengguna (sejajar di sebelah kiri *dropdown* Privasi).

**Opsi Label:**
- **Default**: Selalu tersedia. Postingan reguler.
- **Mencari**: Selalu tersedia. Memiliki *behaviour* khusus untuk SEO. Jika opsi ini dipilih, *dropdown* Privasi akan terkunci secara otomatis ke **Public**.
- **Lokasi**: Dirender jika `currentUser.profile.locationName` tersedia.
- **Profesi**: Dirender jika `currentUser.profile.profession` tersedia.
- **Sekolah**: Dirender jika `currentUser.profile.school` (atau entitas serupa) tersedia.

## 2. Pembaruan Database (Prisma)
Menambahkan tipe enum baru dan merevisi tabel `Post` untuk menampung data label.

```prisma
enum PostLabel {
  DEFAULT
  MENCARI
  LOKASI
  PROFESI
  SEKOLAH
}

model Post {
  // ... field existing ...
  label PostLabel @default(DEFAULT)
}
```

## 3. Arsitektur Routing (Sub-Directory SEO)
Untuk memaksimalkan *Domain Authority*, SEO akan dipusatkan pada domain utama menggunakan *sub-directory* (bukan *sub-domain*).

- **Halaman Katalog (`/explore` atau `/katalog`)**
  - Bersifat publik (tanpa login).
  - Menampilkan daftar/list card postingan terbaru yang memiliki label **Mencari**.
  - Setiap card memiliki tag `<a>` (link) yang mengarah ke halaman detail.
  
- **Halaman Detail Postingan (`/explore/post/[slug]`)**
  - **Krusial untuk SEO**: Halaman khusus untuk 1 postingan.
  - Menggunakan **Server-Side Rendering (SSR)** untuk menginjeksi isi postingan ke dalam `<title>` dan `<meta name="description">` pada HTML sebelum dikirim ke *Googlebot*.
  - **Read-Only Mode**: Pengunjung publik dapat membaca konten secara utuh. Namun, jika pengunjung menekan tombol interaksi (Chat, Like, Comment, View Profile), sistem akan memblokir dan menampilkan *prompt*: *"Harap login/daftar untuk berinteraksi dengan postingan ini"*.

## 4. Strategi URL Slug
Untuk meningkatkan relevansi *keyword* di mesin pencari, URL tidak hanya menggunakan ID acak, melainkan menggunakan pola **Slug + ID**.

**Contoh Teks Post:** "Mencari asisten tukang kayu di Bandung"
- ❌ **Buruk:** `nethubz.com/explore/post/clabc1234567`
- ✅ **SEO Friendly:** `nethubz.com/explore/post/mencari-asisten-tukang-kayu-di-bandung-clabc1234567`

Google akan membaca kata-kata pada URL tersebut sebagai sinyal relevansi yang tinggi terhadap pencarian *user*.

## 5. Flow Kerja Mesin Pencari (Googlebot)
1. *Googlebot* melakukan *crawling* pada halaman `/explore`.
2. *Googlebot* menemukan dan mengikuti *link* yang ada di card menuju `/explore/post/[slug]`.
3. Halaman detail di-index dan disimpan dalam database Google berdasarkan teks, judul, dan *slug*.
4. Saat ada *user* publik mengetik kata kunci serupa di Google Search, Google merujuk *user* tersebut ke URL spesifik di web nethubz.com.

## 6. Penanganan Konten Ganda (Duplicate Content)
Platform UGC secara alami akan memiliki postingan dengan teks yang mirip atau sama. 
- Algoritma Google secara otomatis akan memfilter dan memilih postingan dengan umur, relevansi, atau profil terbaik untuk ditampilkan (tidak menyebabkan penalti SEO).
- Adanya variasi bahasa (contoh: "Tukang kayu bandung" vs "Loker pengrajin kayu jabar") justru memperluas jangkauan *Long-Tail Keyword*.
- Di masa depan, proteksi *rate-limiting* dapat ditambahkan jika terdeteksi aktivitas *bot/spam* yang mengulang teks identik dalam waktu berdekatan.
