const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Inject the click-outside for notifMenuRef right after chatMoreMenuRef block
const from = `      if (
        chatMoreMenuRef.current &&
        !chatMoreMenuRef.current.contains(event.target as Node)
      ) {
        setIsChatMoreMenuOpen(false);
      }`;

const to = `      if (
        chatMoreMenuRef.current &&
        !chatMoreMenuRef.current.contains(event.target as Node)
      ) {
        setIsChatMoreMenuOpen(false);
      }
      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setIsNotifMenuOpen(false);
      }`;

code = code.replace(from, to);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('notifMenuRef added to handleClickOutside');
