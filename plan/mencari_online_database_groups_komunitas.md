# mencari.online --- Database Groups / Komunitas

Dokumen ini berisi rancangan struktur database lengkap untuk fitur
**Groups / Komunitas** pada platform `mencari.online`.

Struktur dibuat modular agar Groups dapat berkembang dari fitur
komunitas sederhana menjadi salah satu sumber utama konten, interaksi,
discovery, event, dan moderation di platform.

------------------------------------------------------------------------

## 1. Tujuan Arsitektur

Fitur Groups / Komunitas di `mencari.online` dirancang untuk mendukung:

-   Pembuatan komunitas oleh user.
-   Komunitas public, private, dan hidden.
-   Sistem member dan role.
-   Admin dan moderator.
-   Postingan khusus di dalam group.
-   Upload foto/video/media.
-   Kategori dan topik komunitas.
-   Aturan komunitas.
-   Join request.
-   Undangan member.
-   Event komunitas.
-   Ban dan moderation.
-   Report konten/member.
-   Notifikasi yang berkaitan dengan group.
-   Discovery dan rekomendasi group.

Prinsip utamanya adalah **memisahkan data group, membership, content,
moderation, dan settings** agar database mudah dirawat dan dikembangkan.

------------------------------------------------------------------------

# 2. Gambaran Struktur Database

``` text
groups
├── group_members
├── group_settings
├── group_categories
├── group_category_relations
├── group_posts
├── group_post_media
├── group_rules
├── group_join_requests
├── group_invites
├── group_events
├── group_event_members
├── group_bans
├── group_reports
└── group_notifications
```

Relasi dengan tabel platform yang sudah ada:

``` text
users
│
├── groups.owner_id
├── group_members.user_id
├── group_posts.user_id
├── group_join_requests.user_id
├── group_invites.inviter_id
├── group_invites.invitee_id
├── group_events.created_by
├── group_event_members.user_id
├── group_bans.user_id
├── group_reports.reporter_id
└── group_notifications.user_id
```

------------------------------------------------------------------------

# 3. Tabel `groups`

## Fungsi

Tabel utama yang menyimpan identitas dan informasi dasar sebuah
komunitas.

Satu record = satu komunitas.

## Struktur

  Field           Type             Null Key      Fungsi
  --------------- -------------- ------ -------- ----------------------------------
  `id`            UUID/ULID          NO PK       ID unik group
  `owner_id`      UUID/ULID          NO FK       User pemilik group
  `name`          VARCHAR(150)       NO INDEX    Nama group
  `slug`          VARCHAR(180)       NO UNIQUE   URL-friendly identifier
  `description`   TEXT              YES \-       Deskripsi group
  `avatar_url`    TEXT              YES \-       Logo/foto group
  `cover_url`     TEXT              YES \-       Cover group
  `privacy`       ENUM               NO INDEX    `public`, `private`, `hidden`
  `status`        ENUM               NO INDEX    `active`, `suspended`, `deleted`
  `location_id`   UUID/ULID         YES FK       Lokasi group
  `created_at`    TIMESTAMP          NO INDEX    Waktu dibuat
  `updated_at`    TIMESTAMP          NO \-       Waktu terakhir diubah

## Penjelasan

### `id`

ID unik untuk setiap group.

Sebaiknya menggunakan UUID atau ULID agar ID internal tidak mudah
ditebak.

### `owner_id`

Menunjukkan user yang membuat dan memiliki group.

Relasi:

``` text
users.id → groups.owner_id
```

### `name`

Nama komunitas yang ditampilkan kepada pengguna.

Contoh:

``` text
Komunitas Fotografi Malang
Pecinta Kucing Indonesia
Komunitas Developer Indonesia
```

### `slug`

Identifier untuk URL.

Contoh:

``` text
fotografi-malang
pecinta-kucing-indonesia
developer-indonesia
```

URL:

