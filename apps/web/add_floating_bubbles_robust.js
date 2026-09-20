const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 3560; i < 3580; i++) {
  if (lines[i] && lines[i].includes('dummyChats[activeFloatingChatIdx].msg')) {
    // Found the receiver bubble p tag
    // Current structure:
    // 3566: <p className="...">
    // 3567:   {dummyChats[...].msg}
    // 3568: </p>
    // 3569: </div>
    // 3570: <span className="text-[10.5px] ...">
    // 3571:   {new Date(...)}
    // 3572: </span>
    
    // We want to move the span INSIDE the div.
    const divEndIndex = i + 2; // line 3569
    const spanStartIndex = i + 3; // line 3570
    const spanMidIndex = i + 4; // line 3571
    const spanEndIndex = i + 5; // line 3572
    
    if (lines[divEndIndex].includes('</div>') && lines[spanStartIndex].includes('<span')) {
      // Extract the span lines
      const spanLines = [
        lines[spanStartIndex].replace('mt-0.5', 'mt-1'),
        lines[spanMidIndex],
        lines[spanEndIndex]
      ];
      
      // Delete the old span
      lines.splice(spanStartIndex, 3);
      
      // Insert the span BEFORE the </div>
      lines.splice(divEndIndex, 0, ...spanLines);
      
      // Now insert the 4 dummy bubbles AFTER the receiver bubble's outer wrapper
      // The outer wrapper ends at i + 7 (which is </div> for the flex items-start group)
      // We will inject the new bubbles right after it.
      
      const newBubbles = `                {/* Bubble 1: Gagal Terkirim */}
                <div className="flex items-end justify-end gap-2 max-w-[90%] self-end mt-2">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                      <p className="text-[13.5px] text-white">
                        Waduh, sinyal lagi jelek nih bro.
                      </p>
                      <span className="text-[10px] text-emerald-100 mt-1">10.25</span>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <div className="w-3.5 h-3.5 bg-red-500" style={{ WebkitMask: 'url(/mark/tidak-terkirim.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/tidak-terkirim.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">Gagal terkirim</span>
                    </div>
                  </div>
                </div>

                {/* Bubble 2: Pending */}
                <div className="flex items-end justify-end gap-2 max-w-[90%] self-end mt-2">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                      <p className="text-[13.5px] text-white">
                        Sabar yak, ini lagi jalan ke warkop cari wifi.
                      </p>
                      <span className="text-[10px] text-emerald-100 mt-1">10.27</span>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <div className="w-3.5 h-3.5 bg-orange-500" style={{ WebkitMask: 'url(/mark/pending.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/pending.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">Mengirimkan...</span>
                    </div>
                  </div>
                </div>

                {/* Bubble 3: Terkirim */}
                <div className="flex items-end justify-end gap-2 max-w-[90%] self-end mt-2">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                      <p className="text-[13.5px] text-white">
                        Nah udah masuk nih pesannya!
                      </p>
                      <span className="text-[10px] text-emerald-100 mt-1">10.35</span>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <div className="w-3.5 h-3.5 bg-blue-500" style={{ WebkitMask: 'url(/mark/terkirim.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/terkirim.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">Terkirim</span>
                    </div>
                  </div>
                </div>

                {/* Bubble 4: Dilihat */}
                <div className="flex items-end justify-end gap-2 max-w-[90%] self-end mt-2">
                  <div className="flex flex-col gap-1 items-end">
                    <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                      <p className="text-[13.5px] text-white">
                        Baik bro! Iyak nih kapan ya terakhir ketemu, sibuk parah wkwk.
                      </p>
                      <span className="text-[10px] text-emerald-100 mt-1">11.11</span>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <div className="w-4 h-4 bg-green-500" style={{ WebkitMask: 'url(/mark/diliat.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/diliat.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">Dilihat 11.12</span>
                    </div>
                  </div>
                </div>`.split('\n');
      
      // Inject after the closing </div> of the group (which is at divEndIndex + 4 now since we inserted 3 lines)
      // wait, let's just find the `</>` line which closes the fragment
      let fragmentEnd = -1;
      for (let k = divEndIndex; k < divEndIndex + 15; k++) {
        if (lines[k] && lines[k].includes('</>')) {
          fragmentEnd = k;
          break;
        }
      }
      
      if (fragmentEnd !== -1) {
        lines.splice(fragmentEnd, 0, ...newBubbles);
        console.log('Successfully injected bubbles and moved time inside');
        break;
      }
    }
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
