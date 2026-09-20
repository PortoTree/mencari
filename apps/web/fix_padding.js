const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// floating chat button replacement
code = code.replace(
  '<button className="flex items-center gap-1 bg-[#00B47A] hover:bg-[#009E6B] text-white px-2.5 py-1.5 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0 ml-1">',
  '<button className="flex items-center justify-center gap-1 bg-[#00B47A] hover:bg-[#009E6B] text-white px-2.5 py-1.5 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0 ml-1 min-w-[72px]">'
);
code = code.replace(
  '<button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0 ml-1">',
  '<button className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2.5 py-1.5 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0 ml-1 min-w-[72px]">'
);

// main chat button replacement
code = code.replace(
  '<button className="flex items-center gap-1.5 bg-[#00B47A] hover:bg-[#009E6B] text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm shrink-0">',
  '<button className="flex items-center justify-center gap-1.5 bg-[#00B47A] hover:bg-[#009E6B] text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm shrink-0 min-w-[105px]">'
);
code = code.replace(
  '<button className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm">',
  '<button className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm shrink-0 min-w-[105px]">'
);

// also fix the emoji icon color for both (which was text-gray-500 / dark:text-[#A8ABAF] hover:text-[#00B47A])
// Floating emoji icon (at 3622 before)
// Main chat emoji icon (at 5251 before)
// It is better to use regex to replace all of them in the input block. But we have exactly two.
code = code.replace(
  '<button className="text-gray-500 dark:text-[#A8ABAF] hover:text-[#00B47A] transition-colors shrink-0 ml-1.5 flex items-center justify-center">',
  '<button className="text-[#00B47A] hover:text-[#009E6B] transition-colors shrink-0 ml-1.5 flex items-center justify-center">'
);
code = code.replace(
  '<button className="text-gray-500 dark:text-[#A8ABAF] hover:text-[#00B47A] transition-colors shrink-0 ml-2 flex items-center justify-center">',
  '<button className="text-[#00B47A] hover:text-[#009E6B] transition-colors shrink-0 ml-2 flex items-center justify-center">'
);


fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed widths for buttons and emoji colors');
