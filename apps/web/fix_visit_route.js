const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// The visit icon in the search dropdown was accidentally routed to /beranda
// Let's find it. It's inside <div className="relative group/visit">
const regex = /<div className="relative group\/visit">\s*<button\s*onClick=\{\(\) => router\.push\(\`\/\$\{locale\}\/beranda\`\)\}/g;
if (regex.test(code)) {
  code = code.replace(regex, '<div className="relative group/visit">\n                      <button\n                        onClick={() => router.push(`/${locale}/mencari`)}');
  fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
  console.log('Fixed visit icon route');
} else {
  console.log('Regex did not match group/visit');
  // let's try a simpler replace
  code = code.replace(
    'onClick={() => router.push(`/${locale}/beranda`)}\n                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-emerald-50 dark:hover:bg-[#203D2E] transition-colors shrink-0 border border-gray-200 dark:border-[#4E4F50]"',
    'onClick={() => router.push(`/${locale}/mencari`)}\n                        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#3A3B3C] hover:bg-emerald-50 dark:hover:bg-[#203D2E] transition-colors shrink-0 border border-gray-200 dark:border-[#4E4F50]"'
  );
  fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
  console.log('Fixed visit icon route using fallback');
}
