const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The code currently has:
// 4398                   </div>
// 4399 
// 4400                 </div>
// 4401               </div>
// 4402             </div>
// 4403           ) : profileViewIdx !== null ? (

// I need to make sure the tags are balanced.
// We had 1 extra </div> or 1 missing? 
// The error was: 
// 4401,15): error TS1005: ')' expected.
// 4402,13): error TS1005: ')' expected.
// 4402,15): error TS17002: Expected corresponding JSX closing tag for 'main'.

// This usually means there's a missing closing tag OR an extra closing tag.
// Let's count the tags in the isCreatingGroup block.
// 1. <div className="flex-1 bg-[#F0F2F5] dark:bg-[#18191A] flex flex-col relative h-full"> (Line 4309)
//   2. <div className="flex-1 overflow-y-auto sidebar-scrollbar p-6">
//     3. <div className="max-w-2xl mx-auto space-y-6">
//       4. <div className="flex items-center gap-3">
//       4. </div>
//       5. <div className="bg-white ..."> (Group Icon & Name)
//       5. </div>
//       6. <div className="bg-white ..."> (Temporary messages)
//       6. </div>
//       7. <div className="bg-white ..."> (Group permissions)
//       7. </div>
//       8. <div className="bg-white ..."> (Group Members)
//       8. </div>
//       9. <div className="flex justify-end pt-2"> (Create Button)
//       9. </div>
//     3. </div>
//   2. </div>
// 1. </div>
// So there should be exactly 3 </div>s at the end of the block.

// Let's replace whatever is at the end with exactly 3 </div>s.
code = code.replace(
  /                  \{\/\* Create Button \*\/\}[\s\S]*?\) : profileViewIdx !== null \? \(/,
  `                  {/* Create Button */}
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
              </div>
            </div>
          ) : profileViewIdx !== null ? (`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Fixed tag balancing');
