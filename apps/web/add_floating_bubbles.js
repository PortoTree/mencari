const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const floatingChatMessagesOld = `                  <div className="flex flex-col gap-1 ">
                    <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                      <p className="text-[13.5px] text-black dark:text-[#E4E6EB]">
                        {dummyChats[activeFloatingChatIdx].msg}
                      </p>
                    </div>
                    <span className="text-[10.5px] text-gray-500 dark:text-[#B0B3B8] mt-0.5 self-start">
                      {new Date(dummyChats[activeFloatingChatIdx].ts).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}
                    </span>
                  </div>`;

const floatingChatMessagesNew = `                  <div className="flex flex-col gap-1 ">
                    <div className="bg-white dark:bg-[#3A3B3C] px-3 py-2 rounded-2xl rounded-tl-none shadow-sm flex flex-col">
                      <p className="text-[13.5px] text-black dark:text-[#E4E6EB]">
                        {dummyChats[activeFloatingChatIdx].msg}
                      </p>
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8] mt-1 self-start">
                        {new Date(dummyChats[activeFloatingChatIdx].ts).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bubble 1: Gagal Terkirim */}
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
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">{t("chat.failedToSend")}</span>
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
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">{t("chat.sending")}</span>
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
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">{t("chat.sent")}</span>
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
                      <span className="text-[10px] text-gray-500 dark:text-[#B0B3B8]">{t("chat.read")} 11.12</span>
                    </div>
                  </div>`; // Notice I don't re-close the outer '</div>' because my Old string doesn't include the closing '</div>' of the outer flex item either. Wait, I added an extra `</div>` at the end of the New block? Let's check.

// In Old:
//                   <div className="flex flex-col gap-1 "> ... </div>
// The outer wrapper is `                <div className="flex items-start gap-2 max-w-[90%] group">`
// So my Old string replaces the INNER flex-col.
// To insert the new bubbles, I need to close the outer wrapper of the receiver bubble FIRST!
// That's why I did `</div>\n\n {/* Bubble 1` in New string! This correctly closes the receiver bubble.
// Then the 4 bubbles are siblings to the receiver bubble.
// And finally, I don't need to append an extra `</div>` because the original code already has one `</div>` after the old block!

code = code.replace(floatingChatMessagesOld, floatingChatMessagesNew);
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Floating chat updated');
