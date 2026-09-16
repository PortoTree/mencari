const fs = require('fs');

// Update translations
const id = JSON.parse(fs.readFileSync('messages/id.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

id.chat = { ...id.chat, manage: "Kelola obrolan", settings: "Pengaturan" };
en.chat = { ...en.chat, manage: "Manage chats", settings: "Settings" };

fs.writeFileSync('messages/id.json', JSON.stringify(id, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log('✅ Translations updated');

// Patch beranda
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacements = [
  ['     Kelola obrolan\r\n        ', "     {t('chat.manage')}\r\n        "],
  ['     Pengaturan\r\n        ', "     {t('chat.settings')}\r\n        "],
];

let count = 0;
for (const [from, to] of replacements) {
  if (file.includes(from)) {
    file = file.split(from).join(to);
    count++;
    console.log('✅ Replaced:', from.trim());
  } else {
    console.log('⚠️  NOT FOUND:', JSON.stringify(from));
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Done:', count, 'replacements');
