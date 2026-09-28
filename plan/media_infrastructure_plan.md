# Rencana Media Infrastructure & Bandwidth Strategy — mencari.online

> Blueprint untuk menangani storage, bandwidth, transformations, CDN/cache, optimasi upload, video delivery, monitoring, dan scaling media `mencari.online`.

## 1. Tujuan

Sistem media harus:
1. Menghemat bandwidth semaksimal mungkin.
2. Membuat satu media tetap efisien walaupun dilihat ratusan kali.
3. Menghindari transformation yang tidak perlu.
4. Memakai CDN/cache dengan benar.
5. Memisahkan media dari logic post/profile/group.
6. Memungkinkan migrasi provider di masa depan.
7. Memonitor usage sebelum quota bermasalah.
8. Tidak menggunakan cloning banyak akun untuk bypass batas provider.

---

## 2. Model Usage Cloudinary

Cloudinary Free saat ini menyediakan **25 monthly credits** dan tidak membutuhkan kartu kredit.

Secara umum satu credit dapat dipakai untuk:
- 1 GB managed storage
- 1 GB delivered image bandwidth
- 1.000 transformations

Video memiliki perhitungan khusus berdasarkan delivery/processing dan resolusi.

Storage, bandwidth, dan transformation menggunakan pool usage/credit sesuai plan. Bandwidth dihitung dari ukuran asset yang berhasil dikirim. Transformation dan bandwidth menggunakan rolling 30-day window; storage mencerminkan storage saat ini.

Referensi resmi:
- https://cloudinary.com/pricing
- https://cloudinary.com/documentation/billing_and_plans
- https://cloudinary.com/documentation/developer_onboarding_faq_credits

> Angka/aturan provider dapat berubah; cek kembali pricing resmi sebelum production.

---

## 3. Prinsip Utama: Delivery > Storage

Contoh original 5 MB:
- 100 views × 5 MB = 500 MB bandwidth
- 100 views × 200 KB = sekitar 20 MB bandwidth

Jadi fokus utama social media adalah **bytes per view**, bukan storage saja.

---

## 4. Arsitektur Besar

```text
MENCARI.ONLINE
      |
Media Service
      |
 +----+----+
 |         |
IMAGE     VIDEO
 |         |
resize    transcode/ABR
 |         |
 +----+----+
      |
Cloudinary CDN
      |
users / viewers
```

Frontend dan database tidak boleh bergantung langsung pada URL Cloudinary sebagai identitas utama.

---

## 5. Media Abstraction

Contoh tabel:

```text
media
------------------------------------------------
id
user_id
type
provider
provider_account
public_id
version
mime_type
file_size
width
height
duration
original_url
thumb_url
feed_url
detail_url
status
created_at
updated_at
```

Gunakan `media_id` sebagai identitas aplikasi.

Idealnya frontend dapat memakai:

```text
https://mencari.online/media/123
```

dan Media Service menentukan provider/URL delivery.

---

## 6. CDN & Cache

### Media immutable
Untuk foto/video yang sudah dipublish dan tidak berubah, gunakan cache panjang. Cloudinary menyatakan delivered assets dapat tetap cached di CDN hingga sekitar 30 hari pada kondisi standard delivery.

### Versioned URL
Gunakan konsep:

```text
/media/123/v1
/media/123/v2
```

Jika asset berubah, gunakan version baru sehingga CDN tidak menyajikan versi lama.

### Invalidation
Gunakan hanya jika benar-benar perlu menghapus cached copy lama. Cloudinary menyediakan invalidation.

> Cache/CDN meningkatkan delivery dan mencegah pemrosesan ulang yang tidak perlu, tetapi **jangan menganggap cache membuat delivered bandwidth menjadi nol**.

Referensi:
- https://cloudinary.com/documentation/image_transformations
- https://cloudinary.com/documentation/invalidate_cached_media_assets_on_the_cdn

---

## 7. Image Upload Pipeline

```text
User upload 8 MB
       |
   Cloudinary
       |
 +-----+------+------+
 |            |      |
Original     Feed   Detail
             |
          Thumb
```

