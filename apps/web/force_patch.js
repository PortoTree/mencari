const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const targetSectionRegex = /(<p className="font-semibold text-\[14px\] text-gray-500 dark:text-\[\#B0B3B8\] mb-3">\{t\('chat\.groupMembers'\)\} \(\{selectedFriendsToAdd\.length\}\)<\/p>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)\s*\{\/\* Footer \*\/\}[\s\S]*?<div className="p-4 bg-white dark:bg-\[\#242526\] border-t border-gray-200 dark:border-\[\#3E4042\] flex justify-center shrink-0">[\s\S]*?<\/button>\s*<\/div>/;

const match = code.match(targetSectionRegex);

if (match) {
  const newContent = `$1
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

  code = code.replace(targetSectionRegex, newContent);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully replaced footer and moved button!');
} else {
  console.log('REGEX DID NOT MATCH! Trying alternative replace...');
  
  // Alternative brutal replace if regex fails due to whitespace
  const split1 = code.split('{/* Footer */}');
  if (split1.length > 1) {
    const beforeFooter = split1[0];
    const afterFooterStart = split1[1];
    const split2 = afterFooterStart.split('</button>\r\n              </div>');
    if (split2.length === 1) {
      // try LF
      const split3 = afterFooterStart.split('</button>\n              </div>');
      if (split3.length > 1) {
         console.log("Found using LF split");
         // It means we can manually splice. But let's check what's before footer.
      }
    }
  }
}
