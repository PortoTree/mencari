const fs = require('fs');

// 1. Add translation keys
const enPath = 'messages/en.json';
const idPath = 'messages/id.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const id = JSON.parse(fs.readFileSync(idPath, 'utf8'));

en.notif.filterMessage = "Message requests";
en.notif.filterFriend = "Friend requests";
en.notif.filterGroup = "Group join requests";

id.notif.filterMessage = "Permintaan pesan";
id.notif.filterFriend = "Permintaan pertemanan";
id.notif.filterGroup = "Permintaan gabung grup";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(idPath, JSON.stringify(id, null, 2));
console.log('Translations updated.');

// 2. Modify page.tsx
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Add State
code = code.replace(
  '  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);',
  '  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);\n  const [isNotifFilterOpen, setIsNotifFilterOpen] = useState(false);'
);

// Add Ref
code = code.replace(
  '  const notifMenuRef = useRef<HTMLDivElement>(null);',
  '  const notifMenuRef = useRef<HTMLDivElement>(null);\n  const notifFilterRef = useRef<HTMLDivElement>(null);'
);

// Add to panel auto-close
code = code.replace(
  `    if (!isNotifPanelOpen) {
      setIsNotifMenuOpen(false);
    }`,
  `    if (!isNotifPanelOpen) {
      setIsNotifMenuOpen(false);
      setIsNotifFilterOpen(false);
    }`
);

// Add to click-outside
code = code.replace(
  `      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setIsNotifMenuOpen(false);
      }`,
  `      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setIsNotifMenuOpen(false);
      }
      if (
        notifFilterRef.current &&
        !notifFilterRef.current.contains(event.target as Node)
      ) {
        setIsNotifFilterOpen(false);
      }`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('States and refs added.');
