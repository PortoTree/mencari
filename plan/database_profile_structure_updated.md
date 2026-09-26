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
  `type`                  ENUM                    Tipe profile, misalnya
                                                  `personal`, `business`.
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

  ----------------------------------------------------------------------
  Field                    Tipe                   Fungsi
  ------------------------ ---------------------- ----------------------
  `user_id`                UUID / PK + FK         Pemilik pengaturan.

  `profile_visibility`     ENUM                   Visibilitas profile,
                                                  misalnya `public`,
                                                  `friends`, atau
                                                  `private`.

  `show_birth_date`        BOOLEAN                Menentukan apakah
                                                  tanggal lahir
                                                  ditampilkan.

  `show_location`          BOOLEAN                Menentukan apakah
                                                  lokasi ditampilkan.

  `allow_follow`           BOOLEAN                Mengizinkan pengguna
                                                  lain mengikuti
                                                  profile.

  `allow_friend_request`   BOOLEAN                Mengizinkan permintaan
                                                  pertemanan.

  `searchable`             BOOLEAN                Menentukan apakah
                                                  profile dapat
                                                  ditemukan melalui
                                                  pencarian.
  ----------------------------------------------------------------------

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

------------------------------------------------------------------------

# 19. Sistem Interaksi Postingan

Untuk `mencari.online`, postingan sebaiknya menggunakan satu sistem
`posts` universal yang dapat digunakan untuk:

-   Postingan profile.
-   Home Feed.
-   Explore.
-   Search.
-   Postingan dalam Groups.
-   Repost.

Dengan pendekatan ini, Like, Comment, Reaction, Share, Bookmark, dan
View tidak perlu dibuat ulang khusus untuk setiap konteks postingan.

Contoh:

``` text
posts
│
├── post_media
├── post_likes
├── post_reactions
├── post_comments
│   ├── post_comment_likes
│   └── post_comment_reactions
├── post_shares
├── post_mentions
├── post_comment_mentions
├── post_bookmarks
├── post_reports
└── post_views
```

------------------------------------------------------------------------

## 20. Penyesuaian `posts` untuk Groups

Agar satu tabel `posts` dapat digunakan untuk postingan biasa dan
postingan Groups, tambahkan field berikut pada tabel `posts`:

  Field          Tipe             Fungsi
  -------------- ---------------- --------------------------------------------------------------------------
  `id`           UUID / PK        ID postingan.
  `user_id`      UUID / FK        Pembuat postingan.
  `group_id`     UUID / FK / NU   LL Group tempat postingan dibuat. NULL jika postingan bukan milik Group.
  `content`      TEXT             Isi tulisan postingan.
  `visibility`   ENUM             Misalnya `public`, `friends`, `private`, `group`.
  `status`       ENUM             Misalnya `published`, `draft`, `deleted`.
  `created_at`   TIMESTAMP        Waktu posting.
  `updated_at`   TIMESTAMP        Waktu edit terakhir.

Dengan struktur tersebut:

``` text
group_id = NULL
```

berarti postingan profile / personal.

Sedangkan:

``` text
group_id = grp_123
```

berarti postingan dibuat di Group tertentu.

Contoh:

``` text
Post pribadi:
user_id  = usr_001
group_id = NULL

Post Group:
user_id  = usr_001
group_id = grp_001
```

Dengan demikian tidak diperlukan tabel `group_posts` terpisah.

------------------------------------------------------------------------

## 21. `post_likes` --- Like Postingan

  Field          Tipe        Fungsi
  -------------- ----------- ----------------------------
  `id`           UUID / PK   ID like.
  `post_id`      UUID / FK   ID postingan yang di-like.
  `user_id`      UUID / FK   User yang memberikan like.
  `created_at`   TIMESTAMP   Waktu like diberikan.

Constraint:

``` text
UNIQUE(post_id, user_id)
```

Satu user hanya dapat memberikan satu like pada postingan yang sama.

Tabel ini berlaku untuk:

