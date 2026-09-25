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
- (Frontend) Gabung header Create Group langsung ke dalam body scrollable (src/app/[locale]/beranda/page.tsx)
- (Frontend) Pindahkan tombol Create Group dari sticky footer ke dalam scrollable body dan diposisikan di pojok kanan bawah (flex-end) sejajar dengan form (src/app/[locale]/beranda/page.tsx)
- (Frontend) Hapus icon back (<) di atas form grup, ganti menjadi tombol Cancel di sebelah tombol Create Group yang akan mereset state dan mematikan mode Add (src/app/[locale]/beranda/page.tsx)
- (Frontend) Logika baru: jika form grup sedang terbuka, dan user mengklik cancel/remove all di header sidebar kanan, maka form grup akan tertutup dan kolom tengah kembali ke halaman awal (src/app/[locale]/beranda/page.tsx)
- (Frontend) Perbaiki logika tombol Cancel/Remove All di sidebar kanan: Remove All (tong sampah) hanya akan mengosongkan list tanpa menutup form grup, sedangkan Cancel (X, saat mode off) baru akan menutup form grup (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menghapus icon centang pada tombol Create Group di form. Menambahkan fitur validasi: tombol otomatis ter-disable (tidak bisa diklik dan jadi warna abu-abu) jika tidak ada member grup yang dipilih (src/app/[locale]/beranda/page.tsx)
- (Frontend) Perbaiki UX row klik sidebar kanan: Jika Add Mode ON, mengklik seluruh row akan berfungsi sebagai toggle add/remove member grup. Jika Add Mode OFF, baru mengklik row akan membuka halaman chat (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memindahkan menu Permintaan Pesan dari dropdown Filter ke dalam dropdown Settings di sidebar kiri (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah teks dropdown Settings (chat.settings) menjadi Preferensi (src/app/[locale]/beranda/page.tsx & messages)
- (Frontend) Perbaiki bug salah penempatan menu Permintaan Pesan (memindahkannya ke dropdown settings sidebar utama) (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menukar posisi menu di dropdown settings: Permintaan Pesan dipindah ke atas, Preferensi di paling bawah, dan menambahkan garis pembatas (divider) di atas menu Preferensi (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memindahkan menu Manage Chats di dalam dropdown settings supaya berada di bawah garis pembatas (divider), sejajar dengan Preferensi (src/app/[locale]/beranda/page.tsx)
- (Frontend) Mengubah deskripsi empty state obrolan (noChatSelectedDesc) di file translation id.json dan en.json
- (Frontend) Mengubah icon menu Manage Chats dari icon bubble chat menjadi icon list bergaris (src/app/[locale]/beranda/page.tsx)

- (Frontend) Menyelaraskan dropdown filter di panel chat melayang (floating widget) agar sama dengan dropdown filter di halaman /obrolan (menggunakan icon SVG untuk Group Chat dan Archived)
- (Frontend) Memperbaiki JSX syntax error (Expression expected) akibat splice baris yang salah pada panel chat melayang (src/app/[locale]/beranda/page.tsx)
- (Frontend) Menambahkan menu filter Favorite (dengan icon SVG) di urutan paling atas pada dropdown filter di panel chat melayang (src/app/[locale]/beranda/page.tsx)
- (Frontend) Membuat Panel Room Chat (floating window) di sebelah kiri Panel Obrolan (floating widget) pada halaman beranda, yang akan terbuka saat sebuah chat diklik (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memisahkan state aktif antara chat room utama (halaman /obrolan) dengan chat room melayang (floating widget) untuk menghindari konflik terbuka bersamaan (menggunakan activeFloatingChatIdx)
- (Frontend) Memperbaiki posisi layout Floating Chat Room agar jaraknya pas (right-[396px]) di sebelah panel obrolan (src/app/[locale]/beranda/page.tsx)
- (Frontend) Memperbaiki tombol close pada Floating Chat Room yang tidak berfungsi karena salah memanggil setter state
- (Frontend) Menambahkan fitur auto-close pada Floating Chat Room ketika user berpindah ke halaman utama /obrolan (tab chat aktif)
- (Frontend) Membuat dropdown filter pada panel obrolan (floating widget) bisa di-autoclose saat user klik di luar area dropdown (memisahkan ref & state dari halaman utama)
- (Frontend) Menghilangkan tombol titik tiga (hover menu) di list obrolan pada panel melayang, sehingga tombol tersebut hanya ada di halaman utama /obrolan
- (Frontend) Memperbaiki bug pada global event listener handleClickOutside yang tidak mendeteksi floatingChatFilterRef, sehingga dropdown filter sekarang bisa auto-close saat klik di luar
- (Frontend) Menyelaraskan layout dan komponen Panel Room Chat (floating window) agar persis sama dengan UI Room Chat di halaman utama /obrolan (termasuk Header lengkap, intro E2E, style bubble chat, tombol Plus, dan tombol PING)
- (Frontend) Menambahkan icon lampiran (paperclip dropdown) dan icon di tombol PING pada Panel Room Chat (floating widget) serta menyesuaikan lebar/tingginya (w-380px, h-500px) agar muat seperti halaman obrolan utama
- (Frontend) Memperbaiki padding bubble chat pada panel melayang (menghapus class w-full) agar lebar bubble menyesuaikan panjang teks
- (Frontend) Memindahkan icon emoji ke dalam kolom input (menggantikan posisi tombol kirim) dan menghapus tombol kirim di panel melayang
- (Frontend) Menambahkan 4 contoh dummy bubble (chat terkirim) di Panel Room Chat dengan masing-masing status (gagal dikirim, mengirim, terkirim, dan terlihat)
- (Frontend) Memindahkan icon emoji ke posisi icon kirim (menggantikan tombol kirim) pada halaman utama /obrolan di file src/app/[locale]/beranda/page.tsx
- (Frontend) Membuat logika pergantian tombol PING menjadi tombol Kirim jika input terisi (berlaku untuk panel utama dan panel widget)
- (Frontend) Membuat tombol kirim memiliki teks dan icon pesawat kertas menghadap kanan pada panel widget dan chat utama
- (Frontend) Memperbaiki layout shift pada tombol PING ke Kirim dengan min-width, dan mengubah warna icon emoji menjadi hijau emerald
- (Frontend) Membuat input chat menjadi multiline textarea dengan auto-resize, batas max-height, dan alignment tombol mengikuti tinggi input
- (Frontend) Memperbaiki posisi tombol lampiran dan kirim agar rata bawah (items-end) saat textarea membesar
- (Frontend) Menambahkan auto-scroll ke bawah pada list chat (messages container) saat textarea chat membesar agar pesan terbaru (bubble chat terakhir) tidak tertutup
- (Frontend) Menambahkan 4 dummy chat dengan status (gagal kirim, mengirim, terkirim, dilihat) di panel room chat, dan memasukkan waktu ke dalam bubble chat sesuai referensi visual
- (Frontend) Memperbaiki masalah scroll chaining (overscroll) pada semua panel scroll (termasuk floating chat) agar background tidak ikut terscroll
- (Frontend) Menambahkan dummy separator tanggal pada panel floating chat dan mengubah format waktu menjadi default 24-hour
- (Frontend) Memperbesar ukuran badge tanggal di floating chat dan memastikan auto-scroll ke bawah saat buka chat/panel
- (Frontend) Menambahkan fitur sticky date (mengambang di atas pesan) saat scroll chat, dengan animasi fade in/out dan auto-hide selama 5 detik
- (Frontend) Mengoptimalkan gaya visual (font-weight dan letter-spacing) pada label tanggal agar tidak terlihat terlalu tipis dan sempit
- (Frontend) Menyempurnakan logic sticky date agar tidak muncul ganda (muncul hanya jika di-scroll melebihi posisi tanggal asli), serta menambahkan dummy chat dengan tanggal berbeda (10/9/2026) untuk pengetesan scroll panjang
- (Frontend) Memperbaiki logic kalkulasi posisi scroll untuk sticky date menggunakan getBoundingClientRect agar akurat di semua ukuran layar dan terhindar dari bug offset flexbox
- (Frontend) Menyelaraskan styling header di panel floating chat (ukuran avatar, ukuran font nama & status, serta indikator online) agar identik dengan header utama di halaman /obrolan
- (Frontend) Menambahkan fitur state info profil untuk floating chat (saat header di-klik) dengan layout yang sama persis seperti sidebar info profil pada halaman /obrolan
- (Frontend) Memperbaiki fitur autoscroll ke bawah saat kembali dari info profil floating chat, serta me-reset state info profil saat membuka obrolan baru
- (Frontend) Memindahkan navigasi Obrolan ke navbar tengah (berdampingan dengan Home, Mencari, dll) dan menggunakan icon chat.svg / chat-aktif.svg dengan dukungan tema gelap/terang otomatis via mask
- (Frontend) Mengubah urutan tab Obrolan menjadi posisi ketiga di navbar tengah (di antara Mencari dan Teman)
- (Frontend) Menambahkan scrollbar-gutter: stable ke html & body di globals.css agar layout tidak geser saat berpindah antara halaman yang bisa/tidak bisa di-scroll
- (Frontend) Memperbaiki garis putih di scrollbar gutter dark mode dengan mendefinisikan CSS variable .dark { --background: #18191A } di globals.css
- (Frontend) Mengganti scrollbar-gutter ke pendekatan overflow-y:scroll + scrollbar transparan 4px agar layout stabil tanpa menampilkan garis kepotong
- (Frontend) Menambahkan panel pemberitahuan sidebar slide-in dari kanan (z-index 300), lengkap dengan backdrop overlay, tombol close, filter tab, dan 5 dummy notifikasi (permintaan teman, like, komentar, undangan grup, mention)
- (Frontend) Memindahkan panel notifikasi ke React Portal (render langsung ke document.body) agar tidak terkena clip atau z-index parent manapun
- (Frontend) Mengubah panel notifikasi dari full overlay menjadi popup dropdown (posisi top-right di bawah navbar) dengan animasi scale+opacity, tanpa backdrop gelap, seperti dropdown info akun
- (Frontend) Mengganti semua teks hardcode pada panel notifikasi dengan t() dari next-intl, menambahkan keys notif.* ke en.json dan id.json
- (Frontend) Menambahkan visual state read/unread pada item notifikasi: unread = dot hijau + background biru muda + teks terang, read = tanpa dot + opacity-60
- (Frontend) Mengganti tombol X di header panel notifikasi dengan tombol 3-dot yang memunculkan dropdown (Tandai semua telah dibaca + Pengaturan notifikasi), lengkap dengan i18n
- (Frontend) Memperbaiki bug dimana dropdown menu notifikasi (3-dot) tetap terbuka saat panel notifikasi ditutup
- (Frontend) Memperbaiki dropdown menu notifikasi agar autoclose saat diklik di luar area dropdown (meskipun masih di dalam panel notifikasi)
- (Frontend) Optimasi hover dropdown menu notifikasi di light mode menggunakan bg-gray-200 agar lebih jelas
- (Frontend) Menambahkan icon filter di panel notifikasi beserta dropdown menu (Permintaan pesan, Permintaan pertemanan, Permintaan gabung grup) lengkap dengan icon masing-masing dan i18n support
- (Frontend) Menyembunyikan 3 gambar iklan PortoTree di sidebar kanan dan riwayat (history) di sidebar kiri pada halaman /mencari, namun dummy data tetap dipertahankan (hidden)
- (Frontend) Memindahkan panel CTA hijau (Is your website not in our search yet?) dari sidebar kiri ke tengah, posisinya tepat di bawah tombol Add Shortcut pada halaman /mencari
- (Frontend) Mengubah layout panel CTA hijau pada halaman /mencari menjadi horizontal (lebar lebih besar, tombol register ada di sebelah kanan)
### Update (Webhook Lynk.id)
- (Backend) Integrasi webhook Lynk.id di NestJS (apps/api/src/webhooks) untuk memproses notifikasi pembayaran.

- (Frontend) Mengubah urutan menu navigasi sidebar menjadi: Mencari, Halaman kamu, Grup, Teman, Tersimpan, Acara
- (Frontend) Menambahkan onClick event handler (routing ke /group) pada menu navigasi sidebar Grup
- (Frontend) Menambahkan panel hijau CTA (Website kamu belum ada...) ke sidebar kanan halaman /beranda
- (Frontend) Perbaikan layout squished pada panel CTA sidebar kanan /beranda, dikembalikan ke layout vertikal agar sesuai dengan lebar sidebar (280px-320px)
- (Frontend) Fix file pemberitahuan.svg yang blank/hilang dengan menambahkan atribut viewBox agar SVG custom bisa scale/mengecil (karena sebelumnya SVG custom terpotong dan terlihat hilang)
- (Frontend) Mengubah warna icon pemberitahuan.svg menjadi gradient oranye sesuai permintaan user
- (Frontend) Memperbesar ukuran icon pemberitahuan di navbar dari 22px menjadi 26px
- (Frontend) Memindahkan tab navbar 'Mencari' ke bagian kanan dekat 'Pemberitahuan'
- (Frontend) Mengganti tab tengah yang lama dengan tab 'Produk' menggunakan icon produk.svg dan produk-aktif.svg
- (Frontend) Mengubah perilaku tombol Mencari di navbar kanan menjadi dropdown searchbox, dengan tombol visit/panah untuk masuk ke halaman /mencari (serta mengubah tooltipnya menjadi "Mencari")
- (Frontend) Memindahkan tombol visit ke luar searchbox (di sebelah kirinya) dan menggunakan icon visit.svg custom
- (Frontend) Mengubah icon visit pada dropdown searchbox dari SVG (mask) menjadi tag img menggunakan visit.png
- (Frontend) Memperbesar ukuran icon visit.png di dropdown search dari 20px menjadi 28px
- (Frontend) Menambahkan riwayat pencarian (recent searches) berupa dummy item di bawah input pencarian pada dropdown navbar
- (Frontend) Memperbaiki custom tooltip pada menu dropdown search yang terpotong karena styling overflow-hidden di parent container-nya
- (Frontend) Membangun halaman /owner-reg (pendaftaran pencarian) dengan form terstruktur dan Regex validasi slug
- (Frontend) Menghubungkan CTA 'Register for Free' di beranda ke halaman /owner-reg

## Konsep Pencarian & Pendaftaran Website (Mencari.online)
- Sistem akan menggunakan **Slug/Username Custom** untuk pengguna yang mendaftar (Contoh: `mencari.online/tokobudi`).
- **Aturan URL Slug:**
  - Hanya boleh huruf kecil (`a-z`), angka (`0-9`), dan tanda strip (`-`) atau underscore (`_`).
  - Tidak boleh ada spasi atau karakter spesial (`@, !, ?, .`).
  - Maksimal panjang 30 karakter, minimal 3 karakter.
  - Harus diset sebagai UNIQUE di database (tidak boleh ada yang duplikat).
- **Reserved Words (Blacklist):**
  - Kata-kata seperti `beranda, mencari, group, friend, chat, login, register, api, page` dilarang digunakan oleh user agar tidak terjadi konflik dengan sistem routing Next.js.
- **Sisi Frontend:**
  - Ada halaman pendaftaran (misal `/page`) yang dapat diakses dari CTA "Is your website not in our search yet?".
  - User tipe 1 (Punya web): Mengisi form, ketika hasil pencarian di klik -> redirect ke web asli.
  - User tipe 2 (Belum punya web): Mengisi form, platform akan men-generate Mini Profile (Landing Page).

- (Frontend) Membangun halaman `/page` untuk pendaftaran website/profil bisnis
- (Frontend) Menghubungkan CTA "Register for Free" di `/beranda` ke routing `/page`
- (Frontend) Cleaned up over 100+ temporary scripts from workspace
- (Frontend) Increased light-mode contrast for product category hover and active states
- (Frontend) Implemented Facebook-style Create Post modal dialog triggered by clicking the input in the home feed

- (Frontend) Replaced icons in Create Post modal and feed inputs with Video, Calendar, and File icons.
- (Frontend) Menghapus tombol font color "[Aa]" dan label AI dari modal postingan di `apps/web/src/app/[locale]/home/page.tsx`
- (Frontend) Mengubah profil privasi label pada modal postingan menjadi dropdown dengan default yang menyesuaikan tab (`Public` / `Friends`) di `apps/web/src/app/[locale]/home/page.tsx`
- (Frontend) Menambahkan fungsionalitas auto-close saat mengklik di luar area dropdown privasi dan menambahkan pengunci `overflow: hidden` global saat modal terbuka di `apps/web/src/app/[locale]/home/page.tsx`
- (Frontend) Memperbaiki bug layout `sticky` header pada beranda dengan mengganti nav menjadi `fixed` dan menambahkan padding top di `apps/web/src/app/[locale]/home/page.tsx`
- (Frontend) Menambahkan struktur dan layout dasar halaman profil pengguna di `apps/web/src/app/[locale]/p/[username]/[id]/page.tsx`

### (Backend) Registration Anti-Duplicate
- Added robust anti-duplicate username detection in `apps/api/src/auth/auth.service.ts` during registration.
- Added check against `PendingUser` table for usernames held by pending verifications within the last 15 minutes.
- Added strict fallback check during `verifyOtp` to prevent race conditions (cleans up pending user if username was taken in main table).
- Added `console.log` debug outputs to track duplicate detection events.

- (Frontend) Fix profile card height stretching in /p/ page layout by adding h-fit to sidebar (page.tsx)

- (Frontend) Replace Bio card text with a 3x2 image grid placeholder (page.tsx)

- (Frontend) Remove h-fit from left sidebar so it stretches to match right column height (page.tsx)

- (Frontend) Move tabs navigation outside of main content flex layout so profile card height aligns precisely with photo grid and reputasi card (page.tsx)

- (Frontend) Reduce border radius of photo grid from 30px to 18px (page.tsx)

- (Frontend) Change 'Points' label to @username for public views (page.tsx)

- (Frontend) Remove edit hover icon from the photo grid (page.tsx)

- (Frontend) Add 'Lihat selengkapnya' expand/collapse feature to profile details (page.tsx)

- (Frontend) Set expand profile button to stick to the bottom of the profile card (page.tsx)

- (Frontend) Refactor Profile Card layout to use justify-between to force the expand button to the very bottom (page.tsx)

- (Frontend) Fix expand button not sticking to bottom by using absolute positioning (page.tsx)

- (Frontend) Rebuild Profile expander list, move expand button out of list, and reduce bottom padding of Profile Card to make button stick to the bottom correctly (page.tsx)

- (Frontend) Fix missing closing div syntax error in page.tsx

- (Frontend) Wrap Profile Card in relative container and make it absolute on desktop when expanding, so it overlaps empty space instead of pushing the Tabs Navigation down (page.tsx)

- (Frontend) Fix Profile Card overflow issue by using min-h-full h-auto instead of bottom-0 so the card background always wraps its content (page.tsx)

- (Frontend) Update hardcoded profile expander button text to use translations (page.tsx, id.json, en.json)

- (Frontend) Update friends section to display Teman, Pengikut, Diikuti stats instead of overlapping avatars (page.tsx)

- (Frontend) Update 'addFriend' translation keys to 'Follow' across id.json and en.json

- (Backend) Review database_profile_structure_updated.md for mutual follower logic

- (Frontend) Major layout refactor: move Reputasi and Foto Grid to Left Sidebar below Profile Card, move Tabs Navigation into Right Content Area (page.tsx)

- (Frontend) Fix giant circle bug by moving Tabs Navigation properly inside Right Content Area's flex-col (page.tsx)

- (Frontend) Remove accidental literal '\n\n' text output near EditProfileModal (page.tsx)

- (Frontend) Remove Photo Grid completely from the Left Sidebar (page.tsx)

- (Frontend) Add horizontally scrollable 'Suggest' carousel for dummy groups and accounts above Tabs Navigation (page.tsx)

- (Frontend) Fix Right Content Area layout overflowing max-width by adding min-w-0 (page.tsx)

- (Frontend) Upgrade Suggestion Carousel: add left/right navigation arrows, increase card sizes, add profession/location for accounts, make group icons square, and use next-intl for all text (page.tsx, id.json, en.json)

- (Frontend) Remove hover dependency for carousel arrows (always visible) and reduce margin above Tabs Navigation (page.tsx)

- (Frontend) Raise Tabs Navigation position higher with negative margin to align horizontally with Reputasi Card (page.tsx)
