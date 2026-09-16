const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const feedStart = '<div className="space-y-4 max-w-[590px] w-full px-4">';
const feedStartIndex = file.indexOf(feedStart);
const profileSidebarIndex = file.indexOf('{/* Profile Right Sidebar */}');

// The closing `</div>` for space-y-4 is right before the closing `</div>` for flex-1 wrapper, which is right before Profile Right Sidebar.
// So we just slice until `</div>\n        </div>\n\n    \n        {/* Profile Right Sidebar */}` or similar.
let feedEndIndex = profileSidebarIndex;
while (file.slice(feedEndIndex - 6, feedEndIndex) === '</div>') {
    feedEndIndex -= 6; // go back over div
}
// Just split before the 2 closing divs.
// Wait, the `space-y-4` wrapper is closed, and then the `flex-1` wrapper is closed.
// I only want to conditionally render the contents of `flex-1` wrapper.

const flex1Start = file.indexOf('<div className="flex-1 flex justify-center');
const flex1InnerStart = file.indexOf(feedStart);
const contentBefore = file.slice(0, flex1InnerStart);

// We need to find the `</div>` that closes `flex1InnerStart`.
// There's a lot of nested divs.
// I can just replace the content between `flex1InnerStart` and `profileSidebarIndex` by carefully matching the last </div>.
// Let's use ast or simple regex if possible? No, a simple counter!

let depth = 0;
let endIndex = flex1InnerStart;
let i = flex1InnerStart;
while (i < file.length) {
    if (file.slice(i, i + 4) === '<div') {
        depth++;
    } else if (file.slice(i, i + 6) === '</div') {
        depth--;
        if (depth === 0) {
            endIndex = i + 6; // include the closing tag
            break;
        }
    }
    i++;
}

console.log('Found end index at:', endIndex);

const contentMiddle = file.slice(flex1InnerStart, endIndex);
const contentAfter = file.slice(endIndex);

const modifiedMiddle = `
          {activeTab === 'mencari' ? (
            <div className="w-full flex flex-col items-center pt-24 max-w-[680px]">
              {/* Lottie Animation (Logo) */}
              <div className="w-72 h-40 mb-8 flex items-center justify-center [&>div]:w-full [&>div]:h-full">
                <Lottie 
                  lottieRef={lottieRef}
                  animationData={animationData}
                  loop={false}
                  onComplete={handleAnimationComplete}
                />
              </div>

              {/* Google-style Search Box */}
              <div className="w-full bg-white dark:bg-[#242526] rounded-full shadow-[0_1px_6px_rgba(32,33,36,0.28)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.4)] dark:shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition-shadow duration-200 border border-transparent dark:border-[#3E4042] flex items-center px-4 py-3 min-h-[48px]">
                <svg className="w-5 h-5 text-gray-400 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Cari di Mencari atau ketik URL..."
                  className="w-full bg-transparent border-none outline-none ml-4 text-[16px] text-black dark:text-[#E4E6EB] placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                  autoFocus
                />
                <div className="flex items-center gap-3 shrink-0 mr-1">
                  <svg className="w-5 h-5 text-blue-500 cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a1 1 0 0 1 2 0 7 7 0 0 1-14 0 1 1 0 0 1 2 0 5 5 0 0 0 10 0zm-6 8v3h2v-3h-2z"/></svg>
                  <svg className="w-5 h-5 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </div>
              
              {/* Google-style Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Penelusuran Mencari
                </button>
                <button className="px-4 py-2 bg-[#F8F9FA] dark:bg-[#303134] hover:border-gray-300 dark:hover:border-gray-500 text-[#3C4043] dark:text-[#E8EAED] text-[14px] rounded border border-transparent transition-colors">
                  Saya Sedang Beruntung
                </button>
              </div>
            </div>
          ) : (
            <>
${contentMiddle}
            </>
          )}
`;

file = contentBefore + modifiedMiddle + contentAfter;
fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Applied precise state wrapper');
