const fs = require('fs');

// 1. Modify beranda/page.tsx to check pathname and update pushState
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  'import { useRouter } from "next/navigation";',
  'import { useRouter, usePathname } from "next/navigation";'
);

file = file.replace(
  "const [activeTab, setActiveTab] = useState<'home' | 'mencari'>('home');",
  "const pathname = usePathname();\n  const [activeTab, setActiveTab] = useState<'home' | 'mencari'>(pathname.includes('/mencari') ? 'mencari' : 'home');"
);

// Update onClick for tabs to also pushState
file = file.replace(
  "onClick={() => setActiveTab('home')}",
  "onClick={() => { setActiveTab('home'); window.history.pushState(null, '', pathname.replace('/mencari', '/beranda')); }}"
);

file = file.replace(
  "onClick={() => setActiveTab('mencari')}",
  "onClick={() => { setActiveTab('mencari'); window.history.pushState(null, '', pathname.replace('/beranda', '/mencari')); }}"
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);

// 2. Create mencari/page.tsx that just re-exports beranda
const mencariDir = 'src/app/[locale]/mencari';
if (!fs.existsSync(mencariDir)) {
  fs.mkdirSync(mencariDir, { recursive: true });
}
fs.writeFileSync(mencariDir + '/page.tsx', 'export { default } from "../beranda/page";\n');

console.log('✅ Updated routing logic');
