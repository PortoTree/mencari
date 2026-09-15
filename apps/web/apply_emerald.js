const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

file = file.replace(/border-\[#0866FF\] text-\[#0866FF\]/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');
file = file.replace(/bg-\[#0866FF\]/g, 'bg-emerald-500');
file = file.replace(/bg-blue-100/g, 'bg-emerald-500');
file = file.replace(/text-blue-500/g, 'text-white');
file = file.replace(/text-blue-600 dark:text-blue-400/g, 'text-emerald-600 dark:text-emerald-400');
file = file.replace(/border-blue-600 dark:border-blue-400/g, 'border-emerald-600 dark:border-emerald-400');

// Avatar crops
file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]([^"]*)" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");
file = file.replace(/className="w-\[115%\] h-\[115%\] mt-\[15%\]" fill="currentColor" viewBox="0 0 20 20"/g, "className=\"w-full h-full pt-1.5\" fill=\"currentColor\" viewBox=\"2 0 16 18\"");

// Sidebar Avatar -> emerald
file = file.replace(/<div className="w-9 h-9 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">/g, '<div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400">');
file = file.replace(/<svg className="w-full h-full pt-1\.5 text-gray-500 dark:text-\[#B0B3B8\]" fill="currentColor" viewBox="2 0 16 18">/g, '<svg className="w-full h-full pt-1.5 text-white" fill="currentColor" viewBox="2 0 16 18">');

// Header Dropdown Avatar -> emerald
file = file.replace(/<div className="w-10 h-10 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">/g, '<div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-emerald-600 dark:border-emerald-400">');

fs.writeFileSync('src/app/beranda/page.tsx', file);
