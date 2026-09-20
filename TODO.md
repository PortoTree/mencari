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
- (Frontend) Mengganti teks hardcode bahasa Indonesia pada dropdown menu chat room dengan variabel terjemahan next-intl dan mendaftarkan key pada en.json & id.json (src/app/[locale]/beranda/page.tsx)
- (Frontend) Membungkus icon kirim (paper airplane) dengan tombol bulat solid berwarna hijau (bg-[#00B47A]) dan text-white (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus class padding dan translate pada SVG icon kirim (paper airplane) agar presisi di tengah tombol bulat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan utility class translate-x-[1px] dan translate-y-[1px] pada SVG icon kirim (paper airplane) untuk melakukan optical centering manual (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah background bottom area chat (tempat ngetik) jadi transparan & tanpa border-t agar menyatu dengan background room chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memberi warna kontras (bg-white/bg-dark) dan border pada input pill chat agar lebih stand out dari background (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah translate-y-[1px] menjadi -translate-y-[1px] pada SVG icon kirim untuk memperbaiki ilusi optik agar pesawat lebih naik (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus header (teks Chat Info dan icon close/X) dari sidebar kanan (Chat Info Sidebar) sesuai request (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus 2 icon aksi (Pesan dan Panggil) di bawah nama pada Chat Info Sidebar dan menggantinya dengan 1 icon Profil saja menggunakan key terjemahan chat.profile (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan efek hover (group-hover) pada tombol Profil di sidebar kanan agar icon dan teksnya berubah warna menjadi hijau kontras (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan 3 kategori dummy di sidebar kanan (Link, Media Gallery, Media File) dengan tampilan UI modern lengkap dengan icon, judul, konten dummy yang sesuai, dan efek hover (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan utiliti shrink-0 pada kontainer avatar di sidebar kanan untuk mencegah bug visual (gepeng/mengecil) saat konten kategori di bawahnya terlalu panjang (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan label Tanggal Chat di bagian atas kumpulan pesan (tengah room chat) dan mengatur ulang layout chat bubble supaya jam/waktu dan status baca (centang ganda) menyatu rapi (inline float-right) di dalam bubble pesan (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah posisi waktu chat dari inline (di dalam bubble) menjadi di luar bubble (di bawah): pojok kiri bawah untuk pesan masuk, dan pojok kanan bawah beserta centang biru untuk pesan keluar (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan 4 status mark pesan (Gagal terkirim, Mengirimkan..., Terkirim, Dilihat) beserta icon custom SVG menggunakan teknik CSS Mask dan membuat 4 bubble dummy chat untuk mendemonstrasikan masing-masing status (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki teks status chat yang sebelumnya hardcoded bahasa Indonesia dengan menambahkan kunci translasi next-intl (chat.failedToSend, chat.sending, chat.sent, chat.read) ke id.json dan en.json agar mendukung multi-bahasa (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengatur ulang posisi jam waktu ke dalam bubble teks (untuk pengirim dan penerima), sambil mempertahankan label status mark (Gagal terkirim, Dilihat, dsb.) beserta icon SVG tetap di luar bubble di pojok kanan bawah (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan indikator waktu pada status 'Dilihat' (contoh: Dilihat 11.12) untuk memberikan informasi lebih detail kapan pesan dibaca (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan tombol opsi titik tiga (hover menu) di luar bagian pinggir tiap bubble chat (kanan untuk bubble penerima, kiri untuk bubble pengirim) yang muncul saat di-hover (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan menu dropdown pada icon titik tiga dengan list aksi (Balas, Salin, Teruskan, Pilih, Hapus) menggunakan icon SVG yang disesuaikan. Mendukung multi-bahasa via next-intl dan state aktif khusus per bubble agar tidak tumpang tindih (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mempercantik custom scrollbar khusus untuk area chat room agar lebih modern dan tidak menggunakan style bawaan browser (globals.css & page.tsx)
- (Frontend) Menambahkan fitur auto-scroll ke pesan paling bawah (terbaru) saat pengguna pertama kali membuka room chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki logika auto-scroll ke bawah saat membuka room chat agar langsung tereksekusi ketika halaman dirender pertama kali (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menyesuaikan posisi munculnya dropdown menu pada pesan terbawah agar ke atas (bottom-full) sehingga tidak memotong layar atau menambah scroll ekstra ke bawah (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan icon status (terkirim, dibaca, dll) ke dalam preview list obrolan di sidebar kiri menggunakan teknik CSS mask agar SVG bisa diwarnai sesuai dengan status masing-masing (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki error hydration dengan mengganti tag <div> menjadi <span> pada komponen ChatStatusMark agar valid diletakkan di dalam tag <p> (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan suppressHydrationWarning pada elemen tanggal/waktu di list obrolan untuk mencegah error hydration (tanggal beda antara server dan client akibat Date.now()) (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengoptimalkan UI/UX pada bagian sidebar kanan (Links, Media Gallery, Media Files) dengan merapikan padding, menambahkan hover states, icon pada link, dan membetulkan arah panah accordion (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan icon X (Close) di sebelah icon titik tiga pada header room chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan state activeChatIdx untuk mengatur status apakah sebuah obrolan sedang terbuka atau tidak. Jika tidak ada obrolan terbuka, halaman utama menampilkan placeholder kosong. (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menukar posisi icon + (New Chat) dan icon Teman (Friendlist) di bagian header sidebar kiri (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan panel Buat Obrolan Pribadi atau Grup yang muncul (slide dari kiri ke kanan) saat klik icon + di sidebar chat. (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki dropdown popup menu pada icon titik 3 di header obrolan agar tidak terpotong (diubah menjadi rata kanan / right-0) akibat adanya overflow-hidden di sidebar. (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus icon Teman dari header sidebar kiri (chat list) dan memindahkan Daftar Teman ke sidebar kanan. Sidebar kanan otomatis menampilkan Friendlist saat Chat Info ditutup atau saat belum ada chat yang dipilih. (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan icon X di pojok kanan atas sidebar Chat Info untuk menutup panel Chat Info dan memunculkan kembali Friendlist (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki tombol Lihat Profil di dropdown header room chat agar bisa membuka state profil (Chat Info) di sidebar kanan (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan otomatis buka Chat Info saat klik chat list item, dan view profil di tengah layar saat klik Lihat Profil dari titik 3 (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah tampilan Profile Info di kolom tengah menjadi Full Screen, menambahkan icon action Profile dan Chat, serta menambahkan placeholder Links, Media Gallery, dan Media Files dengan style yang lebih lega (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah aksi pada icon Chat di Profile Info tengah agar otomatis membuka panel Chat Info di sidebar kanan saat memasuki room chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan fitur agar display profil (foto & nama) pada header room chat bisa diklik untuk membuka panel Chat Info di sidebar kanan (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki hardcoded nama pada bagian welcome intro di dalam room chat agar sesuai dengan chat yang sedang aktif (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus background hover abu-abu pada kategori accordion (Links, Media Gallery, Media Files) di Info Profil (tengah & kanan) dan menggantinya dengan efek hover underline pada teks (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah UX panel Buat Obrolan: user dapat memilih beberapa teman (multi-select), list pilihan akan masuk sebagai pill/chip di dalam kolom pencarian, dan tombol Kirim (icon pesawat) akan muncul jika ada teman yang dipilih (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan fitur pembuatan grup dan form UI di kolom tengah ketika user memilih >1 obrolan baru (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus pill list dan aksi pada header sidebar, dan memindahkannya ke kolom tengah sebagai preview mini list jika user memilih chat baru (src/app/[locale]/beranda/page.tsx)
- (Frontend) Optimasi UI/UX layout mini list (preview anggota grup) supaya tidak berantakan saat judul/pill teks panjang (src/app/[locale]/beranda/page.tsx)
- (Frontend) Merombak ulang layout preview mini list agar menyatu dengan body kolom tengah (bukan modal/kotak melayang) (src/app/[locale]/beranda/page.tsx)
- (Frontend) Tambah hover icons (profil & +) dengan Tailwind tooltip dan sticky footer Buat Grup di sidebar kanan friend list (src/app/[locale]/beranda/page.tsx)
- (Frontend) Refactor icon + pada friend list sidebar: profil tetap hover-only, icon + permanent saat mode add aktif, icon selected ganti jadi X merah (src/app/[locale]/beranda/page.tsx)
- (Frontend) Sembunyikan icon + saat mode add tidak aktif (hanya tampil jika showAddIcons = true) (src/app/[locale]/beranda/page.tsx)
- (Frontend) Header sidebar kanan: icon + berubah jadi Cancel/Remove All (trash) sesuai kondisi mode add dan seleksi. Tambah localStorage untuk state selectedFriendsToAdd (src/app/[locale]/beranda/page.tsx)
- (Frontend) Jadikan friend list di sidebar kanan clickable untuk langsung membuka room chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Set setIsChatInfoOpen(true) saat klik row di sidebar kanan supaya konsisten dengan sidebar kiri (src/app/[locale]/beranda/page.tsx)
- (Frontend) Perbaiki auto-scroll room chat (ubah dependency useEffect dari [] menjadi [activeChatIdx]) agar selalu turun ke pesan terbaru setiap kali ganti obrolan (src/app/[locale]/beranda/page.tsx)
- (Frontend) Sinkronisasi state selectedFriendsToAdd dengan form Grup: sidebar kanan tidak reset saat membuka form grup, remove dari sidebar langsung update di member grup (src/app/[locale]/beranda/page.tsx)
- (Frontend) Hapus layer MiniListPreview, biarkan layar obrolan kosong (atau chat terakhir aktif) saat memilih member, dan hilangkan sticky footer Buat Grup ketika form Grup sudah terbuka di kolom tengah (src/app/[locale]/beranda/page.tsx)