MVP cukup memakai 3 ukuran utama:
- `thumb` sekitar 300px
- `feed` sekitar 800px
- `detail` sekitar 1600px

Sesuaikan dengan UI responsive.

Jangan membuat puluhan ukuran.

---

## 8. Image Delivery

Gunakan:
- Feed → `thumb/feed`
- Post detail → `detail`
- Original → hanya bila memang diminta

Jangan mengirim original 5 MB ke feed jika UI hanya membutuhkan gambar sekitar 400–800px.

Gunakan optimasi delivery seperti kualitas otomatis dan format optimal saat delivery jika sesuai konfigurasi.

---

## 9. Standardisasi Transformations

Gunakan preset/named transformation:

```text
IMAGE_THUMB
IMAGE_FEED
IMAGE_DETAIL
```

Hindari variasi seperti:

```text
w=501
w=502
w=503
...
```

Karena variasi transformation dapat menghasilkan derived asset baru dan meningkatkan usage/storage.

---

## 10. Upload Presets

Buat preset berdasarkan kebutuhan:

```text
post-image
profile-image
group-image
group-cover
post-video
```

Upload preset dapat memusatkan aturan folder, upload behavior, incoming transformation, eager transformation, dan opsi lain.

Referensi:
https://cloudinary.com/documentation/upload_presets

---

## 11. Incoming vs Eager Transformation

**Incoming transformation**
- digunakan untuk normalisasi/batasan saat upload;
- dapat membatasi resolusi;
- dapat menormalkan format.

**Eager transformation**
- membuat derivative saat upload;
- cocok untuk asset yang sering diakses;
- membantu menyiapkan video/image sebelum first view.

Eager transformation tetap memakai transformation usage ketika derivative dibuat.

Referensi:
https://cloudinary.com/documentation/eager_and_incoming_transformations

### Catatan
Jangan membuat transformation yang sama sekaligus sebagai incoming dan eager tanpa alasan yang jelas.

Untuk eager upload, gunakan format konkret; `f_auto` ditentukan saat delivery berdasarkan browser dan bukan mekanisme yang tepat untuk eager generation.

---

## 12. Video Strategy

Jangan:

```text
30 MB original MP4
      |
100 viewers
      |
3 GB delivery
```

Gunakan:

```text
Upload
  |
Transcoding
  |
Poster
  |
Adaptive Bitrate Streaming
  |
CDN
```

Gunakan adaptive streaming jika sesuai plan/use case.

Untuk MVP, batasi rendition agar tidak terlalu banyak, misalnya:

```text
360p
540p
720p
```

---

## 13. Video Feed Behavior

Saat video baru muncul:

```text
video muncul
     |
poster
     |
user benar-benar play
     |
stream dimulai
```

Tujuan:

```text
impression != full video delivery
```

Video yang hanya dilewati user tidak seharusnya otomatis menghabiskan bandwidth sebesar video yang benar-benar ditonton.

---

## 14. Poster Video

Setiap video sebaiknya memiliki poster/thumbnail:

```text
video
 |
 +-- poster
 +-- stream
```

Feed menampilkan poster terlebih dahulu.

---

## 15. Simulasi Bandwidth

### Foto 5 MB

100 views:

```text
5 MB × 100 = 500 MB
```

Dengan feed version 200 KB:

```text
0,2 MB × 100 = 20 MB
```

500 views:

```text
200 KB × 500 ≈ 100 MB
```

1.000 views:

```text
200 KB × 1.000 ≈ 200 MB
```

### Video 30 MB

Jika original dikirim penuh:

```text
30 MB × 500 = 15 GB
```

Jika rata-rata delivery efektif 3 MB:

```text
3 MB × 500 = 1,5 GB
```

Angka video di atas hanya ilustrasi; hasil nyata tergantung durasi, bitrate, codec, resolution, dan berapa detik yang benar-benar ditonton.

---

## 16. Media Viral

Jika:

```text
Media A
Cloudinary Account X
 |
 +-- 10 views
 +-- 100 views
 +-- 1.000 views
 +-- 100.000 views
```

bandwidth media tersebut tetap terkait dengan provider/account tempat media itu berada.

