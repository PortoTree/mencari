const fs = require('fs');

// 1. Update globals.css
let globalsCss = fs.readFileSync('src/app/globals.css', 'utf8');
const customScrollbar = `
/* Sidebar Scrollbar Auto-Hide */
.sidebar-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.sidebar-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 9999px;
}
.sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}
.dark .sidebar-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #4E4F50;
}
`;
if (!globalsCss.includes('sidebar-scrollbar')) {
    fs.writeFileSync('src/app/globals.css', globalsCss + customScrollbar);
}

// 2. Update page.tsx
let pageTsx = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const class1 = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#4E4F50] [&::-webkit-scrollbar-thumb]:rounded-full";
const class2 = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors";

pageTsx = pageTsx.split(class1).join("sidebar-scrollbar");
pageTsx = pageTsx.split(class2).join("sidebar-scrollbar");

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', pageTsx);
console.log('✅ Applied CSS-based scrollbar logic');