``` text
mencari.online/groups/fotografi-malang
```

Harus UNIQUE.

### `privacy`

Tipe akses group:

``` text
public
private
hidden
```

#### Public

Semua orang dapat menemukan dan melihat group.

#### Private

Group dapat ditemukan, tetapi konten/member dapat dibatasi.

#### Hidden

Group tidak muncul dalam pencarian/discovery umum dan biasanya hanya
dapat diakses melalui undangan.

### `status`

Status lifecycle group:

``` text
active
suspended
deleted
```

`deleted` lebih baik diperlakukan sebagai soft delete daripada langsung
menghapus data.

------------------------------------------------------------------------

# 4. Tabel `group_members`

## Fungsi

Menyimpan hubungan antara user dengan group.

Ini adalah tabel inti untuk membership.

## Struktur

  Field          Type          Null Key        Fungsi
  -------------- ----------- ------ ---------- -------------------
  `id`           UUID/ULID       NO PK         ID membership
  `group_id`     UUID/ULID       NO FK/INDEX   Group
  `user_id`      UUID/ULID       NO FK/INDEX   User
  `role`         ENUM            NO INDEX      Role user
  `status`       ENUM            NO INDEX      Status membership
  `joined_at`    TIMESTAMP       NO INDEX      Waktu bergabung
  `updated_at`   TIMESTAMP       NO \-         Update membership

## Role

``` text
owner
admin
moderator
member
```

## Status

``` text
active
left
banned
```

## Constraint

``` text
UNIQUE(group_id, user_id)
```

Tujuannya agar satu user tidak memiliki dua membership aktif untuk group
yang sama.

## Contoh

``` text
group_id: grp_123
user_id: usr_456
role: moderator
status: active
```

Artinya user tersebut adalah moderator aktif di group tersebut.

------------------------------------------------------------------------

# 5. Tabel `group_settings`

## Fungsi

Menyimpan konfigurasi perilaku sebuah group.

Settings dipisahkan dari `groups` supaya tabel utama tidak menjadi
terlalu besar.

## Struktur

  Field                   Type          Null Fungsi
  ----------------------- ----------- ------ ----------------------------------
  `group_id`              UUID/ULID       NO PK/FK group
  `post_permission`       ENUM            NO Siapa yang boleh membuat post
  `comment_permission`    ENUM            NO Siapa yang boleh komentar
  `member_approval`       BOOLEAN         NO Apakah join perlu approval
  `post_approval`         BOOLEAN         NO Apakah post perlu approval admin
  `allow_member_invite`   BOOLEAN         NO Member boleh mengundang user
  `allow_events`          BOOLEAN         NO Group dapat membuat event
  `allow_media`           BOOLEAN         NO Member dapat upload media
  `updated_at`            TIMESTAMP       NO Waktu update

## Contoh nilai

### `post_permission`

``` text
everyone
members
admins
```

### `comment_permission`

``` text
everyone
members
admins
```

## Contoh

``` text
member_approval = true
post_approval = false
allow_member_invite = true
allow_events = true
```

Artinya setiap calon member perlu disetujui, tetapi post member langsung
dapat dipublikasikan.

------------------------------------------------------------------------

# 6. Tabel `group_categories`

## Fungsi

Menyimpan kategori yang tersedia untuk komunitas.

## Struktur

  Field           Type             Null Key      Fungsi
  --------------- -------------- ------ -------- ---------------
  `id`            UUID/ULID          NO PK       ID kategori
  `name`          VARCHAR(100)       NO UNIQUE   Nama kategori
  `slug`          VARCHAR(120)       NO UNIQUE   Slug
  `description`   TEXT              YES \-       Deskripsi
  `icon`          VARCHAR(255)      YES \-       Icon kategori
  `created_at`    TIMESTAMP          NO \-       Waktu dibuat

## Contoh kategori

