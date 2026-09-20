const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find the button with pemberitahuan.svg
let btnLine = -1;
for (let i = 670; i < 700; i++) {
  if (lines[i] && lines[i].includes('pemberitahuan.svg')) {
    btnLine = i;
    break;
  }
}

if (btnLine !== -1) {
  // Find the start of the button (goes up from btnLine to find <button)
  let btnStart = btnLine;
  while (!lines[btnStart].includes('<button') && btnStart > btnLine - 10) btnStart--;
  
  // Find the end of the button (</button>)
  let btnEnd = btnLine;
  while (!lines[btnEnd].includes('</button>') && btnEnd < btnLine + 10) btnEnd++;

  console.log('Button start:', btnStart + 1, lines[btnStart].trim());
  console.log('Button end:', btnEnd + 1, lines[btnEnd].trim());

  const newBtn = [
    `            <button`,
    `              ref={notifBtnRef}`,
    `              onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)}`,
    `              className={\`w-10 h-10 rounded-full flex items-center justify-center transition-colors overflow-hidden \${isNotifPanelOpen ? "bg-[#D8F0E2] dark:bg-[#203D2E]" : "bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A]"}\`}`,
    `            >`,
    `              <img`,
    `                src="/pemberitahuan.svg"`,
    `                alt={t("nav.notifications")}`,
    `                className="w-[22px] h-[22px] object-contain"`,
    `              />`,
    `            </button>`,
  ];

  lines.splice(btnStart, btnEnd - btnStart + 1, ...newBtn);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Button replaced');
} else {
  console.log('Button not found');
}
