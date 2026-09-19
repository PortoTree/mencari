const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetStartStr = '<div className="flex items-start gap-2 max-w-[70%]">';
const targetEndStr = '                      <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8]">{t("chat.read")}</span>\n                    </div>\n                  </div>\n                </div>\n              </div>';

const startIndex = code.indexOf(targetStartStr);
const endIndex = code.indexOf(targetEndStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const original = code.substring(startIndex, endIndex + targetEndStr.length);
    const replacement = \              <div className="flex items-start gap-2 max-w-[70%]">
                <img
                  src="/default-avatar.svg"
                  className="w-8 h-8 rounded-full border border-gray-300 shrink-0"
                />
                <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                  <p className="text-[14px] text-black dark:text-[#E4E6EB]">
                    Halo bro, apa kabar? Udah lama gak nongkrong nih.
                  </p>
                  <span className="text-[11px] text-gray-500 dark:text-[#B0B3B8] mt-1 self-start">
                    10.22
                  </span>
                </div>
              </div>
              
              {/* Bubble 1: Gagal Terkirim */}
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end mt-2">
                <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                  <p className="text-[14px] text-white">
                    Waduh, sinyal lagi jelek nih bro.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-emerald-100">10.25</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-red-300" style={{ WebkitMask: 'url(/mark/tidak-terkirim.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/tidak-terkirim.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[11px] text-emerald-100">{t("chat.failedToSend")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bubble 2: Pending */}
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end mt-2">
                <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                  <p className="text-[14px] text-white">
                    Sabar yak, ini lagi jalan ke warkop cari wifi.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-emerald-100">10.27</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-orange-300" style={{ WebkitMask: 'url(/mark/pending.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/pending.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[11px] text-emerald-100">{t("chat.sending")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bubble 3: Terkirim */}
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end mt-2">
                <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                  <p className="text-[14px] text-white">
                    Nah udah masuk nih pesannya!
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-emerald-100">10.35</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3.5 h-3.5 bg-blue-300" style={{ WebkitMask: 'url(/mark/terkirim.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/terkirim.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[11px] text-emerald-100">{t("chat.sent")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bubble 4: Dilihat */}
              <div className="flex items-end justify-end gap-2 max-w-[70%] self-end mt-2">
                <div className="bg-emerald-600 dark:bg-emerald-500 px-3 py-2 rounded-2xl rounded-tr-none shadow-sm flex flex-col items-end">
                  <p className="text-[14px] text-white">
                    Baik bro! Iyak nih kapan ya terakhir ketemu, sibuk parah wkwk.
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[11px] text-emerald-100">11.11</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-green-300" style={{ WebkitMask: 'url(/mark/diliat.svg) no-repeat center', WebkitMaskSize: 'contain', mask: 'url(/mark/diliat.svg) no-repeat center', maskSize: 'contain' }} />
                      <span className="text-[11px] text-emerald-100">{t("chat.read")}</span>
                    </div>
                  </div>
                </div>
              </div>\;

    code = code.replace(original, replacement);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
    console.log('Successfully replaced bubbles to put times inside');
} else {
    console.log('Could not find target strings for replacement', startIndex, endIndex);
}
