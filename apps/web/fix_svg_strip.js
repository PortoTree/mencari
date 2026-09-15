const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(
  '<button className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">\n              {/* Arrow Down Badge */}',
  '<button className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">\n                <svg className="w-full h-full pt-1.5 text-white" fill="currentColor" viewBox="2 0 16 18"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>\n              </button>\n              {/* Arrow Down Badge */}'
);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed missing SVG');
