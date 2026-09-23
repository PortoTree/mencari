const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

code = code.replace(
  /Jangkau ribuan pengguna dengan memasukkan website atau profil bisnis Anda ke dalam mesin pencarian mencari\.online secara gratis\./g,
  '{t("register.subtitle")}'
);

code = code.replace(
  /Tipe Pendaftaran/g,
  '{t("register.type_label")}'
);

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed multiline / padded translations');
