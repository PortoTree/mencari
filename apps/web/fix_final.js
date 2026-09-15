const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Fix Menu Icon Separator and Size
file = file.replace(/<div className="relative group flex items-center justify-center mr-2 ml-1">\s*<button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95">\s*<img src="\/menu\.svg" alt="Menu" className="w-\[24px\] h-\[24px\] object-contain" \/>\s*<\/button>\s*<div className="absolute top-12 left-1\/2 -translate-x-1\/2 px-3 py-1\.5 bg-black\/80 text-white text-\[13px\] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-\[60\]">\s*Menu\s*<\/div>\s*<\/div>/,
`{/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#3E4042] mx-1"></div>

          {/* MENU ICON - NO CIRCLE */}
          <div className="relative group flex items-center justify-center mr-2 ml-1">
            <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
              <img src="/menu.svg" alt="Menu" className="w-[34px] h-[34px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Menu
            </div>
          </div>`);

// Fix Teman Icon
file = file.replace(/<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M12 4\.354a4 4 0 110 5\.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5\.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" \/><\/svg>/,
'<svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed menu and teman');
