const fs = require('fs');

// 1. Add translation keys
const enPath = 'messages/en.json';
const idPath = 'messages/id.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const id = JSON.parse(fs.readFileSync(idPath, 'utf8'));

en.notif.markAllRead = "Mark all as read";
en.notif.settings = "Notification settings";
id.notif.markAllRead = "Tandai semua telah dibaca";
id.notif.settings = "Pengaturan notifikasi";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(idPath, JSON.stringify(id, null, 2));
console.log('Translation keys added');

// 2. Add close on outside click for isNotifMenuOpen in the handleClickOutside useEffect
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Add setIsNotifMenuOpen(false) when clicking outside the notif panel
code = code.replace(
  `        notifBtnRef.current &&
        !notifBtnRef.current.contains(event.target as Node)
      ) {
        setIsNotifPanelOpen(false);
      }`,
  `        notifBtnRef.current &&
        !notifBtnRef.current.contains(event.target as Node)
      ) {
        setIsNotifPanelOpen(false);
        setIsNotifMenuOpen(false);
      }`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Outside click + translations done');