**Mengaktifkan account lain tidak otomatis memindahkan bandwidth media lama ke account baru.**

Solusi utama:
1. kecilkan delivery size;
2. gunakan CDN/cache;
3. poster untuk video;
4. adaptive streaming;
5. kurangi request yang tidak perlu;
6. monitor media populer;
7. saat skala tinggi, evaluasi object storage/CDN architecture.

---

## 17. Cloning / Multiple Cloudinary Accounts

**Jangan membuat banyak akun hanya untuk bypass usage restriction.**

Cloudinary Acceptable Use Policy menyatakan bahwa membuka multiple accounts untuk menghindari usage restrictions atau memperoleh tambahan storage/usage lintas akun dilarang.

Referensi:
https://cloudinary.com/trust/aup

Jadi:

```text
Account 1 penuh
 -> Account 2
 -> Account 3
 -> Account 4
```

bukan strategi yang direkomendasikan untuk mengakali Free quota.

Jika suatu hari ada beberapa environment/account karena alasan operasional yang sah, tetap gunakan provider abstraction dan pastikan sesuai Terms/AUP.

---

## 18. Monitoring

Buat tabel:

```text
media_provider_usage
----------------------------------
provider
provider_account
storage_used
bandwidth_used
transformation_used
credit_used
usage_window_start
usage_window_end
status
last_checked_at
```

Status internal:

```text
NORMAL
WATCH
WARNING
CRITICAL
```

Contoh threshold internal:

```text
0–60%     NORMAL
60–75%    WATCH
75–85%    WARNING
85–90%    CRITICAL
90%+      ACTION
```

Ini adalah threshold internal, bukan batas resmi Cloudinary.

---

## 19. Monitor Tiga Hal

Jangan hanya melihat storage.

Pantau:

```text
Storage
Bandwidth
Transformations
```

Contoh:

```text
Storage      30%
Bandwidth    90%
Transform    20%
```

Artinya bandwidth adalah bottleneck walaupun storage masih rendah.

Media lama tetap menggunakan provider/account tempat media tersebut berada.

---

## 20. Auto-Switch Architecture

Auto-switch sebaiknya digunakan untuk **provider abstraction/failover/migration yang sah**, bukan bypass quota.

Contoh:

```text
Upload
  |
Media Service
  |
Provider Manager
  |
 +---- Provider A
 |
 +---- Provider B
 |
 +---- Future Provider
```

Database tetap menyimpan:

```text
provider
provider_account
public_id
version
```

sehingga media dapat dilacak dengan jelas.

---

## 21. Scaling Roadmap

### Fase 1 — MVP

```text
Cloudinary
+ Media Service
+ Upload Presets
+ 3 image variants
+ Video poster
+ Adaptive streaming bila tersedia
+ CDN
+ Usage monitoring
```

### Fase 2 — Traffic mulai ramai

Tambahkan:
- media usage dashboard;
- bandwidth alert;
- popular media tracking;
- transformation standardization;
- provider abstraction yang lebih lengkap.

### Fase 3 — Traffic besar

Evaluasi berdasarkan data aktual:

```text
storage/month
bandwidth/month
transformations/month
video delivery/processing
```

Kemudian pertimbangkan:
- paid Cloudinary;
- object storage;
- CDN architecture;
- dedicated media processing;
- video infrastructure.

---

## 22. Target Engineering Awal

### Image

Target internal:

```text
Feed image: ~100–300 KB
Detail: ~300 KB–1 MB
Original: jangan dikirim sebagai default
```

Ini adalah target optimasi aplikasi, bukan batas Cloudinary.

### Video

```text
Poster: sekecil mungkin
Streaming: adaptive bitrate
Original: jangan digunakan untuk default feed delivery
```

---

## 23. Security

Pertimbangkan Strict Transformations agar user tidak bebas membuat transformation on-the-fly yang tidak terkendali.

Referensi:
https://cloudinary.com/documentation/developer_onboarding_faq_account_security

Untuk media privat, jangan menganggap random public ID sebagai security. Gunakan mekanisme access control/signed delivery sesuai kebutuhan.

Referensi:
https://cloudinary.com/documentation/control_access_to_media

