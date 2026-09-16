const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const bad1 = `<div className="relative" \${activePostMenu === 'post1' ? 'ref={postMenuRef}' : ''}>`;
const good1 = `<div className="relative" {...(activePostMenu === 'post1' ? { ref: postMenuRef } : {})}>`;
file = file.split(bad1).join(good1);

const bad2 = `<div className="relative" \${activePostMenu === 'post2' ? 'ref={postMenuRef}' : ''}>`;
const good2 = `<div className="relative" {...(activePostMenu === 'post2' ? { ref: postMenuRef } : {})}>`;
file = file.split(bad2).join(good2);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed JSX syntax');
