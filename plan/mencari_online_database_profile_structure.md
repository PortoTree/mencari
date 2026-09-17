# Struktur Database Profile --- mencari.online

Dokumen ini merangkum struktur database untuk sistem profile social
media **mencari.online**. Struktur dibuat modular agar dapat berkembang
dari MVP hingga skala besar, tanpa mencampur data autentikasi, profile,
relasi sosial, konten, dan media dalam satu tabel.

------------------------------------------------------------------------

## 1. `users` --- Akun Pengguna

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `id`                    UUID / PK               ID unik akun.

  `username`              VARCHAR / UNIQUE        Username unik yang
                                                  dipakai untuk identitas
                                                  dan URL profile.

  `email`                 VARCHAR / UNIQUE        Email akun.

  `phone`                 VARCHAR / NULL          Nomor telepon jika
                                                  digunakan.

  `password_hash`         TEXT                    Hash password; jangan
                                                  menyimpan password
                                                  asli.

  `status`                ENUM                    Status akun, misalnya
                                                  `active`, `suspended`,
                                                  `deleted`.

  `created_at`            TIMESTAMP               Waktu akun dibuat.

  `updated_at`            TIMESTAMP               Waktu data akun
                                                  terakhir diperbarui.
  -----------------------------------------------------------------------

> **Catatan:** Data autentikasi sebaiknya dipisahkan dari data profile.

------------------------------------------------------------------------

## 2. `profiles` --- Informasi Utama Profile

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `user_id`               UUID / PK + FK          Relasi 1:1 ke `users`.

  `display_name`          VARCHAR                 Nama yang ditampilkan.

  `bio`                   TEXT / NULL             Deskripsi singkat
                                                  pengguna.

  `avatar_url`            TEXT / NULL             URL foto profile.

  `cover_url`             TEXT / NULL             URL foto cover.

  `gender`                ENUM / NULL             Gender jika memang
                                                  diperlukan.

  `birth_date`            DATE / NULL             Tanggal lahir;
                                                  visibilitasnya
                                                  dikontrol privacy.

  `location_id`           UUID / NULL             Referensi lokasi
                                                  profile.

  `website_url`           TEXT / NULL             Website pribadi.

  `created_at`            TIMESTAMP               Waktu profile dibuat.

  `updated_at`            TIMESTAMP               Waktu profile
                                                  diperbarui.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 3. `profile_settings` --- Privasi & Pengaturan Profile

  ------------------------------------------------------------------------
  Field                    Tipe                    Fungsi
  ------------------------ ----------------------- -----------------------
  `user_id`                UUID / PK + FK          Pemilik pengaturan.

  `profile_visibility`     ENUM                    Visibilitas profile,
                                                   misalnya `public`,
                                                   `friends`, atau
                                                   `private`.

  `show_birth_date`        BOOLEAN                 Menentukan apakah
                                                   tanggal lahir
                                                   ditampilkan.

  `show_location`          BOOLEAN                 Menentukan apakah
                                                   lokasi ditampilkan.

  `allow_follow`           BOOLEAN                 Mengizinkan pengguna
                                                   lain mengikuti profile.

  `allow_friend_request`   BOOLEAN                 Mengizinkan permintaan
                                                   pertemanan.

  `searchable`             BOOLEAN                 Menentukan apakah
                                                   profile dapat ditemukan
                                                   melalui pencarian.
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 4. `user_social_links` --- Link Sosial

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `id`                    UUID / PK               ID link.

  `user_id`               UUID / FK               Pemilik link.

  `platform`              VARCHAR                 Nama platform, misalnya
                                                  Instagram, TikTok,
                                                  YouTube.

  `url`                   TEXT                    Alamat link.

  `display_order`         INT                     Urutan tampil di
                                                  profile.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 5. `locations` --- Data Lokasi Terstruktur

  Field        Tipe             Fungsi
  ------------ ---------------- ----------------------------
  `id`         UUID / PK        ID lokasi.
  `country`    VARCHAR          Negara.
  `province`   VARCHAR          Provinsi.
  `city`       VARCHAR          Kota/kabupaten.
  `district`   VARCHAR / NULL   Kecamatan bila dibutuhkan.

> Untuk social media, lokasi publik sebaiknya cukup pada tingkat umum
> seperti kota/provinsi, bukan alamat rumah.

------------------------------------------------------------------------

## 6. `follows` --- Relasi Follow

  Field            Tipe        Fungsi
  ---------------- ----------- ----------------------
  `id`             UUID / PK   ID relasi.
  `follower_id`    UUID / FK   User yang mengikuti.
  `following_id`   UUID / FK   User yang diikuti.
  `created_at`     TIMESTAMP   Waktu follow dibuat.

Contoh:

`Budi → follow → Andi`

------------------------------------------------------------------------

