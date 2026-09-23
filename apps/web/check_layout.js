const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Find Left Sidebar start
const lsStart = code.indexOf('<div className="hidden lg:block fixed left-0 top-[56px]');
const centerStart = code.indexOf('{/* Center Main Feed */}');

console.log('Left sidebar starts at line:', code.substring(0, lsStart).split('\n').length);
console.log('Center feed starts at line:', code.substring(0, centerStart).split('\n').length);
