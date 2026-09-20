const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const oldFooter = `              {/* Footer */}
              <div className="p-4 bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-[#3E4042] flex justify-center shrink-0">
                 <button onClick={() => {
                   setIsCreatingGroup(false);
                   setSelectedFriendsToAdd([]);
                   setActiveChatIdx(0); 
                 }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   {t('chat.createGroupBtn')}
                 </button>
              </div>`;

const beforeFooterStr = `                        ))}
                     </div>
                  </div>

                </div>
              </div>`;

const newBodyEnd = `                        ))}
                     </div>
                  </div>

                  {/* Create Button */}
                  <div className="flex justify-end pt-2">
                    <button onClick={() => {
                      setIsCreatingGroup(false);
                      setSelectedFriendsToAdd([]);
                      setActiveChatIdx(0); 
                    }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t('chat.createGroupBtn')}
                    </button>
                  </div>

                </div>
              </div>`;

// Regex replacement for footer removal
const footerRegex = /\{\/\* Footer \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\) : profileViewIdx !== null \? \(/;
const match = code.match(footerRegex);
if (match) {
  // Replace the old block inside the max-w-2xl
  code = code.replace(
    /\{\/\* Group Members \*\/\}([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Footer \*\/\}[\s\S]*?<\/div>\s*<\/div>/,
    `{/* Group Members */}$1</div>
                  </div>

                  {/* Create Button */}
                  <div className="flex justify-end pt-2">
                    <button onClick={() => {
                      setIsCreatingGroup(false);
                      setSelectedFriendsToAdd([]);
                      setActiveChatIdx(0); 
                    }} className="bg-[#1877F2] hover:bg-blue-600 text-white font-semibold text-[15px] py-2.5 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {t('chat.createGroupBtn')}
                    </button>
                  </div>

                </div>
              </div>`
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Replaced footer button successfully');
} else {
  console.log('Footer not found!');
}
