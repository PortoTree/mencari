const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const dummyBubbles10 = `                {/* Tanggal Chat 2 */}
                <div className="flex justify-center my-4">
                  <span className="chat-date-separator bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-sm">
                    10/9/2026
                  </span>
                </div>

                <div className="flex items-start gap-2 max-w-[90%] group mt-2">
                  <img src="/default-avatar.svg" className="w-7 h-7 rounded-full border border-gray-300 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1 ">
                    <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                      <p className="text-[13.5px] text-black dark:text-[#E4E6EB]">
                        Eh bro, sorry baru balas. Kemarin sibuk banget parah.
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8] mt-1 self-start">
                        08:15
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-end gap-2 max-w-[90%] self-end mt-2">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                      <p className="text-[13.5px] text-white">
                        Santai bro, ini besok jadi kumpul kan di tempat biasa?
                      </p>
                      <span className="text-[10px] text-emerald-100 mt-1">08:20</span>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <div className="w-4 h-4 bg-green-500" style={{ WebkitMask: 'url(/mark/diliat.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/diliat.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">Dilihat 08:22</span>
                    </div>
                  </div>
                </div>`.split('\n');

// 1. Inject into Floating Chat
let targetFloating = -1;
for (let i = 3500; i < 4000; i++) {
  if (lines[i] && lines[i].includes('Baik bro! Iyak nih kapan ya terakhir ketemu')) {
    let t = i;
    while (!lines[t].includes('</>')) t++;
    targetFloating = t;
    break;
  }
}

if (targetFloating !== -1) {
  lines.splice(targetFloating, 0, ...dummyBubbles10);
}

// 2. Inject into Main Chat
let targetMain = -1;
for (let i = 5000; i < 5500; i++) {
  // Use the updated index because array length changed
  if (lines[i] && lines[i].includes('Baik bro! Iyak nih kapan ya terakhir ketemu')) {
    // Only target the one AFTER targetFloating
    if (i > targetFloating + 100) {
      let t = i;
      while (!lines[t].includes('</div>') || lines[t].includes('Dilihat 11.12') || lines[t].includes('bg-green-500') || lines[t].includes('items-center gap-1 mr-1') || lines[t].includes('flex-col gap-1 items-end') || lines[t].includes('justify-end gap-2 max-w-[')) {
        t++;
      }
      // t is now at the `</div>` that closes the chatContainerRef
      // Let's verify by checking next line
      if (lines[t+1].includes('bg-transparent shrink-0')) {
        targetMain = t;
      } else {
        // Fallback: search exactly for `<div className="p-4 bg-transparent shrink-0">`
        let scan = t;
        while (!lines[scan].includes('<div className="p-4 bg-transparent shrink-0">')) scan++;
        targetMain = scan - 1; // Before the closing div
      }
      break;
    }
  }
}

if (targetMain !== -1) {
  const mainBubbles10 = dummyBubbles10.map(l => l.replace('max-w-[90%]', 'max-w-[70%]').replace('text-[13.5px]', 'text-[14px]').replace('text-[10px]', 'text-[11px]').replace('text-[10.5px]', 'text-[11px]'));
  lines.splice(targetMain, 0, ...mainBubbles10);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully injected 10/9/2026 bubbles');
