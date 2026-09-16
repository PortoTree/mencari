const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Target 1: Pengguna's post header
const t1 = `<div className="flex items-center gap-3 pb-2 px-4 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#3E4042] bg-white dark:bg-[#242526] overflow-hidden shrink-0">
                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover p-1" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>
                  <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 3 * 60000, t, locale)}</p>
                </div>
              </div>`;

const r1 = `<div className="flex items-center gap-3 pb-2 px-4 relative">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  setSelectedProfile({ name: 'Pengguna', role: 'Member', avatar: '/default-avatar.svg' });
                  setIsProfileSidebarOpen(true);
                }}
              >
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#3E4042] bg-white dark:bg-[#242526] overflow-hidden shrink-0">
                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover p-1" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Pengguna</h3>
                  <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 3 * 60000, t, locale)}</p>
                </div>
              </div>`;

// Target 2: Naufal's post header
const t2 = `<div className="flex items-center justify-between pb-2 px-4 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#3E4042] bg-white dark:bg-[#242526] overflow-hidden shrink-0">
                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover p-1" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                    <span>Web Development</span>
                    <span>•</span>
                    <span>{formatPostTime(Date.now() - 2 * 3600000, t, locale)}</span>
                  </div>
                </div>
              </div>`;

const r2 = `<div className="flex items-center justify-between pb-2 px-4 relative">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => {
                  setSelectedProfile({ name: 'Naufal faiz', role: 'Web Development', avatar: '/default-avatar.svg' });
                  setIsProfileSidebarOpen(true);
                }}
              >
                <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-[#3E4042] bg-white dark:bg-[#242526] overflow-hidden shrink-0">
                  <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover p-1" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight hover:underline">Naufal faiz</h3>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">
                    <span>Web Development</span>
                    <span>•</span>
                    <span>{formatPostTime(Date.now() - 2 * 3600000, t, locale)}</span>
                  </div>
                </div>
              </div>`;

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
console.log('✅ Added onClick to post headers');