``` text
Teknologi
Gaming
Fotografi
Bisnis
Kuliner
Olahraga
Musik
Pendidikan
Hobi
Komunitas Lokal
```

------------------------------------------------------------------------

# 7. Tabel `group_category_relations`

## Fungsi

Menghubungkan group dengan kategori.

Digunakan karena satu group dapat memiliki lebih dari satu kategori.

## Struktur

  Field           Type          Null Key     Fungsi
  --------------- ----------- ------ ------- ----------
  `group_id`      UUID/ULID       NO PK/FK   Group
  `category_id`   UUID/ULID       NO PK/FK   Kategori

## Primary Key

``` text
PRIMARY KEY(group_id, category_id)
```

## Contoh

``` text
Komunitas Fotografi Malang
├── Fotografi
└── Komunitas Lokal
```

------------------------------------------------------------------------

# 8. Tabel `group_posts`

## Fungsi

Menyimpan postingan yang dibuat khusus di dalam group.

Post group sengaja dipisahkan dari tabel `posts` utama agar permission,
moderation, dan lifecycle konten group dapat berkembang secara
independen.

## Struktur

  Field          Type          Null Key        Fungsi
  -------------- ----------- ------ ---------- --------------
  `id`           UUID/ULID       NO PK         ID post
  `group_id`     UUID/ULID       NO FK/INDEX   Group
  `user_id`      UUID/ULID       NO FK/INDEX   Pembuat post
  `content`      TEXT           YES \-         Isi post
  `status`       ENUM            NO INDEX      Status post
  `is_pinned`    BOOLEAN         NO INDEX      Apakah dipin
  `created_at`   TIMESTAMP       NO INDEX      Waktu dibuat
  `updated_at`   TIMESTAMP       NO \-         Waktu update

## Status

``` text
published
pending
rejected
deleted
```

## Penjelasan

### `pending`

Post menunggu approval moderator/admin.

### `published`

Post tampil kepada member sesuai aturan visibility group.

### `rejected`

Post ditolak oleh moderator/admin.

### `deleted`

Post dihapus secara logical/soft delete.

### `is_pinned`

Digunakan untuk post penting yang ingin ditampilkan di bagian atas
group.

Contoh:

``` text
📌 Peraturan Komunitas
📌 Jadwal Gathering
📌 Pengumuman Admin
```

------------------------------------------------------------------------

# 9. Tabel `group_post_media`

## Fungsi

Menghubungkan post group dengan tabel media yang sudah ada di sistem
utama.

## Struktur

  Field             Type          Null Key   Fungsi
  ----------------- ----------- ------ ----- --------------
  `id`              UUID/ULID       NO PK    ID relasi
  `group_post_id`   UUID/ULID       NO FK    Post
  `media_id`        UUID/ULID       NO FK    Media
  `display_order`   INT             NO \-    Urutan media

## Contoh

``` text
Post
│
├── foto1.jpg
├── foto2.jpg
└── foto3.jpg
```

Media dapat menggunakan tabel `media` global dari database platform.

------------------------------------------------------------------------

# 10. Tabel `group_rules`

## Fungsi

Menyimpan aturan yang berlaku dalam komunitas.

## Struktur

  Field             Type             Null Fungsi
  ----------------- -------------- ------ -------------------
  `id`              UUID/ULID          NO PK
  `group_id`        UUID/ULID          NO FK group
  `title`           VARCHAR(150)       NO Judul aturan
  `description`     TEXT               NO Penjelasan aturan
  `display_order`   INT                NO Urutan tampilan
  `created_at`      TIMESTAMP          NO Waktu dibuat
  `updated_at`      TIMESTAMP          NO Waktu update

## Contoh

``` text
1. Dilarang spam
2. Dilarang promosi tanpa izin
3. Gunakan bahasa yang sopan
4. Hormati anggota lain
```

`display_order` memungkinkan admin mengubah urutan aturan.

------------------------------------------------------------------------

