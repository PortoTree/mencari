const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// The floating chat bubble has z-50 - we need our sidebar at z-[60] and chat at z-[55] so sidebar wins
// But since right sidebar should cover it, just change the sidebar to z-[70]
// Already set to z-[60]. The chat is z-50 so z-[60] should already be higher. Let's verify our sidebar z-index
console.log('Sidebar z-60?', code.includes('translate-x-full"} z-[60]'));
console.log('Chat z-50?', code.includes('flex-col z-50'));

// sidebar is z-[60] (=60) and chat is z-50 (=50). So sidebar IS on top. 
// The issue may be the floating chat "Obrolan" bottom bar which may have a different z. Let's check right above the 'Obrolan' text
const idx = code.indexOf('"flex-col z-50');
console.log(code.substring(idx - 100, idx + 200));
