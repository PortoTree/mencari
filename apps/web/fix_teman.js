const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">/g, '<svg className="w-6 h-6 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed teman icon');