# 11. Tabel `group_join_requests`

## Fungsi

Menyimpan permintaan user untuk bergabung dengan group.

Digunakan terutama untuk private group atau group yang mengaktifkan
approval.

## Struktur

  Field           Type          Null Key        Fungsi
  --------------- ----------- ------ ---------- -------------------------
  `id`            UUID/ULID       NO PK         ID request
  `group_id`      UUID/ULID       NO FK/INDEX   Group
  `user_id`       UUID/ULID       NO FK/INDEX   User
  `message`       TEXT           YES \-         Pesan dari calon member
  `status`        ENUM            NO INDEX      Status request
  `reviewed_by`   UUID/ULID      YES FK         Admin/moderator
  `reviewed_at`   TIMESTAMP      YES \-         Waktu review
  `created_at`    TIMESTAMP       NO INDEX      Waktu request

## Status

``` text
pending
approved
rejected
cancelled
```

## Flow

``` text
User
 ↓
Join Group
 ↓
group_join_requests
 ↓
Admin review
 ↓
approved
 ↓
group_members
```

------------------------------------------------------------------------

# 12. Tabel `group_invites`

## Fungsi

Menyimpan undangan user ke sebuah group.

Bisa digunakan untuk undangan langsung maupun invite link.

## Struktur

  Field          Type             Null Key      Fungsi
  -------------- -------------- ------ -------- ----------------------
  `id`           UUID/ULID          NO PK       ID invite
  `group_id`     UUID/ULID          NO FK       Group
  `inviter_id`   UUID/ULID          NO FK       User yang mengundang
  `invitee_id`   UUID/ULID         YES FK       User yang diundang
  `token`        VARCHAR(255)      YES UNIQUE   Token invite
  `status`       ENUM               NO INDEX    Status
  `expires_at`   TIMESTAMP         YES INDEX    Masa berlaku
  `created_at`   TIMESTAMP          NO INDEX    Waktu dibuat

## Status

``` text
pending
accepted
rejected
expired
cancelled
```

`invitee_id` dapat NULL jika sistem mendukung invite link yang bisa
digunakan oleh siapa saja yang memenuhi syarat.

Contoh:

``` text
mencari.online/groups/fotografi-malang/invite/abc123
```

------------------------------------------------------------------------

# 13. Tabel `group_events`

## Fungsi

Menyimpan event yang dibuat oleh komunitas.

Contoh:

``` text
Gathering Fotografi Malang
Workshop Editing Foto
Turnamen Gaming
Kopdar Komunitas
```

## Struktur

  Field           Type             Null Key        Fungsi
  --------------- -------------- ------ ---------- ------------------
  `id`            UUID/ULID          NO PK         ID event
  `group_id`      UUID/ULID          NO FK/INDEX   Group
  `created_by`    UUID/ULID          NO FK         Pembuat event
  `title`         VARCHAR(200)       NO INDEX      Nama event
  `description`   TEXT              YES \-         Deskripsi
  `cover_url`     TEXT              YES \-         Cover
  `location_id`   UUID/ULID         YES FK         Lokasi
  `start_at`      TIMESTAMP          NO INDEX      Waktu mulai
  `end_at`        TIMESTAMP         YES INDEX      Waktu selesai
  `privacy`       ENUM               NO \-         Visibility event
  `status`        ENUM               NO INDEX      Status event
  `created_at`    TIMESTAMP          NO \-         Dibuat
  `updated_at`    TIMESTAMP          NO \-         Diubah

## Privacy

``` text
group
public
```

## Status

``` text
draft
published
cancelled
completed
```

------------------------------------------------------------------------

# 14. Tabel `group_event_members`

## Fungsi

Menyimpan user yang mengikuti sebuah event.

