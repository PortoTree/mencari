const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add ref declaration
code = code.replace(
  '  const notifBtnRef = useRef<HTMLButtonElement>(null);',
  '  const notifBtnRef = useRef<HTMLButtonElement>(null);\n  const notifMenuRef = useRef<HTMLDivElement>(null);'
);

// 2. Attach ref to the dropdown wrapper
code = code.replace(
  '{/* 3-dot menu */}\n          <div className="relative">',
  '{/* 3-dot menu */}\n          <div className="relative" ref={notifMenuRef}>'
);

// 3. Add to handleClickOutside logic
code = code.replace(
  `        !notifBtnRef.current.contains(event.target as Node)
      ) {
        setIsNotifPanelOpen(false);
        setIsNotifMenuOpen(false);
      }`,
  `        !notifBtnRef.current.contains(event.target as Node)
      ) {
        setIsNotifPanelOpen(false);
        setIsNotifMenuOpen(false);
      }
      if (
        notifMenuRef.current &&
        !notifMenuRef.current.contains(event.target as Node)
      ) {
        setIsNotifMenuOpen(false);
      }`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('notifMenuRef and click-outside handler added');