``` text
Post Profile
Post Feed
Post Group
Post Explore
```

Tidak perlu membuat `group_post_likes`.

------------------------------------------------------------------------

## 22. `post_reactions` --- Reaction Postingan

  Field          Tipe        Fungsi
  -------------- ----------- --------------------------------
  `id`           UUID / PK   ID reaction.
  `post_id`      UUID / FK   ID postingan.
  `user_id`      UUID / FK   User yang memberikan reaction.
  `type`         ENUM        Jenis reaction.
  `created_at`   TIMESTAMP   Waktu reaction diberikan.
  `updated_at`   TIMESTAMP   Waktu reaction diubah.

Contoh `type`:

``` text
like
love
haha
wow
sad
angry
```

Constraint:

``` text
UNIQUE(post_id, user_id)
```

Satu user memiliki satu reaction aktif pada satu postingan.

------------------------------------------------------------------------

## 23. `post_comments` --- Komentar Postingan

  Field          Tipe             Fungsi
  -------------- ---------------- --------------------------------------------
  `id`           UUID / PK        ID komentar.
  `post_id`      UUID / FK        ID postingan.
  `user_id`      UUID / FK        User yang membuat komentar.
  `parent_id`    UUID / FK / NU   LL ID komentar induk jika merupakan reply.
  `content`      TEXT             Isi komentar.
  `status`       ENUM             `published`, `hidden`, `deleted`.
  `created_at`   TIMESTAMP        Waktu komentar dibuat.
  `updated_at`   TIMESTAMP        Waktu komentar diedit.

`parent_id` digunakan untuk membuat sistem reply.

Contoh:

``` text
Komentar A
├── Reply B
│   └── Reply C
└── Reply D
```

Jika komentar adalah komentar utama:

``` text
parent_id = NULL
```

Jika komentar adalah reply:

``` text
parent_id = ID komentar induk
```

Tabel ini juga berlaku untuk postingan Group karena `post_id` menunjuk
ke tabel `posts` universal.

------------------------------------------------------------------------

## 24. `post_comment_likes` --- Like Komentar

  Field          Tipe        Fungsi
  -------------- ----------- ----------------------------
  `id`           UUID / PK   ID like komentar.
  `comment_id`   UUID / FK   ID komentar.
  `user_id`      UUID / FK   User yang memberikan like.
  `created_at`   TIMESTAMP   Waktu like diberikan.

Constraint:

``` text
UNIQUE(comment_id, user_id)
```

------------------------------------------------------------------------

## 25. `post_comment_reactions` --- Reaction Komentar

  Field          Tipe        Fungsi
  -------------- ----------- --------------------------------
  `id`           UUID / PK   ID reaction.
  `comment_id`   UUID / FK   ID komentar.
  `user_id`      UUID / FK   User yang memberikan reaction.
  `type`         ENUM        Jenis reaction.
  `created_at`   TIMESTAMP   Waktu reaction dibuat.
  `updated_at`   TIMESTAMP   Waktu reaction diubah.

Constraint:

``` text
UNIQUE(comment_id, user_id)
```

------------------------------------------------------------------------

## 26. `post_shares` --- Share Postingan

  Field          Tipe        Fungsi
  -------------- ----------- -----------------------------------------
  `id`           UUID / PK   ID share.
  `post_id`      UUID / FK   ID postingan.
  `user_id`      UUID / FK   User yang melakukan share.
  `share_type`   ENUM        `feed`, `profile`, `group`, `external`.
  `created_at`   TIMESTAMP   Waktu share dilakukan.

Karena `post_id` bersifat universal, postingan Group juga dapat di-share
menggunakan tabel ini.

------------------------------------------------------------------------

## 27. `post_mentions` --- Mention User Dalam Postingan

  Field          Tipe        Fungsi
  -------------- ----------- -----------------------
  `id`           UUID / PK   ID mention.
  `post_id`      UUID / FK   ID postingan.
  `user_id`      UUID / FK   User yang di-mention.
  `created_at`   TIMESTAMP   Waktu mention dibuat.

