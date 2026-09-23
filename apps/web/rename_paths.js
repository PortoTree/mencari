const fs = require('fs');

// 1. Translations
const idFile = 'messages/id.json';
const enFile = 'messages/en.json';
let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.tabs.groups = "Komunitas";
idTrans.sidebar.groups = "Komunitas";
enTrans.tabs.groups = "Community";
enTrans.sidebar.groups = "Community";

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));
console.log('Translations updated.');

// 2. Refactor home/page.tsx
let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// Replace /beranda with /home
code = code.replace(/\/beranda/g, '/home');

// Replace /group with /community
code = code.replace(/\/group/g, '/community');

// Also update activeTab values if needed:
// 'home' | 'mencari' | 'friend' | 'group' | 'groups' | 'chat' | 'product'
// Wait, replacing 'group' with 'community' everywhere might break generic words like "groupSearchRef".
// Let's be careful.
code = code.replace(/"group"/g, '"community"');
code = code.replace(/'group'/g, "'community'");
// Also "groups" is used? Let's check.
code = code.replace(/"groups"/g, '"community"');
code = code.replace(/'groups'/g, "'community'");

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('home/page.tsx updated base replacements.');
