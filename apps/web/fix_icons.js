const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Fix: Icon container - profil tetap hover only, tapi icon + permanent saat showAddIcons
// Currently: both icons are in one div with same opacity logic
// Need to: split them - profil always group-hover only, + conditional

// Current pattern (appears 2x for online and offline):
const oldIconWrapper = `className={\`flex items-center gap-1 transition-opacity shrink-0 \${showAddIcons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}\`}`;

const newIconWrapper = `className="flex items-center gap-1 shrink-0"`;

code = code.replaceAll(oldIconWrapper, newIconWrapper);

// 2. Fix: Separate profile icon (always hover-only) from + icon (conditional)
// Profile icon button wrapper - add opacity-0 group-hover:opacity-100 directly on the profile tooltip div
const oldProfileTooltipDiv = `<div className="relative group/tooltip">
                          <button
                            onClick={() => { setProfileViewIdx(realIdx); setActiveChatIdx(null); setIsCreatingGroup(false); }}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] flex items-center justify-center text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF] transition-colors"`;

const newProfileTooltipDiv = `<div className="relative group/tooltip opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setProfileViewIdx(realIdx); setActiveChatIdx(null); setIsCreatingGroup(false); }}
                            className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] flex items-center justify-center text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF] transition-colors"`;

code = code.replaceAll(oldProfileTooltipDiv, newProfileTooltipDiv);

// 3. Fix: + icon wrapper - permanent saat showAddIcons, hover-only saat tidak
const oldPlusTooltipDiv = `<div className="relative group/tooltip">
                          <button
                            onClick={() => setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx])}
                            className={\`w-8 h-8 rounded-full flex items-center justify-center transition-colors \${isAdded ? 'bg-[#00B47A] text-white' : 'bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF]'}\`}
                          >
                            {isAdded
                              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            }
                          </button>`;

const newPlusTooltipDiv = `<div className={\`relative group/tooltip transition-opacity \${showAddIcons ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}\`}>
                          <button
                            onClick={() => setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx])}
                            className={\`w-8 h-8 rounded-full flex items-center justify-center transition-colors \${isAdded ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-gray-200 dark:bg-[#3A3B3C] hover:bg-[#E7F3FF] dark:hover:bg-[#183966] text-gray-500 dark:text-[#B0B3B8] hover:text-[#1877F2] dark:hover:text-[#2D88FF]'}\`}
                          >
                            {isAdded
                              ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                              : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            }
                          </button>`;

code = code.replaceAll(oldPlusTooltipDiv, newPlusTooltipDiv);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Done!');
