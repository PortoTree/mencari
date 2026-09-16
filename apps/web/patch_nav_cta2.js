const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const navLinksStart = file.indexOf('{/* Navigation Links */}');
const sidebarEventsIdx = file.indexOf('sidebar.events');
const endOfDiv = file.indexOf('</div>', sidebarEventsIdx) + 6;

if (navLinksStart > -1 && sidebarEventsIdx > -1) {
    const oldBlock = file.slice(navLinksStart, endOfDiv);
    const newBlock = "{activeTab === 'home' && (\n" + oldBlock + "\n)}";
    file = file.replace(oldBlock, newBlock);
}

// 2. Change texts in CTA
file = file.replace(
    'Jadikan website, portofolio, atau tokomu mudah ditemukan oleh ribuan pengguna seperti di mesin pencari Google.',
    'Jadikan website, portofolio, atau bisnismu mudah ditemukan oleh ribuan pengguna kami'
);

file = file.replace(
    'Daftarkan Situs Web',
    'Daftarkan Gratis'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated Nav Links visibility and CTA texts');
