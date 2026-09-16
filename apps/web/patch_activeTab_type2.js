const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  "const [activeTab, setActiveTab] = useState<'home' | 'mencari' | 'friend' | 'groups'>",
  "const [activeTab, setActiveTab] = useState<'home' | 'mencari' | 'friend' | 'group' | 'groups'>"
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed activeTab type to include group');
