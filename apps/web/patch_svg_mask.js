const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Header Home
file = file.replace(
  '<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>',
  `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/home.svg) center/contain no-repeat', mask: 'url(/navigasi/home.svg) center/contain no-repeat' }} />`
);

// 2. Header Friends (conditional block)
const oldHeaderFriends = `{activeTab === 'friend' ? (
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}`;
const newHeaderFriends = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/teman.svg) center/contain no-repeat', mask: 'url(/navigasi/teman.svg) center/contain no-repeat' }} />`;

file = file.split(oldHeaderFriends).join(newHeaderFriends);
file = file.split(oldHeaderFriends.replace(/\n/g, '\r\n')).join(newHeaderFriends.replace(/\n/g, '\r\n'));

// 3. Header Groups
file = file.replace(
  '<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
  `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/grub.svg) center/contain no-repeat', mask: 'url(/navigasi/grub.svg) center/contain no-repeat' }} />`
);

// 4. Sidebar Friends (conditional block)
const oldSidebarFriends = `{activeTab === 'friend' ? (
                <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
              ) : (
                <svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}`;
const newSidebarFriends = `<div className="w-6 h-6 bg-current text-black dark:text-[#E4E6EB]" style={{ WebkitMask: 'url(/navigasi/teman.svg) center/contain no-repeat', mask: 'url(/navigasi/teman.svg) center/contain no-repeat' }} />`;

file = file.split(oldSidebarFriends).join(newSidebarFriends);
file = file.split(oldSidebarFriends.replace(/\n/g, '\r\n')).join(newSidebarFriends.replace(/\n/g, '\r\n'));

// 5. Sidebar Groups
file = file.replace(
  '<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
  `<div className="w-6 h-6 bg-current text-green-500" style={{ WebkitMask: 'url(/navigasi/grub.svg) center/contain no-repeat', mask: 'url(/navigasi/grub.svg) center/contain no-repeat' }} />`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Replaced icons with mask SVGs');
