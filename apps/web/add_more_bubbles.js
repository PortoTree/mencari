const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// 1. Add chat-date-separator class to existing "9/9/2026"
for (let i = 0; i < lines.length; i++) {
  if (lines[i] && lines[i].includes('9/9/2026') && !lines[i].includes('mainStickyDateText') && !lines[i].includes('floatingStickyDateText')) {
    if (lines[i-1] && lines[i-1].includes('<span className="bg-[#E5E5E5]')) {
      lines[i-1] = lines[i-1].replace('<span className="bg-[#E5E5E5]', '<span className="chat-date-separator bg-[#E5E5E5]');
    }
  }
}

const dummyBubbles10 = `                {/* Tanggal Chat 2 */}
                <div className="flex justify-center my-4">
                  <span className="chat-date-separator bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-3 py-1 rounded-lg text-[12.5px] font-semibold tracking-wide shadow-sm">
                    10/9/2026
                  </span>
                </div>

                <div className="flex items-start gap-2 max-w-[90%] group">
                  <img src="/default-avatar.svg" className="w-7 h-7 rounded-full border border-gray-300 shrink-0 mt-1" />
                  <div className="flex flex-col gap-1 ">
                    <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                      <p className="text-[13.5px] text-black dark:text-[#E4E6EB]">
                        Eh bro, sorry baru balas. Kemarin sibuk banget parah.
                      </p>
                      <span className="text-[10.5px] text-gray-500 dark:text-[#B0B3B8] mt-1 self-start">
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
                </div>`.split('\\n');

// Find Floating Chat end of bubbles (search for "Baik bro! Iyak nih kapan ya terakhir ketemu")
for (let i = 3500; i < 3700; i++) {
  if (lines[i] && lines[i].includes('Baik bro! Iyak nih kapan ya terakhir ketemu')) {
    // Scroll down to the end of this bubble
    let target = i;
    while (!lines[target].includes('</>')) target++;
    // target is the </> line for floating chat. Insert before it.
    lines.splice(target, 0, ...dummyBubbles10);
    break;
  }
}

// Find Main Chat end of bubbles
for (let i = 5100; i < 5400; i++) {
  if (lines[i] && lines[i].includes('Baik bro! Iyak nih kapan ya terakhir ketemu')) {
    // For main chat, wait, the max-w for sender is 70% in main chat!
    // I will replace 90% with 70% for main chat.
    const mainBubbles10 = dummyBubbles10.map(l => l.replace('max-w-[90%]', 'max-w-[70%]'));
    let target = i;
    // Main chat bubbles are wrapped directly in the chat container, no </> wrapper.
    // They end right before {/* Input Area */}
    while (!lines[target].includes('{/* Input Area */}')) target++;
    lines.splice(target, 0, ...mainBubbles10);
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Done inserting new bubbles');
