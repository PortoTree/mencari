const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Home
const oldHome = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/home.svg) center/contain no-repeat', mask: 'url(/navigasi/home.svg) center/contain no-repeat' }} />`;
const newHome = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: \`url(\${activeTab === 'home' ? '/navigasi/home-aktif.svg' : '/navigasi/home.svg'}) center/contain no-repeat\`, mask: \`url(\${activeTab === 'home' ? '/navigasi/home-aktif.svg' : '/navigasi/home.svg'}) center/contain no-repeat\` }} />`;
// Ensure we only replace the FIRST occurrence (header), not the sidebar if it exists. Wait, there is no Home in sidebar! So we can just replace.
file = file.replace(oldHome, newHome);

// 2. Friends
const oldFriends = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/teman.svg) center/contain no-repeat', mask: 'url(/navigasi/teman.svg) center/contain no-repeat' }} />`;
const newFriends = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: \`url(\${activeTab === 'friend' ? '/navigasi/teman-aktif.svg' : '/navigasi/teman.svg'}) center/contain no-repeat\`, mask: \`url(\${activeTab === 'friend' ? '/navigasi/teman-aktif.svg' : '/navigasi/teman.svg'}) center/contain no-repeat\` }} />`;
// Only replace the FIRST occurrence for Friends (which is in the Header).
file = file.replace(oldFriends, newFriends);

// 3. Groups
const oldGroups = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: 'url(/navigasi/grub.svg) center/contain no-repeat', mask: 'url(/navigasi/grub.svg) center/contain no-repeat' }} />`;
const newGroups = `<div className="w-7 h-7 bg-current" style={{ WebkitMask: \`url(\${activeTab === 'group' || activeTab === 'groups' ? '/navigasi/grub-aktif.svg' : '/navigasi/grub.svg'}) center/contain no-repeat\`, mask: \`url(\${activeTab === 'group' || activeTab === 'groups' ? '/navigasi/grub-aktif.svg' : '/navigasi/grub.svg'}) center/contain no-repeat\` }} />`;
// Only replace the FIRST occurrence for Groups (Header).
file = file.replace(oldGroups, newGroups);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated Header SVG masks to use -aktif logic');
