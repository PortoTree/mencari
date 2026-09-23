const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const replacements = [
  ['>Daftarkan Bisnis Anda<', '>{t("register.title")}<'],
  ['>Jangkau ribuan pengguna dengan memasukkan website atau profil bisnis Anda ke dalam mesin pencarian mencari.online secara gratis.<', '>{t("register.subtitle")}<'],
  ['>Tipe Pendaftaran<', '>{t("register.type_label")}<'],
  ['>Sudah Punya Website<', '>{t("register.type_website")}<'],
  ['>Saya ingin menautkan domain website saya sendiri (misal: .com, .id).<', '>{t("register.type_website_desc")}<'],
  ['>Belum Punya Website<', '>{t("register.type_profile")}<'],
  ['>Buat profil landing page profesional langsung dari platform mencari.online.<', '>{t("register.type_profile_desc")}<'],
  ['>URL Website Asli<', '>{t("register.url_label")}<'],
  ['>Nama Bisnis / Judul Halaman<', '>{t("register.name_label")}<'],
  ['placeholder="Misal: Toko Kopi Budi"', 'placeholder={t("register.name_placeholder")}'],
  ['>Link Kustom (Slug) <', '>{t("register.slug_label")} <'],
  ['>Hanya gunakan huruf kecil (a-z), angka (0-9), dan tanda strip (-). Tanpa spasi.<', '>{t("register.slug_desc")}<'],
  ['>Deskripsi Singkat<', '>{t("register.desc_label")}<'],
  ['placeholder="Tuliskan deskripsi singkat mengenai bisnis atau layanan Anda..."', 'placeholder={t("register.desc_placeholder")}'],
  ['>Daftar Sekarang<', '>{t("register.submit")}<']
];

replacements.forEach(([oldStr, newStr]) => {
  code = code.replace(oldStr, newStr);
});

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Applied translations to page.tsx');
