const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add the Date bubble
// Note: <div className="flex items-start gap-2 max-w-[90%] group"> appears in floating chat (line 3562)
// but it might also appear in main chat. Let's make sure we only replace the one in floating chat.
// We can use a regex that matches the surrounding lines.
const floatingSearch = `                <div className="flex items-start gap-2 max-w-[90%] group">
                  <img src="/default-avatar.svg" className="w-7 h-7 rounded-full border border-gray-300 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1 ">`;

const floatingReplace = `                {/* Tanggal Chat */}
                <div className="flex justify-center my-3">
                  <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-2.5 py-1 rounded-lg text-[11px] font-medium shadow-sm">
                    9/9/2026
                  </span>
                </div>

                <div className="flex items-start gap-2 max-w-[90%] group">
                  <img src="/default-avatar.svg" className="w-7 h-7 rounded-full border border-gray-300 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1 ">`;

code = code.replace(floatingSearch, floatingReplace);

// 2. Format 24-hour time
code = code.replace(
  'toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})',
  'toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12: false})'
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Script executed');