## Struktur

  Field          Type          Null Key     Fungsi
  -------------- ----------- ------ ------- --------------
  `id`           UUID/ULID       NO PK      ID
  `event_id`     UUID/ULID       NO FK      Event
  `user_id`      UUID/ULID       NO FK      User
  `status`       ENUM            NO INDEX   Status
  `created_at`   TIMESTAMP       NO \-      Waktu dibuat
  `updated_at`   TIMESTAMP       NO \-      Update

## Status

``` text
going
interested
not_going
```

## Constraint

``` text
UNIQUE(event_id, user_id)
```

------------------------------------------------------------------------

# 15. Tabel `group_bans`

## Fungsi

Menyimpan user yang dilarang bergabung atau beraktivitas dalam group.

## Struktur

  Field          Type          Null Key        Fungsi
  -------------- ----------- ------ ---------- -----------------------
  `id`           UUID/ULID       NO PK         ID
  `group_id`     UUID/ULID       NO FK/INDEX   Group
  `user_id`      UUID/ULID       NO FK/INDEX   User yang diban
  `banned_by`    UUID/ULID       NO FK         Admin/moderator
  `reason`       TEXT           YES \-         Alasan ban
  `expires_at`   TIMESTAMP      YES INDEX      Expire jika temporary
  `created_at`   TIMESTAMP       NO INDEX      Waktu ban

## Jenis ban

Ban dapat dibuat permanent atau temporary.

``` text
expires_at = NULL
```

berarti permanent.

Jika memiliki tanggal:

``` text
expires_at = 2026-10-01
```

berarti temporary.

------------------------------------------------------------------------

# 16. Tabel `group_reports`

## Fungsi

Menyimpan laporan terhadap konten atau anggota dalam group.

## Struktur

  Field           Type             Null Fungsi
  --------------- -------------- ------ -----------------
  `id`            UUID/ULID          NO PK
  `group_id`      UUID/ULID          NO Group
  `reporter_id`   UUID/ULID          NO User pelapor
  `target_type`   ENUM               NO Jenis target
  `target_id`     UUID/ULID          NO ID target
  `reason`        VARCHAR(100)       NO Alasan report
  `description`   TEXT              YES Detail laporan
  `status`        ENUM               NO Status report
  `reviewed_by`   UUID/ULID         YES Moderator/admin
  `reviewed_at`   TIMESTAMP         YES Waktu review
  `created_at`    TIMESTAMP          NO Waktu dibuat

## Target

``` text
post
comment
member
```

## Status

``` text
pending
reviewing
resolved
dismissed
```

Catatan: jika nanti sistem memiliki global moderation, tabel report
dapat dibuat lebih generik sehingga tidak hanya berlaku untuk group.

------------------------------------------------------------------------

# 17. Tabel `group_notifications`

## Fungsi

Menyimpan notifikasi yang berkaitan dengan aktivitas group.

## Struktur

  Field            Type             Null Key        Fungsi
  ---------------- -------------- ------ ---------- --------------------------
  `id`             UUID/ULID          NO PK         ID
  `group_id`       UUID/ULID         YES FK         Group terkait
  `user_id`        UUID/ULID          NO FK/INDEX   Penerima
  `actor_id`       UUID/ULID         YES FK         User yang melakukan aksi
  `type`           VARCHAR(100)       NO INDEX      Tipe notifikasi
  `reference_id`   UUID/ULID         YES INDEX      ID objek terkait
  `is_read`        BOOLEAN            NO INDEX      Sudah dibaca atau belum
  `created_at`     TIMESTAMP          NO INDEX      Waktu

## Contoh tipe

``` text
group_join_request
group_join_approved
group_join_rejected
group_post_created
group_post_approved
group_post_rejected
group_mentioned
group_role_changed
group_invitation
group_event_created
group_banned
```

------------------------------------------------------------------------

# 18. Relasi Antar Tabel

Gambaran relasi:

