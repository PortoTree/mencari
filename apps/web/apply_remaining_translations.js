const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const replacements = [
  ['URL Website Asli', '{t("register.url_label")}'],
  ['Nama Bisnis / Judul Halaman', '{t("register.name_label")}'],
  ['Link Kustom (Slug)', '{t("register.slug_label")}'],
  ['Hanya gunakan huruf kecil (a-z), angka (0-9), dan tanda strip (-). Tanpa spasi.', '{t("register.slug_desc")}'],
  ['Deskripsi Singkat', '{t("register.desc_label")}'],
  ['Daftar Sekarang', '{t("register.submit")}']
];

replacements.forEach(([oldStr, newStr]) => {
  // Be careful with replacing raw text inside JSX, we need to make sure we don't accidentally replace a placeholder attribute.
  // We can just use string replace.
  code = code.replace(oldStr, newStr);
});

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Applied remaining translations to page.tsx');
