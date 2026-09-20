const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

for (let i = 3540; i < 3580; i++) {
  if (lines[i] && lines[i].includes('<div className="flex items-start gap-2 max-w-[90%] group">')) {
    const injectLines = [
      '                {/* Tanggal Chat */}',
      '                <div className="flex justify-center my-3">',
      '                  <span className="bg-[#E5E5E5] dark:bg-[#242526] text-gray-600 dark:text-[#A8ABAF] px-2.5 py-0.5 rounded-lg text-[11px] font-medium shadow-sm">',
      '                    9/9/2026',
      '                  </span>',
      '                </div>',
      ''
    ];
    lines.splice(i, 0, ...injectLines);
    break;
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
console.log('Successfully injected date separator');