------------------------------------------------------------------------

## 28. `post_comment_mentions` --- Mention User Dalam Komentar

  Field          Tipe        Fungsi
  -------------- ----------- -----------------------
  `id`           UUID / PK   ID mention.
  `comment_id`   UUID / FK   ID komentar.
  `user_id`      UUID / FK   User yang di-mention.
  `created_at`   TIMESTAMP   Waktu mention dibuat.

------------------------------------------------------------------------

## 29. `post_bookmarks` --- Bookmark Postingan

  Field          Tipe        Fungsi
  -------------- ----------- --------------------------------
  `id`           UUID / PK   ID bookmark.
  `post_id`      UUID / FK   ID postingan.
  `user_id`      UUID / FK   User yang menyimpan postingan.
  `created_at`   TIMESTAMP   Waktu postingan disimpan.

Constraint:

``` text
UNIQUE(post_id, user_id)
```

------------------------------------------------------------------------

## 30. `post_reports` --- Report Postingan

  Field           Tipe             Fungsi
  --------------- ---------------- --------------------------------------------------
  `id`            UUID / PK        ID report.
  `post_id`       UUID / FK        ID postingan.
  `user_id`       UUID / FK        User yang membuat laporan.
  `reason`        VARCHAR(100)     Alasan laporan.
  `description`   TEXT             Detail laporan.
  `status`        ENUM             `pending`, `reviewing`, `resolved`, `dismissed`.
  `reviewed_by`   UUID / FK / NU   LL Admin/moderator yang memproses.
  `reviewed_at`   TIMESTAMP / NU   LL Waktu laporan diproses.
  `created_at`    TIMESTAMP        Waktu laporan dibuat.

------------------------------------------------------------------------

## 31. `post_views` --- View Postingan

  Field          Tipe             Fungsi
  -------------- ---------------- ---------------------------------
  `id`           UUID / PK        ID view.
  `post_id`      UUID / FK        ID postingan.
  `user_id`      UUID / FK / NU   LL User yang melihat postingan.
  `created_at`   TIMESTAMP        Waktu postingan dilihat.

`user_id` dapat NULL jika sistem nantinya mengizinkan pencatatan view
dari guest.

------------------------------------------------------------------------

## 32. `post_pins` --- Pin Postingan

  Field          Tipe        Fungsi
  -------------- ----------- --------------------------
  `id`           UUID / PK   ID pin.
  `post_id`      UUID / FK   ID postingan.
  `pinned_by`    UUID / FK   User yang melakukan pin.
  `created_at`   TIMESTAMP   Waktu postingan dipin.

Dapat digunakan untuk pin postingan pada profile atau Group.

------------------------------------------------------------------------

# 33. Relationship Sistem Postingan

``` text
users
 │
 └── posts
      │
      ├── post_media
      │
      ├── post_likes
      │
      ├── post_reactions
      │
      ├── post_comments
      │      │
      │      ├── post_comment_likes
      │      ├── post_comment_reactions
      │      └── post_comment_mentions
      │
      ├── post_shares
      ├── post_mentions
      ├── post_bookmarks
      ├── post_reports
      ├── post_views
      └── post_pins
```

------------------------------------------------------------------------

# 34. Relationship Postingan dengan Groups

``` text
groups
   │
   └── posts
         │
         ├── post_likes
         ├── post_reactions
         ├── post_comments
         ├── post_shares
         ├── post_bookmarks
         └── post_views
```

Dengan demikian:

``` text
Profile Post
     ↓
    posts
     ↓
   interactions
```

dan:

``` text
Group Post
     ↓
    posts
     ↓
   interactions
```

menggunakan sistem yang sama.

------------------------------------------------------------------------

# 35. Index Sistem Postingan

## `posts`

