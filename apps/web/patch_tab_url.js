const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Fix tab Home - always push full path
file = file.replace(
    `{ setActiveTab('home'); window.history.pushState(null, '', pathname.replace('/mencari', '/beranda')); }`,
    `{ setActiveTab('home'); window.history.pushState(null, '', \`/\${locale}/beranda\`); }`
);

// Fix tab Mencari - always push full path
file = file.replace(
    `{ setActiveTab('mencari'); window.history.pushState(null, '', pathname.replace('/beranda', '/mencari')); }`,
    `{ setActiveTab('mencari'); window.history.pushState(null, '', \`/\${locale}/mencari\`); }`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Fixed tab URL push logic');
