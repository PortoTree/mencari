const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

const oldStructure = `w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>`;

const newStructure = `relative w-12 h-12 shrink-0">
                        <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">
                          <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>`;

if (file.includes(oldStructure)) {
  file = file.replace(oldStructure, newStructure);
  fs.writeFileSync('src/app/beranda/page.tsx', file);
  console.log('Successfully patched avatar online indicator structure.');
} else {
  console.log('Error: Could not find exact structure.');
}
