
## [Frontend] Profile Sidebar & Feed Updates
- [x] Menambahkan animasi auto-close pada dropdown 3-titik di postingan (src/app/[locale]/beranda/page.tsx).
- [x] Merubah Drawer Profil menjadi Layout Sidebar Kanan yang responsive.
- [x] Menambahkan tombol Kirim Pesan di bawah tombol profil.
- [x] Mengubah struktur Grid Galeri menjadi list Aktivitas Akun, Pemilik Grup, dan Grup yang diikuti.
- [x] Menambahkan event trigger klik pada Foto dan Nama di postingan untuk membuka sidebar profil.
- [x] Menambahkan padding bottom pada sidebar profil agar tidak menutupi chat panel.

- [x] (Frontend) Fix proper URL update using pushState without reloading for Mencari tab
- [x] (Frontend) Fix Lottie component props (src instead of animationData) to remove React DOM warnings

- [x] (Frontend) Kurangi jarak (height & margin) antara Lottie animation dengan search bar di halaman mencari.

- [x] (Frontend) Hapus icon microphone dan camera dari form search bar di tampilan Mencari.

- [x] (Frontend) Ganti teks placeholder search bar di halaman Mencari menjadi 'Mencari apa?....'

- [x] (Frontend) Ganti tombol action Mencari dengan tombol Tambah Pintasan beserta Modal Nama/URL

- [x] (Frontend) Perbaiki kontras hover icon shortcut di tema terang, dan tambahkan bahasa Inggris (i18n) untuk komponen modal shortcut.

- [x] (Frontend) Tambahkan panel Bookmarks di sisi kanan saat user berada di halaman /mencari (menggantikan bubble chat).

- [x] (Frontend) Ubah panel samping kanan di /mencari dari Bookmarks menjadi Riwayat (History) pencarian terakhir.

- [x] (Frontend) Munculkan kembali fitur chat bubble di halaman /mencari agar tidak tertimpa oleh panel history.

- [x] (Frontend) Desain ulang item History di panel kanan menjadi layout Browsing History (mengandung favicon, judul halaman, dan domain).

