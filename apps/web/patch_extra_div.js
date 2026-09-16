const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const bad1 = `            </div>
            </div>
            <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">Saya web development mencari client🥰</p>`;

const good1 = `            </div>
            <p className="text-black dark:text-[#E4E6EB] text-[15px] mb-3 px-4">Saya web development mencari client🥰</p>`;

file = file.replace(bad1, good1);
file = file.replace(bad1.replace(/\n/g, '\r\n'), good1.replace(/\n/g, '\r\n'));

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Removed extra div');
