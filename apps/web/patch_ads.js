const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Insert ads right sidebar for mencari tab, right before the Friend List sidebar
const insertBefore = "{/* Right Sidebar: Friend List (Friend Tab) */}";

const adsBlock = `{/* Right Sidebar: Ads (Mencari Tab) */}
        {activeTab === 'mencari' && (
          <div className="hidden lg:block fixed right-0 top-[56px] w-[280px] xl:w-[320px] overscroll-contain h-[calc(100vh-56px)] overflow-y-auto pt-6 px-4 pb-24 sidebar-scrollbar">
            <div className="space-y-3">
              <a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img src="/ads/portotree-cv.png" alt="Portotree CV" className="w-full h-auto object-cover" />
              </a>
              <a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img src="/ads/portotree-surat.png" alt="Portotree Surat" className="w-full h-auto object-cover" />
              </a>
              <a href="https://portotree.com" target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img src="/ads/portotree-portofolio.png" alt="Portotree Portofolio" className="w-full h-auto object-cover" />
              </a>
            </div>
          </div>
        )}

        `;

file = file.replace(insertBefore, adsBlock + insertBefore);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Ads sidebar added for /mencari tab');
