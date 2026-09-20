const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Floating chat replacement
let floatingFound = false;
for (let i = 3620; i < 3650; i++) {
  if (lines[i] && lines[i].includes('floatingChatMessage.trim().length > 0 ? (')) {
    const start = i;
    for (let j = i; j < i + 10; j++) {
      if (lines[j] && lines[j].includes(') : (')) {
        const end = j;
        const replaceStr = `              {floatingChatMessage.trim().length > 0 ? (
                <button className="flex items-center gap-1 bg-[#00B47A] hover:bg-[#009E6B] text-white px-2.5 py-1.5 rounded-full transition-colors font-bold text-[11px] shadow-sm shrink-0 ml-1">
                  {t("chat.send")}
                  <svg className="w-3.5 h-3.5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              ) : (`.split('\n');
        lines.splice(start, end - start + 1, ...replaceStr);
        floatingFound = true;
        break;
      }
    }
    break;
  }
}

// Main chat replacement
let mainFound = false;
for (let i = 5240; i < 5300; i++) {
  if (lines[i] && lines[i].includes('mainChatMessage.trim().length > 0 ? (')) {
    const start = i;
    for (let j = i; j < i + 10; j++) {
      if (lines[j] && lines[j].includes(') : (')) {
        const end = j;
        const replaceStr = `                {mainChatMessage.trim().length > 0 ? (
                  <button className="flex items-center gap-1.5 bg-[#00B47A] hover:bg-[#009E6B] text-white px-4 py-1.5 rounded-full transition-colors ml-1 font-bold text-[15px] shadow-sm shrink-0">
                    {t("chat.send")}
                    <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                ) : (`.split('\n');
        lines.splice(start, end - start + 1, ...replaceStr);
        mainFound = true;
        break;
      }
    }
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Floating:', floatingFound, 'Main:', mainFound);