``` text
INDEX(user_id, created_at)
INDEX(group_id, created_at)
INDEX(group_id, status, created_at)
INDEX(visibility, created_at)
```

## `post_likes`

``` text
UNIQUE(post_id, user_id)
INDEX(post_id, created_at)
INDEX(user_id, created_at)
```

## `post_reactions`

``` text
UNIQUE(post_id, user_id)
INDEX(post_id, type)
INDEX(user_id, created_at)
```

## `post_comments`

``` text
INDEX(post_id, created_at)
INDEX(post_id, status, created_at)
INDEX(parent_id, created_at)
INDEX(user_id, created_at)
```

## `post_comment_likes`

``` text
UNIQUE(comment_id, user_id)
INDEX(comment_id, created_at)
INDEX(user_id, created_at)
```

## `post_comment_reactions`

``` text
UNIQUE(comment_id, user_id)
INDEX(comment_id, type)
INDEX(user_id, created_at)
```

## `post_shares`

``` text
INDEX(post_id, created_at)
INDEX(user_id, created_at)
```

## `post_bookmarks`

``` text
UNIQUE(post_id, user_id)
INDEX(user_id, created_at)
```

## `post_views`

``` text
INDEX(post_id, created_at)
INDEX(user_id, created_at)
```

------------------------------------------------------------------------

# 36. Counter Postingan

Untuk menampilkan jumlah interaksi dengan cepat, `posts` nantinya dapat
memiliki counter terdenormalisasi:

``` text
posts
├── like_count
├── comment_count
├── share_count
├── view_count
└── reaction_count
```

Contoh:

``` text
like_count = 1250
comment_count = 87
share_count = 42
view_count = 15000
```

Pada MVP, counter tidak wajib langsung digunakan. Jumlah dapat dihitung
dari tabel interaksi.

Ketika traffic meningkat, counter dapat dipelihara secara asynchronous
atau menggunakan cache/counter service.

------------------------------------------------------------------------

# 37. Keuntungan Sistem Post Universal

Dengan menggunakan:

``` text
posts
```

sebagai sumber utama postingan, maka tidak diperlukan:

``` text
group_posts
group_post_likes
group_post_comments
group_post_shares
```

Sebagai gantinya:

``` text
posts
post_likes
post_comments
post_shares
```

sudah dapat menangani semuanya.

Keuntungannya:

-   Tidak ada duplikasi logic Like.
-   Tidak ada duplikasi logic Comment.
-   Feed utama dan Group Feed menggunakan model data yang sama.
-   Search lebih sederhana.
-   Notification lebih sederhana.
-   Recommendation lebih mudah.
-   Analytics lebih mudah.
-   Repost lebih mudah.
-   Maintenance database lebih sederhana.

------------------------------------------------------------------------

# 38. Struktur Social Media yang Direkomendasikan

``` text
USERS
 │
 ├── PROFILES
 ├── FOLLOWS
 ├── FRIENDSHIPS
 └── BLOCKS
 │
 ▼
POSTS
 │
 ├── POST_MEDIA
 ├── POST_LIKES
 ├── POST_REACTIONS
 ├── POST_COMMENTS
 │    ├── COMMENT_LIKES
 │    └── COMMENT_REACTIONS
 ├── POST_SHARES
 ├── POST_MENTIONS
 ├── POST_BOOKMARKS
 ├── POST_REPORTS
 ├── POST_VIEWS
 └── POST_PINS
 │
 ▼
GROUPS
 │
 ├── GROUP_MEMBERS
 ├── GROUP_SETTINGS
 ├── GROUP_CATEGORIES
 ├── GROUP_RULES
 ├── GROUP_JOIN_REQUESTS
 ├── GROUP_INVITES
 ├── GROUP_EVENTS
 ├── GROUP_BANS
 └── GROUP_REPORTS
```

**Catatan penting:** `GROUPS` menggunakan `posts` universal melalui
`posts.group_id`. Jadi interaksi postingan tidak perlu dibuat ulang
khusus untuk Groups.

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
