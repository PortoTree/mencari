const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Replace "/beranda" with "/home"
    let newCode = code.replace(/\/beranda/g, '/home');
    
    // Replace "../beranda/page" with "../home/page"
    newCode = newCode.replace(/\.\.\/beranda\/page/g, '../home/page');

    // Also replace /group with /community in login, page, middleware etc if any
    // Just in case, wait, only replace exact /group or /groups routes
    newCode = newCode.replace(/\/group\b/g, '/community');

    if (code !== newCode) {
        fs.writeFileSync(filePath, newCode);
        console.log('Updated:', filePath);
    }
}

const files = [
    'src/app/login/page.tsx',
    'src/app/[locale]/community/page.tsx',
    'src/app/[locale]/community-groups/page.tsx',
    'src/app/[locale]/friend/page.tsx',
    'src/app/[locale]/login/page.tsx',
    'src/app/[locale]/mencari/page.tsx',
    'src/app/[locale]/obrolan/page.tsx',
    'src/app/[locale]/page/page.tsx',
    'src/app/[locale]/product/page.tsx',
    'src/middleware.ts'
];

files.forEach(replaceInFile);
