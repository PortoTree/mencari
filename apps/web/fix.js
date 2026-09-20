const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const lines = code.split('\n');

let startLine = -1;
let endLine = -1;

for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('shrink-0 overflow-hidden') && 
      lines[i+1] && lines[i+1].includes('<img') && 
      lines[i+2] && lines[i+2].includes('h-[60px]')) {
    startLine = i + 1;
    for (let j = i + 2; j < i + 50; j++) {
      if (lines[j] && lines[j].includes('</div>')) {
         if (lines[j+1] && lines[j+1].includes('gap-3') && 
             lines[j+2] && lines[j+2].includes('shrink-0 overflow-hidden')) {
           endLine = j;
           break;
         }
      }
    }
    break;
  }
}

console.log('Start:', startLine, 'End:', endLine);

if (startLine !== -1 && endLine !== -1) {
  const replacement = `                        <img src="/default-cover.jpg" alt="Group" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] leading-tight hover:underline cursor-pointer">Web Dev Indonesia</p>
                        <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8] mt-0.5">15.2K Member</p>
                      </div>`;
                      
  lines.splice(startLine, endLine - startLine + 1, ...replacement.split('\n'));
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', lines.join('\n'));
  console.log('Fixed');
}
