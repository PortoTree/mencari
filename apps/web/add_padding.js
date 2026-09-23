const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Add pb-32 to Profile Sidebar
const profileSidebarClass = 'overflow-y-auto transition-transform duration-300 ease-in-out transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} z-40 sidebar-scrollbar bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042]`';
const newProfileSidebarClass = 'overflow-y-auto pb-32 transition-transform duration-300 ease-in-out transform ${isProfileSidebarOpen ? "translate-x-0" : "translate-x-full"} z-40 sidebar-scrollbar bg-white dark:bg-[#242526] border-l border-gray-200 dark:border-[#3E4042]`';

code = code.replace(profileSidebarClass, newProfileSidebarClass);

// Add pb-32 to Product Sidebar
const productSidebarClass = 'overflow-y-auto pt-6 px-4 pb-32 sidebar-scrollbar transition-transform duration-300 ease-in-out transform ${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]`';
// Wait, looking at the previous output, product sidebar might already have pb-32.
// Let's check if it's there. If not, add it.
if (!code.includes('pb-32 sidebar-scrollbar transition-transform duration-300 ease-in-out transform ${isProductDetailOpen')) {
     const pSidebarClass1 = 'overflow-y-auto pt-6 px-4 sidebar-scrollbar transition-transform duration-300 ease-in-out transform ${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]`';
     const pSidebarClass2 = 'overflow-y-auto pt-6 px-4 pb-32 sidebar-scrollbar transition-transform duration-300 ease-in-out transform ${isProductDetailOpen ? "translate-x-0" : "translate-x-full"} z-[9999]`';
     code = code.replace(pSidebarClass1, pSidebarClass2);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Added pb-32 to sidebar');