``` text
users
  │
  ├───────────────┐
  │               │
  ▼               ▼
groups        group_members
  │               │
  │               └────── users
  │
  ├── group_settings
  │
  ├── group_categories
  │       │
  │       └── group_category_relations
  │
  ├── group_posts
  │       │
  │       └── group_post_media
  │                   │
  │                   └── media
  │
  ├── group_rules
  │
  ├── group_join_requests
  │
  ├── group_invites
  │
  ├── group_events
  │       │
  │       └── group_event_members
  │
  ├── group_bans
  │
  ├── group_reports
  │
  └── group_notifications
```

------------------------------------------------------------------------

# 19. Relationship Detail

## Users → Groups

``` text
users 1 ─── N groups
```

Satu user dapat membuat banyak group.

------------------------------------------------------------------------

## Users → Group Members

``` text
users 1 ─── N group_members
groups 1 ─── N group_members
```

Secara konseptual:

``` text
users N ─── N groups
```

melalui `group_members`.

------------------------------------------------------------------------

## Groups → Posts

``` text
groups 1 ─── N group_posts
```

Satu group dapat mempunyai banyak post.

------------------------------------------------------------------------

## Users → Group Posts

``` text
users 1 ─── N group_posts
```

Satu user dapat membuat banyak post di berbagai group.

------------------------------------------------------------------------

## Groups → Events

``` text
groups 1 ─── N group_events
```

Satu group dapat membuat banyak event.

------------------------------------------------------------------------

## Events → Users

``` text
group_events N ─── N users
```

melalui:

``` text
group_event_members
```

------------------------------------------------------------------------

# 20. Index yang Direkomendasikan

Karena Groups dapat berkembang menjadi fitur besar, indexing penting.

## `groups`

``` text
UNIQUE(slug)
INDEX(owner_id)
INDEX(privacy)
INDEX(status)
INDEX(created_at)
```

## `group_members`

``` text
UNIQUE(group_id, user_id)
INDEX(group_id)
INDEX(user_id)
INDEX(group_id, role)
INDEX(group_id, status)
INDEX(joined_at)
```

## `group_posts`

``` text
INDEX(group_id, created_at)
INDEX(group_id, status)
INDEX(user_id, created_at)
INDEX(group_id, is_pinned)
```

Untuk feed group, index:

``` text
(group_id, status, created_at)
```

akan sangat berguna.

## `group_join_requests`

``` text
INDEX(group_id, status)
INDEX(user_id, status)
INDEX(created_at)
```

## `group_events`

``` text
INDEX(group_id, start_at)
INDEX(status, start_at)
```

## `group_event_members`

``` text
UNIQUE(event_id, user_id)
INDEX(event_id, status)
INDEX(user_id)
```

## `group_bans`

``` text
INDEX(group_id, user_id)
INDEX(group_id, expires_at)
```

## `group_notifications`

``` text
INDEX(user_id, is_read, created_at)
INDEX(group_id, created_at)
```

------------------------------------------------------------------------

# 21. Soft Delete

Untuk data penting seperti group dan post, sebaiknya jangan langsung
melakukan hard delete.

Alternatif:

``` text
deleted_at TIMESTAMP NULL
```

Contoh:

``` text
groups
deleted_at
```

Jika:

``` text
deleted_at IS NULL
```

berarti aktif.

Jika memiliki timestamp:

``` text
deleted_at = 2026-09-17 20:00:00
```

berarti sudah dihapus secara logical.

Hal ini membantu:

-   Recovery.
-   Audit.
-   Moderation.
-   Pencegahan kehilangan data.
-   Analisis historis.

------------------------------------------------------------------------

# 22. Role dan Permission

Role dasar:

``` text
OWNER
ADMIN
MODERATOR
MEMBER
```

## Owner

Memiliki kontrol tertinggi.

Contoh permission:

``` text
manage_group
manage_settings
manage_admins
manage_moderators
manage_members
manage_posts
manage_rules
manage_events
delete_group
```

## Admin

