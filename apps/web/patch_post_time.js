const fs = require('fs');
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const formatPostTimeStr = `
function formatPostTime(timestamp: number, t: any, locale: string) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 5) {
    return t('time.justNow');
  } else if (hours < 1) {
    return t('time.minsAgo', { min: minutes });
  } else if (days < 1) {
    return t('time.hoursAgo', { hour: hours });
  } else if (days < 7) {
    return t('time.daysAgo', { day: days });
  } else {
    const d = new Date(timestamp);
    const day = d.getDate();
    const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(d);
    const year = d.getFullYear();
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return \`\${day} \${month} \${year} | \${h}.\${m}\`;
  }
}

`;

if (!file.includes('formatPostTime(')) {
  file = file.replace('const dummyChats = [', formatPostTimeStr + 'const dummyChats = [');
  console.log('✅ Added formatPostTime helper');
} else {
  console.log('⚠️ formatPostTime already exists');
}

// 2. Replace Pengguna's post block
const penggunaStart = `<div>
                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>
              </div>`;
const penggunaReplacement = `<div>
                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>
                <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{formatPostTime(Date.now() - 3 * 60000, t, locale)}</p>
              </div>`;

if (file.includes(penggunaStart)) {
  file = file.replace(penggunaStart, penggunaReplacement);
  console.log('✅ Updated Pengguna post');
} else {
  console.log('⚠️ Could not find Pengguna post block. Might be already replaced or regex mismatch.');
  // Trying relaxed match for windows CRLF
  const penggunaStartWindows = `<div>\r\n                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Pengguna</h3>\r\n              </div>`;
  if (file.includes(penggunaStartWindows)) {
    file = file.replace(penggunaStartWindows, penggunaReplacement);
    console.log('✅ Updated Pengguna post (CRLF)');
  }
}

// 3. Replace Naufal faiz's post block
const naufalStart = `<div>
                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>
                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">Web Development</p>
              </div>`;
const naufalReplacement = `<div>
                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>
                <div className="text-[13px] text-gray-500 dark:text-[#B0B3B8] flex items-center gap-1">
                  <span>Web Development</span>
                  <span>·</span>
                  <span>{formatPostTime(Date.now() - 2 * 3600000, t, locale)}</span>
                </div>
              </div>`;

if (file.includes(naufalStart)) {
  file = file.replace(naufalStart, naufalReplacement);
  console.log('✅ Updated Naufal post');
} else {
  console.log('⚠️ Could not find Naufal post block');
  const naufalStartWindows = `<div>\r\n                <h3 className="font-bold text-black dark:text-[#E4E6EB] text-[15px] leading-tight">Naufal faiz</h3>\r\n                <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8]">Web Development</p>\r\n              </div>`;
  if (file.includes(naufalStartWindows)) {
    file = file.replace(naufalStartWindows, naufalReplacement);
    console.log('✅ Updated Naufal post (CRLF)');
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
