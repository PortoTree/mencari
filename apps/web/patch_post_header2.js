const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const t1 = `<div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>`;

const r1 = `<div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' }); setIsProfileSidebarOpen(true); }}>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Pengguna</h3>`;

const t2 = `<div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>`;

const r2 = `<div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => { setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' }); setIsProfileSidebarOpen(true); }}>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                    <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Naufal faiz</h3>`;

function replace(source, target, repl) {
  let parts = source.split(target);
  if (parts.length === 1) {
    parts = source.split(target.replace(/\n/g, '\r\n'));
  }
  if (parts.length > 1) {
    return parts.join(repl.replace(/\n/g, parts[0].includes('\r\n') ? '\r\n' : '\n'));
  }
  return source;
}

file = replace(file, t1, r1);
file = replace(file, t2, r2);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated headers');