- [x] (Frontend) Implementasi render otomatis favicon menggunakan API Google Favicon (https://www.google.com/s2/favicons?domain=...) di riwayat mini browser.

- [x] (Frontend) Ganti teks dummy history web menjadi Google dan Stack Overflow agar lebih netral.

- [x] (Frontend) Perbaiki URL Google Favicon API agar selaras dengan dummy text Google dan Stack Overflow.

- [x] (Frontend) Tambahkan animasi expand pada Search Bar ala Google, menampilkan dropdown riwayat saat di-klik/focus.

- [x] (Frontend) Perbaiki glitch animasi pada saat Search Bar di expand dengan mengganti transition-all menjadi transition-shadow.

- [x] (Frontend) Tambahkan 7 data history statis ke dalam dropdown Search Bar, dengan batas maksimal 5 item terlihat dan sisanya bisa di-scroll.

- [x] (Frontend) Tambahkan ikon hapus (X) yang muncul saat _hover_ pada tiap item riwayat di dropdown search bar.

- [x] (Frontend) Gelapkan sedikit warna background saat hover pada item riwayat web di panel kanan dan dropdown agar lebih kontras di mode terang.

- [x] (Frontend) Perbaiki bug unmounted Lottie ref pada event loop (menambahkan kurung kurawal pada logic pengecekan ref).

- [x] (Frontend) Turunkan z-index Search Bar menjadi z-40 agar tidak menutupi panel Chat (z-50) saat Chat sedang terbuka.

- [x] (Frontend) Tambahkan menu navigasi Mencari di sidebar kiri bagian atas.

- [x] (Frontend) Tambahkan halaman/fitur /friend dengan logika navigasi push-state via tab menu Friends di sidebar kiri, mempertahankan struktur layout utama (sidebar, header, chat).

- [x] (Frontend) Tambahkan logic push-state pada icon tab Friends di navigasi Header agar terhubung ke state /friend.

- [x] (Frontend) Tambahkan logic active state class (background abu-abu) pada menu Mencari di sidebar kiri saat sedang dibuka.

- [x] (Frontend) Tambahkan logic dynamic rendering SVG icon: mengubah icon (Friends & Mencari) dari garis (outline) menjadi blok solid (fill) ketika menu tersebut sedang aktif.

- [x] (Frontend) Ganti SVG icon bawaan untuk Home, Friends, dan Groups dengan file custom dari folder public/navigasi/ menggunakan teknik CSS Webkit Mask agar warna (active/inactive states) tetap bisa ter-inherit otomatis via currentColor.

- [x] (Frontend) Perbarui logic SVG mask khusus di Navbar Header agar menggunakan file <nama>-aktif.svg saat tab tersebut sedang aktif.

- [x] (Frontend) Rombak halaman /friend (tab Teman): Pindahkan daftar teman menjadi komponen Sidebar Kanan (mirip History panel), dan ubah area tengah menjadi Feed Dummy khusus untuk melihat postingan-postingan terbaru dari teman.

- [x] (Frontend) Tambahkan komponen input Create Post ('Post and let people find you') di bagian paling atas halaman Feed /friend agar konsisten dengan Home Feed.

- [x] (Frontend) Tambahkan 10 data dummy tambahan ke Daftar Teman (Friend List) dan Riwayat (History) untuk keperluan tes simulasi scroll layout.

- [x] (Frontend) Perbesar padding-bottom (pb-24) pada Sidebar (Kiri & Kanan) agar *item* list terbawah tidak terpotong atau tertutup oleh *Chat Panel* di pojok kanan bawah saat di-scroll mentok.

- [x] (Frontend) Tambahkan tombol Bagikan (Share) beserta ikonnya pada list *action button* di setiap *dummy post* yang ada di tab Teman/Friends agar lebih lengkap.

- [x] (Frontend) *Refactor* dummy post di tab Teman/Friend dengan menggunakan komponen yang persis sama dengan yang ada di Beranda/Home (lengkap dengan *dropdown menu*, *hover state*, *action buttons*, lokalisasi bahasa, dll).

- [x] (Frontend) Samakan persis struktur *wrapper* dan spasi komponen dummy post di tab Teman/Friend dengan tab Beranda/Home (buang extra flex & pt-6) agar layout-nya 100% konsisten.

- [x] (Frontend) Tambahkan logika *conditional rendering* di Sidebar Kiri: Jika tab yang aktif adalah /mencari, ubah komponen **Kartu Profil** menjadi area **Bookmarks** berisi 10 *dummy web bookmark*.

- [x] (Frontend) Pindahkan komponen *History List* (Riwayat Pencarian) dari Sidebar Kanan ke Sidebar Kiri, posisinya tepat di bawah komponen *Call-to-Action* pada tab /mencari.

- [x] (Frontend) Sembunyikan *scrollbar* bawaan di Sidebar (Kiri & Kanan). Scrollbar sekarang akan *auto-hide* (transparan) dan hanya muncul (berwarna *gray*) saat *cursor* di-*hover* ke area sidebar.

- [x] (Frontend) Perbaiki logika auto-hide scrollbar di Sidebar menggunakan CSS murni (hover pada container sidebar-scrollbar untuk memunculkan thumb).

- [x] (Frontend) Perbaiki bug auto-hide scrollbar yang tidak jalan di Firefox dan beberapa browser. Tambahkan dukungan penuh untuk scrollbar-color dan fallback transparan di WebKit.

- [x] (Frontend) Hapus teks hardcode placeholder pada bar pencarian dan ganti dengan translasi dinamis next-intl.

- [x] (Frontend) Tambah Sidebar Kanan khusus tab mencari berisi 3 banner iklan Portotree (portotree-cv.png, portotree-surat.png, portotree-portofolio.png).

- [x] (Frontend) Fix bug URL tidak berubah saat ganti tab. Ganti logika pushState dari pathname.replace yang tidak reliable ke full path berdasarkan locale.

- [x] (Frontend) Pindahkan Friend List dari Sidebar Kanan ke Sidebar Kiri pada tab friend.

- [x] (Frontend) Ganti Profile Card di Sidebar Kiri tab friend dengan Search Bar untuk mencari pengguna.

- [x] (Frontend) Upgrade searchbar di Sidebar Kiri tab friend: judul di luar kotak, bentuk pill/lonjong, expand riwayat pencarian ketika di-klik (UX mirip /mencari).

- [x] (Frontend) Perbaiki animasi expand searchbar /friend: ganti mount/unmount menjadi max-height + opacity transition supaya smooth.

- [x] (Frontend) Ubah expand searchbar /friend menjadi absolute overlay (tidak geser layout friendlist), persis seperti pola searchbar di /mencari.

- [x] (Frontend) Samakan font size dan style judul Cari Pengguna dengan Friends header (text-[15px] font-semibold), serta hapus semua hardcode bahasa ID dan ganti dengan next-intl (friend.searchTitle, friend.searchPlaceholder, friend.recentSearch).
