const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Update three dots button to capture position
const oldBtn = `<button
                        onClick={(e) => { e.stopPropagation(); setActiveChatMenu(activeChatMenu === idx ? null : idx); }}
                        className={"absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " + (activeChatMenu === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                      >`;

const newBtn = `<button
                        onClick={(e) => { e.stopPropagation(); const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect(); setMenuPosition({ top: rect.top }); setActiveChatMenu(activeChatMenu === idx ? null : idx); }}
                        className={"absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " + (activeChatMenu === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                      >`;

file = file.replace(oldBtn, newBtn);

// 2. Change the dropdown panel from absolute (inside container) to fixed (floating outside)
const oldPanel = `{activeChatMenu === idx && (
                        <div ref={chatMenuRef} onClick={(e) => e.stopPropagation()} className="absolute z-[100] w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden" style={{right: '-268px', top: '0'}}>`;

// Replace inline panel with null - it will be rendered as portal outside
const newPanel = `{activeChatMenu === idx && null /* panel rendered as fixed overlay below */}
                      {false && (`;

// Actually simpler - just change the position to fixed and use menuPosition
// We need to find and replace just the panel positioning
const fixedPanel = `{activeChatMenu === idx && (
                        <div ref={chatMenuRef} onClick={(e) => e.stopPropagation()} className="fixed z-[200] w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden" style={{right: '388px', top: menuPosition.top}}>`;

file = file.replace(oldPanel, fixedPanel);

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Panel position changed to fixed');
