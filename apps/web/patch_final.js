const fs = require('fs');

// ===== UPDATE TRANSLATIONS =====
const id = JSON.parse(fs.readFileSync('messages/id.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

// Ubah "Messenger" -> "Chatting"
id.chat.title = "Obrolan";
en.chat.title = "Chatting";
id.nav.chat = "Obrolan";
en.nav.chat = "Chatting";

// Filter labels
id.filter = { ...id.filter, favorite: "Favorit", groupChat: "Grub Chat", chatList: "Daftar Obrolan", archived: "Diarsipkan" };
en.filter = { ...en.filter, favorite: "Favorites", groupChat: "Group Chat", chatList: "Chat List", archived: "Archived" };

// Nav tooltips
id.nav.menu = "Menu";
en.nav.menu = "Menu";

fs.writeFileSync('messages/id.json', JSON.stringify(id, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));
console.log('✅ Translations updated (Messenger -> Chatting)');

// ===== PATCH BERANDA =====
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacements = [
  // Nav tooltips (LF)
  ['\n              Chat\n            </div>', "\n              {t('nav.chat')}\n            </div>"],
  ['\n              Menu\n            </div>', "\n              {t('nav.menu')}\n            </div>"],

  // Filter dropdown items (CRLF)
  ['                         Favorit\r\n                     ', "                         {t('filter.favorite')}\r\n                     "],
  ['                         Grub Chat\r\n                   ', "                         {t('filter.groupChat')}\r\n                   "],
  ['                         Daftar Obrolan\r\n              ', "                         {t('filter.chatList')}\r\n              "],
  ['                         Diarsipkan\r\n                  ', "                         {t('filter.archived')}\r\n                  "],
];

let count = 0;
for (const [from, to] of replacements) {
  if (file.includes(from)) {
    file = file.split(from).join(to);
    count++;
    console.log('✅ Replaced:', from.trim().substring(0, 40));
  } else {
    // Try fallback without exact whitespace - find and replace loosely
    console.log('⚠️  NOT FOUND (exact):', JSON.stringify(from).substring(0, 60));
  }
}

// ===== Also remove "Grub Chat" duplicate that appeared in nav tabs =====
// (it was already replaced to t('tabs.groups') but let's double check "Grub Chat" in filter)
const remaining = ['Favorit\r\n','Grub Chat\r\n','Daftar Obrolan\r\n','Diarsipkan\r\n'];
remaining.forEach(w => {
  if (file.includes(w)) console.log('⚠️  STILL HARDCODED:', w.trim());
  else console.log('✅ Clean:', w.trim());
});

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('\n✅ Done:', count, 'replacements');
