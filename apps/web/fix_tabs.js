const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

// Replace all tab navigations
code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("home"\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/beranda`)}'
);

code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("product"\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/product`)}'
);

code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("chat"\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/obrolan`)}'
);

code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("friend"\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/friend`)}'
);

code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("group"\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/group`)}'
);

// Logo click
code = code.replace(
  /onClick=\{\(\) => \{\s*setActiveTab\("mencari"\);\s*setIsSearchNavOpen\(false\);\s*window\.history\.pushState\([^;]+\);\s*\}\}/g,
  'onClick={() => router.push(`/${locale}/beranda`)}'
);

// The very first logo might just be a simple onclick
code = code.replace(
  /onClick=\{\(\) => router\.push\("`\/\$\{locale\}\/beranda`"\)\}/g,
  'onClick={() => router.push(`/${locale}/beranda`)}'
);

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed tabs routing');
