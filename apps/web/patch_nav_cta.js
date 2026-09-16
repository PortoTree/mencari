const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Wrap Navigation Links in {activeTab === 'home' && ( ... )}
const navLinksStart = file.indexOf('{/* Navigation Links */}');
// find the end of the Navigation Links div
const navLinksEnd = file.indexOf('          </div>\n        </div>\n      </div>', navLinksStart);
if (navLinksStart > -1 && navLinksEnd > -1) {
    const navLinksBlock = file.slice(navLinksStart, navLinksEnd + 16); // Up to the `</div>` that closes it
    
    // We want to replace just the start and end of that specific block
    const oldBlock = file.slice(navLinksStart, file.indexOf('</div>', file.indexOf('sidebar.events')) + 6);
    
    const newBlock = \`{activeTab === 'home' && (
          \${oldBlock}
          )}\`;
          
    // Safely replace just this exact block
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
