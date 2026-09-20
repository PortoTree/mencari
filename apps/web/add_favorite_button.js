const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStr = `setChatListFilter('group'); setIsChatFilterOpen(false); }}`;

const buttonToAdd = `                        <button onClick={(e) => { e.stopPropagation(); setChatListFilter('favorite'); setIsChatFilterOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3A3B3C] flex items-center gap-3 text-[14px] font-semibold text-black dark:text-[#E4E6EB] transition-colors">
                          <svg className="w-5 h-5 text-gray-500 dark:text-[#B0B3B8]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>
                          {t('chat.filterFavorite')}
                        </button>`;

const lines = code.split('\n');
let inserted = false;
for (let i = 3300; i < 3330; i++) {
  if (lines[i] && lines[i].includes(targetStr)) {
    lines.splice(i, 0, buttonToAdd);
    inserted = true;
    break;
  }
}

if (inserted) {
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Added Favorite button successfully.');
} else {
  console.log('Could not find targetStr to insert the button.');
}