## 7. `friendships` --- Relasi Pertemanan

  Field            Tipe               Fungsi
  ---------------- ------------------ -----------------------------------------------
  `id`             UUID / PK          ID relasi pertemanan.
  `user_id`        UUID / FK          Salah satu user dalam relasi.
  `friend_id`      UUID / FK          User lainnya.
  `requested_by`   UUID / FK          User yang mengirim permintaan.
  `status`         ENUM               `pending`, `accepted`, `rejected`, `blocked`.
  `created_at`     TIMESTAMP          Waktu permintaan dibuat.
  `accepted_at`    TIMESTAMP / NULL   Waktu permintaan diterima.

> Sistem `follow` dan `friend` bisa berjalan bersamaan. `Follow`
> bersifat satu arah, sedangkan `Friendship` bersifat hubungan dua arah
> setelah diterima.

------------------------------------------------------------------------

## 8. `blocks` --- Blokir Pengguna

  Field               Tipe        Fungsi
  ------------------- ----------- -----------------------------
  `id`                UUID / PK   ID blokir.
  `user_id`           UUID / FK   User yang melakukan blokir.
  `blocked_user_id`   UUID / FK   User yang diblokir.
  `created_at`        TIMESTAMP   Waktu blokir dibuat.

------------------------------------------------------------------------

## 9. `interests` --- Master Minat

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `id`                    UUID / PK               ID minat.

  `name`                  VARCHAR / UNIQUE        Nama minat, misalnya
                                                  Gaming, Music,
                                                  Photography.

  `slug`                  VARCHAR / UNIQUE        Versi
                                                  URL/search-friendly
                                                  dari nama.
  -----------------------------------------------------------------------

Contoh:

-   Gaming
-   Photography
-   Football
-   Technology
-   Music
-   Travel
-   Cooking

------------------------------------------------------------------------

## 10. `user_interests` --- Relasi User & Minat

  Field           Tipe        Fungsi
  --------------- ----------- --------------------------
  `user_id`       UUID / FK   User.
  `interest_id`   UUID / FK   Minat yang dipilih.
  `created_at`    TIMESTAMP   Waktu minat ditambahkan.

Relasi:

`User N ↔ N Interests`

------------------------------------------------------------------------

## 11. `posts` --- Postingan

  Field          Tipe        Fungsi
  -------------- ----------- ------------------------------------------
  `id`           UUID / PK   ID postingan.
  `user_id`      UUID / FK   Pembuat postingan.
  `content`      TEXT        Isi tulisan postingan.
  `visibility`   ENUM        Misalnya `public`, `friends`, `private`.
  `created_at`   TIMESTAMP   Waktu posting.
  `updated_at`   TIMESTAMP   Waktu edit terakhir.

Satu tabel `posts` dapat digunakan untuk:

-   Profile
-   Home Feed
-   Explore
-   Search
-   Groups
-   Repost

------------------------------------------------------------------------

## 12. `media` --- File Media

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `id`                    UUID / PK               ID media.

  `user_id`               UUID / FK               Pemilik/upload-er.

  `type`                  ENUM                    `image`, `video`,
                                                  `audio`, `document`.

  `url`                   TEXT                    Lokasi file.

  `thumbnail_url`         TEXT / NULL             Thumbnail untuk
                                                  video/gambar.

  `metadata`              JSON / NULL             Informasi teknis
                                                  seperti ukuran,
                                                  dimensi, durasi.

  `created_at`            TIMESTAMP               Waktu upload.
  -----------------------------------------------------------------------

> Untuk skala besar, file media sebaiknya disimpan di object
> storage/CDN, bukan sebagai binary besar di database.

------------------------------------------------------------------------

## 13. `post_media` --- Relasi Post & Media

  Field             Tipe        Fungsi
  ----------------- ----------- -------------------------------
  `post_id`         UUID / FK   Postingan.
  `media_id`        UUID / FK   File media.
  `display_order`   INT         Urutan media dalam postingan.

Dengan struktur ini satu post dapat mempunyai:

-   1 foto
-   5 foto
-   20 foto
-   1 video
-   kombinasi media

------------------------------------------------------------------------

## 14. `user_work_experiences` --- Pengalaman Kerja

  Field           Tipe          Fungsi
  --------------- ------------- -------------------------------
  `id`            UUID / PK     ID pengalaman.
  `user_id`       UUID / FK     Pemilik pengalaman.
  `company`       VARCHAR       Nama perusahaan.
  `position`      VARCHAR       Jabatan.
  `description`   TEXT / NULL   Deskripsi pekerjaan.
  `start_date`    DATE / NULL   Tanggal mulai.
  `end_date`      DATE / NULL   Tanggal selesai.
  `is_current`    BOOLEAN       Apakah masih bekerja di sana.

------------------------------------------------------------------------

