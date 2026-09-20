const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const insertIdx = lines.findIndex(l => l.includes('setIsChatMoreMenuOpen(false);'));

if (insertIdx !== -1) {
  lines.splice(insertIdx + 2, 0,
    '      if (',
    '        notifMenuRef.current &&',
    '        !notifMenuRef.current.contains(event.target as Node)',
    '      ) {',
    '        setIsNotifMenuOpen(false);',
    '      }'
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Successfully injected notifMenuRef click-outside handler using splice');
} else {
  console.log('Failed to find setIsChatMoreMenuOpen(false);');
}
