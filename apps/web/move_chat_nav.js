const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

const newTab = `          <div
            onClick={() => {
              setActiveTab("chat");
              window.history.pushState(null, "", \`/\${locale}/obrolan\`);
            }}
            className={\`flex flex-col items-center justify-center w-[110px] h-full cursor-pointer transition-colors \${activeTab === "chat" ? "border-b-[3px] border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400 my-0 h-full rounded-none" : "border-b-[3px] border-transparent text-gray-500 dark:text-[#B0B3B8] hover:bg-gray-200 dark:hover:bg-[#3A3B3C] rounded-lg my-1"}\`}
          >
            <div
              className="w-7 h-7 bg-current"
              style={{
                WebkitMask: \`url(\${activeTab === "chat" ? "/navigasi/chat-aktif.svg" : "/navigasi/chat.svg"}) center/contain no-repeat\`,
                mask: \`url(\${activeTab === "chat" ? "/navigasi/chat-aktif.svg" : "/navigasi/chat.svg"}) center/contain no-repeat\`,
              }}
            />
            <span className="text-[11px] font-semibold mt-0.5">
              {t("nav.chat")}
            </span>
          </div>`;

let rightStart = -1;
let rightEnd = -1;
for (let i = 650; i < 700; i++) {
  if (lines[i].includes('setActiveTab(') && lines[i].includes('chat')) {
    rightStart = i - 2; 
    break;
  }
}
for (let i = rightStart; i < rightStart + 30; i++) {
  if (lines[i] && lines[i].includes('nav.chat')) {
    rightEnd = i + 2; 
    break;
  }
}

if (rightStart !== -1 && rightEnd !== -1) {
  lines.splice(rightStart, rightEnd - rightStart + 1);
}

let centerTabsEnd = -1;
for (let i = 560; i < 700; i++) {
  if (lines[i].includes('{/* Right: Icons & Avatar */}')) {
    centerTabsEnd = i - 2;
    break;
  }
}

if (centerTabsEnd !== -1) {
  const newTabLines = newTab.split('\n');
  lines.splice(centerTabsEnd, 0, ...newTabLines);
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Moved chat tab to center navbar');
