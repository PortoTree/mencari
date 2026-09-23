const fs = require('fs');

let pagePath = 'src/app/[locale]/page/page.tsx';
if (fs.existsSync(pagePath)) {
    let code = fs.readFileSync(pagePath, 'utf8');

    // Replace activeTab type definition
    code = code.replace(/"home" \| "mencari" \| "friend" \| "group" \| "groups" \| "chat" \| "product"/g, '"home" | "mencari" | "friend" | "community" | "community-groups" | "chat" | "product"');

    // Replace group with community in activeTab comparisons
    code = code.replace(/activeTab === "group" \|\| activeTab === "groups"/g, 'activeTab === "community"');
    code = code.replace(/activeTab === "group"/g, 'activeTab === "community"');
    
    // Replace SVG icons
    code = code.replace(/\/navigasi\/grub-aktif\.svg/g, '/navigasi/komunitas-aktif.svg');
    code = code.replace(/\/navigasi\/grub\.svg/g, '/navigasi/komunitas.svg');
    
    fs.writeFileSync(pagePath, code);
    console.log('page/page.tsx updated.');
}

// Also let's fix type definition in home/page.tsx as well just in case
let homePath = 'src/app/[locale]/home/page.tsx';
if (fs.existsSync(homePath)) {
    let code = fs.readFileSync(homePath, 'utf8');
    code = code.replace(/"home" \| "mencari" \| "friend" \| "group" \| "groups" \| "chat" \| "product"/g, '"home" | "mencari" | "friend" | "community" | "community-groups" | "chat" | "product"');
    fs.writeFileSync(homePath, code);
}
