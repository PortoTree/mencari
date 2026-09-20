const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const insertIdx = lines.findIndex(line => line.includes('const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);'));

if (insertIdx !== -1) {
  lines.splice(insertIdx + 1, 0, 
    '  useEffect(() => {',
    '    if (!isNotifPanelOpen) {',
    '      setIsNotifMenuOpen(false);',
    '    }',
    '  }, [isNotifPanelOpen]);'
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Added useEffect to reset isNotifMenuOpen');
} else {
  console.log('State not found');
}
