const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Remove the entire New Chat Panel block from left sidebar
// Find from "{/* New Chat Panel */}" to the closing of the panel </div>
const panelStart = code.indexOf('{/* New Chat Panel */}');
const panelEnd = code.indexOf('</div>\n             <div className="pt-4 px-4 border-b');
const panelEnd2 = code.indexOf('</div>\r\n             <div className="pt-4 px-4 border-b');
const panelEnd3 = code.indexOf('</div>\n            <div className="pt-4 px-4 border-b');
const panelEnd4 = code.indexOf('</div>\r\n            <div className="pt-4 px-4 border-b');

console.log('panelStart:', panelStart);
console.log('panelEnd (LF):', panelEnd);
console.log('panelEnd2 (CRLF):', panelEnd2);
console.log('panelEnd3:', panelEnd3);
console.log('panelEnd4:', panelEnd4);
