const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Add onClick to Online Row
code = code.replaceAll(
  "key={'online-'+idx}",
  "key={'online-'+idx}\n                      onClick={() => { setActiveChatIdx(realIdx); setProfileViewIdx(null); setIsCreatingGroup(false); setSelectedNewChatUsers([]); }}"
);

// 2. Add onClick to Offline Row
code = code.replaceAll(
  "key={'offline-'+idx}",
  "key={'offline-'+idx}\n                      onClick={() => { setActiveChatIdx(realIdx); setProfileViewIdx(null); setIsCreatingGroup(false); setSelectedNewChatUsers([]); }}"
);

// 3. Stop Propagation on Profile Button (to avoid triggering the row click)
code = code.replaceAll(
  "onClick={() => { setProfileViewIdx(realIdx); setActiveChatIdx(null); setIsCreatingGroup(false); }}",
  "onClick={(e) => { e.stopPropagation(); setProfileViewIdx(realIdx); setActiveChatIdx(null); setIsCreatingGroup(false); }}"
);

// 4. Stop Propagation on Add Button
code = code.replaceAll(
  "onClick={() => setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx])}",
  "onClick={(e) => { e.stopPropagation(); setSelectedFriendsToAdd(prev => isAdded ? prev.filter(i => i !== realIdx) : [...prev, realIdx]); }}"
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
console.log('Row clicks added and propagation stopped on buttons!');
