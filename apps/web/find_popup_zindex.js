const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Find the search popup and notification popup portals
// They are rendered via createPortal - look for their z-index classes

// Search popup - look for "Pencarian" or "Recent Searches" or the search portal
const searchRegex = /isSearchExpanded \&\& typeof document !== "undefined" \&\& createPortal\(\s*\(\s*<div className="fixed/g;
let results = [];
let m;
while ((m = searchRegex.exec(code)) !== null) {
  results.push(m.index);
}

console.log('Search portal instances:', results.length, results);

// Let's just find all portal wrappers for search and notification
const allFixed = code.matchAll(/isSearchExpanded[^]*?className="fixed[^"]*z-\[?(\d+)\]?/g);
for (const match of allFixed) {
  console.log('Search panel z:', match[1], 'at', match.index);
}

const allNotif = code.matchAll(/isNotifOpen[^]*?className="fixed[^"]*z-\[?(\d+)\]?/g);
for (const match of allNotif) {
  console.log('Notif panel z:', match[1], 'at', match.index);
}
