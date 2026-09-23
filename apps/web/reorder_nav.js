const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const temanBlock = `                <button
                  onClick={() => {
                    setActiveTab("friend");
                    window.history.pushState(null, "", \`/\${locale}/friend\`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors"
                >
                  <div
                    className="w-6 h-6 bg-current text-black dark:text-[#E4E6EB]"
                    style={{
                      WebkitMask:
                        "url(/navigasi/teman.svg) center/contain no-repeat",
                      mask: "url(/navigasi/teman.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.friends")}
                  </span>
                </button>`;

const tersimpanBlock = `                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("sidebar.saved")}
                  </span>
                </button>`;

const grupBlock = `                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition-colors">
                  <div
                    className="w-6 h-6 bg-current text-green-500"
                    style={{
                      WebkitMask:
                        "url(/navigasi/grub.svg) center/contain no-repeat",
                      mask: "url(/navigasi/grub.svg) center/contain no-repeat",
                    }}
                  />
                  <span className="font-semibold text-[15px] text-black dark:text-[#E4E6EB]">
                    {t("tabs.groups")}
                  </span>
                </button>`;

// Replace old order with new order
const oldSequence = temanBlock + '\n' + tersimpanBlock + '\n' + grupBlock;
const newSequence = grupBlock + '\n' + temanBlock + '\n' + tersimpanBlock;

if (code.includes(oldSequence)) {
  code = code.replace(oldSequence, newSequence);
  fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
  console.log('Successfully reordered navigation items.');
} else {
  console.log('Old sequence not found, trying line by line splice...');
  // As a fallback, maybe line endings are different (CRLF vs LF)
  const normalizedCode = code.replace(/\r\n/g, '\n');
  if (normalizedCode.includes(oldSequence)) {
    code = normalizedCode.replace(oldSequence, newSequence);
    fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
    console.log('Successfully reordered navigation items (LF fallback).');
  } else {
    console.log('Still not found. The blocks might have slight differences.');
  }
}