Dapat mengelola hampir seluruh aktivitas group.

``` text
manage_members
manage_posts
manage_rules
manage_events
manage_settings
```

Beberapa permission sensitif sebaiknya tetap hanya owner.

## Moderator

Fokus pada moderation.

``` text
review_posts
delete_posts
review_reports
ban_members
remove_members
```

## Member

Permission dasar:

``` text
view_group
create_post
comment
react
join_event
```

Permission sebenarnya dapat dikembangkan menjadi sistem granular jika
dibutuhkan.

------------------------------------------------------------------------

# 23. Privacy Model

## Public Group

``` text
Discoverable: YES
View group: YES
View posts: YES
Join: DIRECT / APPROVAL
```

## Private Group

``` text
Discoverable: YES
View group: YES
View posts: MEMBERS
Join: APPROVAL
```

## Hidden Group

``` text
Discoverable: NO
View group: LIMITED
View posts: MEMBERS
Join: INVITE / APPROVAL
```

Implementasi sebenarnya dapat dibuat lebih fleksibel melalui
`group_settings`.

------------------------------------------------------------------------

# 24. Group Feed

Group feed mengambil data dari:

``` text
group_posts
```

Query secara konseptual:

``` sql
SELECT *
FROM group_posts
WHERE group_id = ?
  AND status = 'published'
ORDER BY created_at DESC
LIMIT 20;
```

Untuk production, pagination sebaiknya menggunakan **cursor
pagination**, bukan OFFSET besar.

Contoh:

``` text
GET /groups/{slug}/posts?cursor=abc123
```

------------------------------------------------------------------------

# 25. Pinned Posts

Admin/moderator dapat melakukan pin terhadap post.

Field:

``` text
is_pinned
```

Contoh query:

``` sql
SELECT *
FROM group_posts
WHERE group_id = ?
  AND status = 'published'
ORDER BY is_pinned DESC, created_at DESC;
```

Untuk implementasi lebih lanjut, dapat dibuat tabel khusus:

``` text
group_pinned_posts
```

jika satu group membutuhkan aturan pin yang lebih kompleks.

------------------------------------------------------------------------

# 26. Discovery Groups

Karena nama platform adalah `mencari.online`, discovery group harus
menjadi bagian penting.

Data yang dapat digunakan:

``` text
group_categories
group_members
group_posts
group_events
group.location_id
```

Contoh halaman:

``` text
Mencari Group

[ Cari komunitas... ]

Kategori:
Teknologi
Gaming
Fotografi
Bisnis
Kuliner

Trending:
- Developer Indonesia
- Fotografi Malang
- Komunitas Gaming Indonesia

Dekat kamu:
- Komunitas Malang
- Event Lokal Malang
```

------------------------------------------------------------------------

# 27. Group Ranking / Recommendation

Untuk tahap awal, ranking tidak perlu disimpan sebagai data permanen.

Bisa dihitung dari:

``` text
jumlah member
jumlah post
jumlah komentar
jumlah aktivitas terbaru
jumlah event
growth member
```

Kemudian nantinya dibuat sistem recommendation terpisah.

Jika sudah besar, dapat dibuat tabel:

``` text
group_stats
```

Contoh:

``` text
group_id
member_count
post_count
comment_count
active_member_count
view_count
growth_score
activity_score
updated_at
```

Tabel statistik ini **tidak wajib untuk MVP**.

------------------------------------------------------------------------

# 28. Counter yang Bisa Diduplikasi

Beberapa angka dapat dihitung langsung:

``` text
COUNT(group_members)
COUNT(group_posts)
```

Tetapi pada skala besar, COUNT berulang dapat mahal.

Kemudian bisa menggunakan denormalized counters:

``` text
groups.member_count
groups.post_count
groups.event_count
```

Atau tabel:

``` text
group_stats
```

Namun untuk MVP, tidak perlu terlalu cepat melakukan denormalisasi.

