const fs = require('fs');
const code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const navStart = code.indexOf('<nav className="bg-white dark:bg-[#242526]');
const navEnd = code.lastIndexOf('</nav>', navStart + 30000); 
// wait, there might be multiple </nav>, so let's use the dump we already have.
const dump = fs.readFileSync('nav_dump.txt', 'utf8');
console.log('Search in nav?', dump.includes('isSearchNavOpen'));
console.log('Notif in nav?', dump.includes('isNotifPanelOpen'));
console.log('Profile in nav?', dump.includes('isDropdownOpen'));
