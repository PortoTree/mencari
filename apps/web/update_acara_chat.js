const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Replace Acara Icon
const acaraOld = `<svg
                    className="w-6 h-6 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>`;
const acaraNew = `<svg
                    className="w-6 h-6 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 8V6h14v2H5z" />
                  </svg>`;

code = code.replace(acaraOld, acaraNew);
code = code.replace(acaraOld.replace(/\n/g, '\r\n'), acaraNew);


// 2. Add Obrolan Navigation
const temanBlock = `                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.friends")}
                  </span>
                </button>`;

const chatBlock = `
                <button
                  onClick={() => {
                    setActiveTab("chat");
                    window.history.pushState(null, "", \`/\${locale}/obrolan\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <div
                    className="w-6 h-6 bg-current text-sky-400"
                    style={{
                      WebkitMask: "url(/navigasi/chat-aktif.svg) center/contain no-repeat",
                      mask: "url(/navigasi/chat-aktif.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("nav.chat")}
                  </span>
                </button>`;

// we want to add chatBlock after temanBlock in the sidebar.
// Note: temanBlock exists in the sidebar.
if (code.includes(temanBlock)) {
    code = code.replace(temanBlock, temanBlock + chatBlock);
} else {
    // try removing crlf
    const normCode = code.replace(/\r\n/g, '\n');
    const normTeman = temanBlock.replace(/\r\n/g, '\n');
    if (normCode.includes(normTeman)) {
        code = normCode.replace(normTeman, normTeman + chatBlock);
    } else {
        console.log("Could not find temanBlock.");
    }
}

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated Acara icon and added Obrolan.');