Mulai dengan query/database yang sederhana lalu optimasi berdasarkan
beban nyata.

------------------------------------------------------------------------

# 29. Struktur MVP

Untuk versi pertama `mencari.online`, tabel yang benar-benar diperlukan:

``` text
groups
group_members
group_settings
group_categories
group_category_relations
group_posts
group_post_media
group_rules
group_join_requests
group_bans
```

Dengan tabel existing:

``` text
users
media
locations
```

Dengan struktur tersebut sudah dapat dibuat:

``` text
Create Group
↓
Group Profile
↓
Join Group
↓
Member Management
↓
Group Feed
↓
Create Post
↓
Upload Media
↓
Rules
↓
Moderation
```

------------------------------------------------------------------------

# 30. Fitur Tahap Berikutnya

Setelah MVP stabil:

``` text
group_invites
group_events
group_event_members
group_reports
group_notifications
```

Kemudian dapat dikembangkan:

``` text
group_polls
group_questions
group_files
group_guides
group_topics
group_tags
group_member_badges
group_moderation_logs
group_post_reactions
group_post_comments
group_saved_posts
group_featured_posts
```

Fitur-fitur tersebut tidak perlu dimasukkan sejak awal jika belum
dibutuhkan.

------------------------------------------------------------------------

# 31. Arsitektur yang Disarankan

Jangan membuat satu tabel besar seperti:

``` text
groups
- name
- owner
- members
- posts
- rules
- events
- settings
- bans
- reports
...
```

Lebih baik:

``` text
groups
    ↓
group_members
group_settings
group_posts
group_rules
group_events
group_bans
group_reports
...
```

Keuntungannya:

-   Schema lebih bersih.
-   Query lebih mudah dipahami.
-   Maintenance lebih mudah.
-   Fitur dapat dikembangkan secara independen.
-   Permission lebih mudah dikelola.
-   Moderation lebih mudah dikembangkan.
-   Cocok untuk pertumbuhan platform.

------------------------------------------------------------------------

# 32. Rekomendasi Teknologi Database

Untuk relational database, struktur ini cocok menggunakan:

``` text
PostgreSQL
```

Rekomendasi umum:

``` text
Primary ID      → UUID / ULID
Timestamp       → TIMESTAMPTZ
Long text       → TEXT
Short text      → VARCHAR
Boolean         → BOOLEAN
Flexible data   → JSONB
```

Untuk media:

``` text
Database
   ↓
media metadata
   ↓
Object Storage
   ↓
CDN
```

Jangan menyimpan file foto/video langsung sebagai BLOB di database utama
jika platform ditargetkan untuk skala besar.

------------------------------------------------------------------------

# 33. Kesimpulan Struktur

Struktur Groups lengkap:

``` text
groups
│
├── group_members
│
├── group_settings
│
├── group_categories
│   └── group_category_relations
│
├── group_posts
│   └── group_post_media
│
├── group_rules
│
├── group_join_requests
│
├── group_invites
│
├── group_events
│   └── group_event_members
│
├── group_bans
│
├── group_reports
│
└── group_notifications
```

Core relationship:

``` text
USER
 │
 ├── creates ─────────────── GROUP
 │                            │
 │                            ├── MEMBERS
 │                            ├── SETTINGS
 │                            ├── CATEGORIES
 │                            ├── POSTS
 │                            ├── RULES
 │                            ├── JOIN REQUESTS
 │                            ├── INVITES
 │                            ├── EVENTS
 │                            ├── BANS
 │                            ├── REPORTS
 │                            └── NOTIFICATIONS
 │
 └── participates in ──────── GROUP
```

Dengan struktur ini, Groups `mencari.online` sudah punya fondasi
database untuk berkembang dari komunitas sederhana menjadi **social
community system** yang terintegrasi dengan Feed, Search/Discovery,
Profile, Notifications, dan nantinya Messaging.