## 15. `user_educations` --- Pendidikan

  Field              Tipe             Fungsi
  ------------------ ---------------- ---------------------------
  `id`               UUID / PK        ID pendidikan.
  `user_id`          UUID / FK        Pemilik data.
  `institution`      VARCHAR          Nama sekolah/universitas.
  `degree`           VARCHAR / NULL   Jenjang pendidikan.
  `field_of_study`   VARCHAR / NULL   Jurusan/bidang.
  `start_date`       DATE / NULL      Tanggal mulai.
  `end_date`         DATE / NULL      Tanggal selesai.

------------------------------------------------------------------------

## 16. `skills` --- Master Skill

  Field    Tipe               Fungsi
  -------- ------------------ -------------
  `id`     UUID / PK          ID skill.
  `name`   VARCHAR / UNIQUE   Nama skill.
  `slug`   VARCHAR / UNIQUE   Slug skill.

------------------------------------------------------------------------

## 17. `user_skills` --- Relasi User & Skill

  Field        Tipe        Fungsi
  ------------ ----------- --------
  `user_id`    UUID / FK   User.
  `skill_id`   UUID / FK   Skill.

------------------------------------------------------------------------

## 18. `notifications` --- Notifikasi

  -----------------------------------------------------------------------
  Field                   Tipe                    Fungsi
  ----------------------- ----------------------- -----------------------
  `id`                    UUID / PK               ID notifikasi.

  `user_id`               UUID / FK               Penerima notifikasi.

  `type`                  VARCHAR                 Jenis notifikasi,
                                                  misalnya `follow`,
                                                  `friend_request`,
                                                  `comment`, `chat`.

  `actor_id`              UUID / FK               User yang memicu
                                                  aktivitas.

  `reference_id`          UUID / NULL             ID objek terkait,
                                                  misalnya post atau
                                                  friendship.

  `is_read`               BOOLEAN                 Apakah sudah dibaca.

  `created_at`            TIMESTAMP               Waktu notifikasi.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Relasi Utama

``` text
users
 ├── 1:1 profiles
 ├── 1:1 profile_settings
 ├── 1:N posts
 ├── 1:N media
 ├── 1:N notifications
 ├── N:N users melalui follows
 ├── N:N users melalui friendships
 ├── N:N users melalui blocks
 ├── N:N interests melalui user_interests
 ├── 1:N work_experiences
 ├── 1:N educations
 └── N:N skills melalui user_skills

posts
 └── N:N media melalui post_media

profiles
 └── N:1 locations
```

------------------------------------------------------------------------

# Rekomendasi MVP

Untuk versi pertama **social media mencari.online**, prioritaskan:

``` text
users
profiles
profile_settings

follows
friendships
blocks

posts
media
post_media

interests
user_interests

notifications
```

Sedangkan:

``` text
user_work_experiences
user_educations
skills
user_skills
```

bisa ditambahkan setelah core social network sudah berjalan.

------------------------------------------------------------------------

# Catatan Teknis Penting

-   Gunakan **UUID atau ULID** sebagai ID publik agar ID tidak mudah
    ditebak.
-   Tambahkan `UNIQUE constraint` pada `username`, `email`, `slug`, dan
    pasangan relasi yang memang tidak boleh duplikat.
-   Tambahkan index pada foreign key dan kolom yang sering digunakan
    untuk pencarian atau sorting seperti `username`, `display_name`,
    `follower_id`, `following_id`, `user_id`, dan `created_at`.
-   Jangan menyimpan password plaintext. Gunakan password hashing yang
    aman.
-   Data privacy sebaiknya dipisahkan dari data profile agar aturan
    visibilitas mudah dikembangkan.
-   Media sebaiknya menggunakan object storage + CDN ketika skala mulai
    besar.
-   Counter seperti `follower_count`, `following_count`, `post_count`,
    dan `friend_count` dapat menggunakan denormalisasi/cache secara
    terkontrol ketika dibutuhkan.
-   Untuk sistem social media besar, desain feed, recommendation,
    notification, search, dan messaging sebaiknya dipisahkan secara
    modular dari database profile utama.

------------------------------------------------------------------------

# Struktur Awal yang Disarankan

Secara sederhana:

``` text
                    USERS
                      │
              ┌───────┴───────┐
              ↓               ↓
           PROFILE        SETTINGS
              │
       ┌──────┼───────────────┐
       ↓      ↓               ↓
   INTERESTS LOCATION     SOCIAL LINKS

                    USERS
                      │
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
     FOLLOW         FRIEND          BLOCK
       │              │              │
       └──────────────┼──────────────┘
                      ↓
                    SOCIAL
                      │
                      ↓
                    POSTS
                      │
                      ↓
                    MEDIA

                    USERS
                      │
                      ↓
                NOTIFICATIONS
```

Struktur ini menjadi fondasi untuk fitur berikutnya seperti **Groups,
Messenger, Reactions, Comments, Shares, Feed, Search, Stories, Events,
dan sistem recommendation**.
