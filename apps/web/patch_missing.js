const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
    "{activeTab === 'mencari' ? (\n              <div className=\"bg-gradient-to-br",
    "{activeTab === 'mencari' ? (\n              <>\n              <div className=\"bg-gradient-to-br"
);
// Also support \r\n
file = file.replace(
    "{activeTab === 'mencari' ? (\r\n              <div className=\"bg-gradient-to-br",
    "{activeTab === 'mencari' ? (\r\n              <>\n              <div className=\"bg-gradient-to-br"
);


fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Added missing <>');
