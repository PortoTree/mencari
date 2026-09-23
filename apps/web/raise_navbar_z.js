const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The navbar has z-[100]. We need to raise it above the product sidebar (z-[9999])
// so that clicks on navbar icons always work.
// Current: navbar z-[100], search dropdown z-[10001], notif z-[10003]
// Fix: navbar → z-[10100] so it's above everything in sidebar AND its own dropdowns still work
const navbarClass = 'bg-white dark:bg-[#242526] shadow-sm sticky top-0 z-[100] h-[56px]';
if (code.includes(navbarClass)) {
  code = code.replace(navbarClass, 'bg-white dark:bg-[#242526] shadow-sm sticky top-0 z-[10100] h-[56px]');
  console.log('Navbar z-index raised to z-[10100]');
} else {
  console.log('Navbar class not found, trying without shadow-sm...');
  // try alternative
  const alt = 'sticky top-0 z-[100]';
  const count = (code.match(new RegExp(alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(`Found "${alt}" ${count} times`);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
