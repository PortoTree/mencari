const fs = require('fs');

let code = fs.readFileSync('src/app/[locale]/home/page.tsx', 'utf8');

// 1. Komunitas
const komunitasRegex = /className="w-6 h-6 bg-current text-green-500"[\s\S]*?mask: "url\(\/navigasi\/komunitas\.svg\)/g;
code = code.replace(komunitasRegex, (match) => {
    return match.replace('text-green-500', 'text-blue-800 dark:text-blue-600')
                .replace(/url\(\/navigasi\/komunitas\.svg\)/g, 'url(/navigasi/komunitas-aktif.svg)');
});

// 2. Teman
const temanRegex = /mask: "url\(\/navigasi\/teman\.svg\)/g;
// Ensure we're replacing the correct one (sidebar)
// There's multiple teman.svg, let's just replace all `teman.svg` inside a mask style with `teman-aktif.svg`
// Wait, replacing all of them will affect the bottom mobile navbar too.
// That's fine, if they want "teman" to be "teman-aktif", it probably applies there too, but let's be safe.
// The sidebar one has `text-black dark:text-[#E4E6EB]`
const sidebarTemanRegex = /className="w-6 h-6 bg-current text-black dark:text-\[\#E4E6EB\]"[\s\S]*?mask: "url\(\/navigasi\/teman\.svg\)/g;
code = code.replace(sidebarTemanRegex, (match) => {
    return match.replace(/url\(\/navigasi\/teman\.svg\)/g, 'url(/navigasi/teman-aktif.svg)');
});


// 3. Simpan
const simpanSvgOld = `<svg
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
                  </svg>`;
const simpanSvgNew = `<svg
                    className="w-6 h-6 text-purple-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>`;
code = code.replace(simpanSvgOld, simpanSvgNew);
code = code.replace(simpanSvgOld.replace(/\n/g, '\r\n'), simpanSvgNew);


// 4. Acara
const acaraSvgOld = `<svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>`;
const acaraSvgNew = `<svg
                    className="w-6 h-6 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                  </svg>`;
code = code.replace(acaraSvgOld, acaraSvgNew);
code = code.replace(acaraSvgOld.replace(/\n/g, '\r\n'), acaraSvgNew);

fs.writeFileSync('src/app/[locale]/home/page.tsx', code);
console.log('Updated sidebar icons.');
