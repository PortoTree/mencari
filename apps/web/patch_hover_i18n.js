const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Update hover class for light mode and translation for Add Shortcut button
file = file.replace(
  '<div onClick={() => setIsShortcutModalOpen(true)} className="flex flex-col items-center cursor-pointer group p-3 rounded-lg hover:bg-[#F2F2F2] dark:hover:bg-[#303134] transition-colors">',
  '<div onClick={() => setIsShortcutModalOpen(true)} className="flex flex-col items-center cursor-pointer group p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#303134] transition-colors">'
);

// Note: I will replace the hardcoded text with translations
file = file.replace(
  '<span className="text-[13px] font-medium text-black dark:text-[#E4E6EB]">Tambahkan pintasan</span>',
  '<span className="text-[13px] font-medium text-black dark:text-[#E4E6EB]">{t(\'mencari.shortcut_add\')}</span>'
);

file = file.replace(
  '<h2 className="text-[16px] font-semibold text-black dark:text-[#E4E6EB]">Tambahkan pintasan</h2>',
  '<h2 className="text-[16px] font-semibold text-black dark:text-[#E4E6EB]">{t(\'mencari.shortcut_title\')}</h2>'
);

file = file.replace(
  '<label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">Nama</label>',
  '<label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">{t(\'mencari.name\')}</label>'
);

file = file.replace(
  '<label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">URL</label>',
  '<label className="block text-[13px] text-gray-600 dark:text-[#B0B3B8] mb-1">{t(\'mencari.url\')}</label>'
);

file = file.replace(
  `              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors"
              >
                Batal
              </button>`,
  `              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium text-gray-700 dark:text-[#E4E6EB] hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors"
              >
                {t('mencari.cancel')}
              </button>`
);

file = file.replace(
  `              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Selesai
              </button>`,
  `              <button 
                onClick={() => setIsShortcutModalOpen(false)}
                className="px-4 py-2 rounded-md text-[14px] font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {t('mencari.done')}
              </button>`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Updated translations and hover effect');
