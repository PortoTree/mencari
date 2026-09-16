const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

file = file.replace(
  /<div className="flex items-center gap-3">\s*<div className="w-\[40px\] h-\[40px\] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\s*<img src="\/default-avatar\.svg" alt="Profile" className="w-full h-full object-cover" \/>\s*<\/div>\s*<div>\s*<h3 className="font-bold text-black dark:text-\[#E4E6EB\] text-\[15px\] leading-tight">Pengguna<\/h3>/,
  `<div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' }); setIsProfileSidebarOpen(true); }}>
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Pengguna</h3>`
);

file = file.replace(
  /<div className="flex items-center gap-3">\s*<div className="w-\[40px\] h-\[40px\] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\s*<img src="\/default-avatar\.svg" alt="Profile" className="w-full h-full object-cover" \/>\s*<\/div>\s*<div>\s*<h3 className="font-bold text-black dark:text-\[#E4E6EB\] text-\[15px\] leading-tight">Naufal faiz<\/h3>/,
  `<div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' }); setIsProfileSidebarOpen(true); }}>
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Naufal faiz</h3>`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Applied regex replace');
