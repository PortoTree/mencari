const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

const additionalStates = `
  const [isNotifMenuOpen, setIsNotifMenuOpen] = React.useState(false);
  const notifMenuRef = React.useRef<HTMLDivElement>(null);
  const [isNotifFilterOpen, setIsNotifFilterOpen] = React.useState(false);
  const notifFilterRef = React.useRef<HTMLDivElement>(null);
`;

code = code.replace(
  'const notifBtnRef = React.useRef<HTMLButtonElement>(null);',
  'const notifBtnRef = React.useRef<HTMLButtonElement>(null);\n' + additionalStates
);

// We should also add these to the click outside logic
code = code.replace(
  'if (notifBtnRef.current && !notifBtnRef.current.contains(event.target as Node)) {',
  `
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) setIsNotifMenuOpen(false);
      if (notifFilterRef.current && !notifFilterRef.current.contains(event.target as Node)) setIsNotifFilterOpen(false);
      if (notifBtnRef.current && !notifBtnRef.current.contains(event.target as Node)) {
  `
);

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Added missing states');
