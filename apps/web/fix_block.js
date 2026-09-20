const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// I will extract everything from `{isCreatingGroup ? (` up to `) : profileViewIdx !== null ? (`
// and manually rebuild it cleanly.

const startStr = '{isCreatingGroup ? (';
const endStr = ') : profileViewIdx !== null ? (';
const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  let block = code.substring(startIndex, endIndex);

  // Clean out the old button and extra closing tags
  block = block.replace(/\{\/\* Create Button \*\/\}[\s\S]*$/, '');

  // block now ends right after the Member List Preview closing div.
  // We need to find the `</div>` that closes Member List Preview and append the button and the 3 closing divs.

  // Let's just find the end of Member List Preview by its structure.
  const memberEndRegex = /(<div className="bg-white dark:bg-\[\#242526\] rounded-xl shadow-sm border border-gray-100 dark:border-\[\#3E4042\] overflow-hidden p-4">[\s\S]*?<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>/;
  
  if (memberEndRegex.test(block)) {
    // This is already wrong in the block because I might have deleted too much.
  }
}

// Let's use a simpler replace based on exactly what is in the file right now.
const fileContentRegex = /(<div className="bg-white dark:bg-\[\#242526\] rounded-xl shadow-sm border border-gray-100 dark:border-\[\#3E4042\] overflow-hidden p-4">[\s\S]*?<\/div>\s*<\/div>)\s*<\/div>\s*<\/div>\s*\{\/\* Create Button \*\/\}[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

if (fileContentRegex.test(code)) {
  code = code.replace(
    fileContentRegex,
    `$1

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
              </div>
            </div>`
  );
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Fixed block correctly!');
} else {
  console.log('Regex did not match!');
}