---

## 24. Struktur Database yang Direkomendasikan

```text
users
profiles
posts
comments
likes
groups
...

media
media_variants
media_provider_usage
media_events
```

### `media`

```text
id
user_id
type
provider
provider_account
public_id
version
mime_type
file_size
width
height
duration
status
created_at
```

### `media_variants`

```text
id
media_id
variant_name
public_id
url
width
height
file_size
format
created_at
```

Variant:

```text
thumb
feed
detail
poster
stream
```

---

## 25. Prinsip "Satu Media, Banyak View"

Target:

```text
1 upload
   |
   +-- variant generation
   |
   +-- CDN/cache
   |
   +-- hundreds of views
```

Bukan:

```text
1 upload
   |
   +-- transformation setiap view
   |
   +-- original setiap view
```

Cloudinary menyatakan transformed asset yang sama dapat dicache dan dikirim melalui CDN pada request berikutnya.

Referensi:
https://cloudinary.com/documentation/image_transformations

---

## 26. Checklist Production

### Image
- [ ] Maximum upload resolution
- [ ] Maximum file size
- [ ] Upload preset
- [ ] Thumb variant
- [ ] Feed variant
- [ ] Detail variant
- [ ] Standardized transformations
- [ ] Responsive delivery
- [ ] Original tidak dipakai untuk feed

### Video
- [ ] Maximum file size
- [ ] Maximum duration
- [ ] Poster
- [ ] Transcoding
- [ ] Adaptive streaming
- [ ] Limited rendition
- [ ] Tidak autoplay full download
- [ ] Delivery hanya saat diperlukan

### CDN
- [ ] Versioned URLs
- [ ] Long cache untuk asset immutable
- [ ] Invalidation hanya jika diperlukan
- [ ] Monitoring delivery/cache performance

### Database
- [ ] Media abstraction
- [ ] Provider
- [ ] Provider account/environment
- [ ] Public ID
- [ ] Version
- [ ] Variants
- [ ] Status

### Monitoring
- [ ] Storage
- [ ] Bandwidth
- [ ] Transformations
- [ ] Credit usage
- [ ] Rolling 30-day usage
- [ ] Alert threshold

### Scaling
- [ ] Provider abstraction
- [ ] Tidak hard-code Cloudinary di seluruh aplikasi
- [ ] Tidak menggunakan multi-account untuk bypass quota
- [ ] Ada migration path ke architecture lain

---

## 27. Final Architecture MVP

```text
                         MENCARI.ONLINE
                                |
                         Application API
                                |
                          Media Service
                                |
                    +-----------+-----------+
                    |                       |
                  IMAGE                   VIDEO
                    |                       |
             Upload Preset             Upload Preset
                    |                       |
             Optimization              Transcoding
                    |                       |
          +---------+---------+             |
          |         |         |             |
        Thumb      Feed     Detail         HLS
          |         |         |             |
          +---------+---------+-------------+
                    |
             Cloudinary CDN
                    |
              Browser / App
```

---

## 28. Kesimpulan

Strategi awal `mencari.online`:

```text
1. Cloudinary sebagai media engine MVP
2. Media Service sebagai abstraction layer
3. Upload Presets untuk standardisasi
4. Image hanya 3 variant utama
5. Original tidak dikirim ke feed
6. Video memakai poster + adaptive streaming
7. Asset immutable memakai long CDN caching
8. Versioned URL untuk perubahan asset
9. Transformation dibuat sesedikit mungkin
10. Monitor storage + bandwidth + transformations
11. Jangan mengandalkan cloning account untuk bypass quota
12. Saat scale, evaluasi paid Cloudinary / object storage + CDN
```

### Prinsip paling penting

```text
STORAGE
  -> jumlah media yang disimpan

TRANSFORM
  -> jumlah derivative/processing

BANDWIDTH
  -> views × bytes per view
  -> risiko terbesar untuk social media

TARGET UTAMA
  -> sekecil mungkin bytes per view
```

> **Goal:** satu foto/video boleh dilihat ratusan kali, tetapi setiap view hanya mengirim media yang memang dibutuhkan user, bukan original asset.
