const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// 1. Remove right sidebar history block
const rightSidebarStartStr = "{/* Right Sidebar: History (Mencari) */}";
const chatBubblesStr = "{/* Chat Bubbles (Always Rendered) */}";

const rsStart = file.indexOf(rightSidebarStartStr);
const rsEnd = file.indexOf(chatBubblesStr);
const rightSidebarFull = file.substring(rsStart, rsEnd);

const innerStartStr = '<div className="flex items-center justify-between mb-2 px-2">';
const innerStart = rightSidebarFull.indexOf(innerStartStr);
const innerEnd = rightSidebarFull.lastIndexOf('</div>', rightSidebarFull.lastIndexOf('</div>') - 1) + 6;
const historyInner = rightSidebarFull.substring(innerStart, innerEnd);

// Remove the right sidebar completely
file = file.replace(rightSidebarFull, '');

// 2. Insert the history block under the CTA
// The CTA ends precisely before the `) : (` of the `{activeTab === 'mencari' ? (...) : (...)}` ternary.
const ctaSearchStr = "Daftarkan Gratis";
const ctaIndex = file.indexOf(ctaSearchStr);
const buttonEnd = file.indexOf('</button>', ctaIndex) + 9;
const divEnd1 = file.indexOf('</div>', buttonEnd) + 6;
const divEnd2 = file.indexOf('</div>', divEnd1) + 6;

// divEnd2 should be the closing </div> of the CTA block.
const ctaClosing = file.substring(buttonEnd, divEnd2);
// Let's replace the closing of the CTA block with closing of CTA + our new history block
// But wait, the CTA and the History block both need to be wrapped in a Fragment because they are the truthy part of the ternary!
// `{activeTab === 'mencari' ? ( <> CTA... History... </> ) : ( ... )}`

// Let's find the start of the ternary
const profileCardStart = file.indexOf("{/* Profile Card / Bookmarks Area */}");
const ternaryStartStr = "{activeTab === 'mencari' ? (";
file = file.replace(
    "{/* Profile Card / Bookmarks Area */}\r\n            {activeTab === 'mencari' ? (\n              <div",
    "{/* Profile Card / Bookmarks Area */}\r\n            {activeTab === 'mencari' ? (\n              <>\n              <div"
);
file = file.replace(
    "{/* Profile Card / Bookmarks Area */}\n            {activeTab === 'mencari' ? (\n              <div",
    "{/* Profile Card / Bookmarks Area */}\n            {activeTab === 'mencari' ? (\n              <>\n              <div"
);

// Now insert history and closing Fragment before `) : (`
const ternaryElseStart = file.indexOf(") : (", profileCardStart);
const beforeElse = file.substring(0, ternaryElseStart);
const afterElse = file.substring(ternaryElseStart);

// We need to insert the history block at the end of `beforeElse`, then add `</>`
file = beforeElse + `\n                {/* History Block (Moved from Right) */}\n                <div className="mt-4">\n                  ${historyInner}\n                </div>\n              </>\n            ` + afterElse;

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('✅ Safely moved History block, take 2');
