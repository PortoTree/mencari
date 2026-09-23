const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = `                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors backdrop-blur-sm shadow-sm"
                >`;

const replacementStr = `                <button
                  onClick={() => setIsProfileSidebarOpen(false)}
                  className="fixed top-[64px] right-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-50 transition-colors backdrop-blur-sm shadow-sm"
                >`;

code = code.replace(targetStr, replacementStr);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed position applied to close button.');
