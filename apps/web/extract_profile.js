const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

// Find the profile info layout
let profileInfoLines = [];
let startExtract = -1;
for (let i = 5500; i < 5700; i++) {
  if (lines[i] && lines[i].includes('<div className="flex-1 overflow-y-auto sidebar-scrollbar p-4 flex flex-col items-center gap-4 overscroll-none">')) {
    startExtract = i;
  }
  if (startExtract !== -1 && i < startExtract + 120) {
    profileInfoLines.push(lines[i]);
    if (lines[i].includes('</div>') && lines[i-1] && lines[i-1].includes('</div>') && lines[i-2] && lines[i-2].includes('</div>') && lines[i-3] && lines[i-3].includes('</div>') && lines[i-4] && lines[i-4].includes('</div>') && lines[i-5] && lines[i-5].includes('</div>') && lines[i-6] && lines[i-6].includes('</div>')) {
        // Just rough heuristic to stop at the correct place. 
        // Actually, let's just copy lines 5541 to 5659 directly since we know the exact line numbers from earlier output (5541 to 5659).
    }
  }
}
// We know exact bounds from previous execution: 5541 is <div className="flex-1 overflow-y-auto sidebar-scrollbar p-4 flex flex-col items-center gap-4 overscroll-none">
// 5659 is </div> of that flex-1. Wait, let me just find it again programmatically to be safe.
