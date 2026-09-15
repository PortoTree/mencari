const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// =====================
// STEP 1: BASE CHANGES (do_all.js)
// =====================
// isDarkMode default true
file = file.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);/, 'const [isDarkMode, setIsDarkMode] = useState(true);');

// Sun icon
file = file.replace(/<svg className="w-\[20px\] h-\[20px\] text-black dark:text-\[#E4E6EB\]" fill="currentColor" viewBox="0 0 20 20">\s*<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-\.464 4\.95l\.707\.707a1 1 0 001\.414-1\.414l-\.707-\.707a1 1 0 00-1\.414 1\.414zm2\.12-10\.607a1 1 0 010 1\.414l-\.706\.707a1 1 0 11-1\.414-1\.414l\.707-\.707a1 1 0 011\.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5\.05 6\.464A1 1 0 106\.465 5\.05l-\.708-\.707a1 1 0 00-1\.414 1\.414l\.707\.707zm1\.414 8\.486l-\.707\.707a1 1 0 01-1\.414-1\.414l\.707-\.707a1 1 0 011\.414 1\.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" \/>\s*<\/svg>/,
'<svg className="w-[20px] h-[20px] text-black dark:text-[#E4E6EB]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18.75a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM6.166 18.894a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 10-1.06-1.061l-1.591 1.59zM4.5 12a.75.75 0 01-.75.75H1.5a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM6.166 5.106a.75.75 0 00-1.06 1.06l1.591 1.59a.75.75 0 101.06-1.061l-1.59-1.59z" /></svg>');

// Right Block nav icons
const oldRightBlockRegex = /\{\/\* Right: Icons & Avatar \*\/\}\s*<div className="flex items-center gap-2 relative">[\s\S]*?(?=<div className="relative ml-1" ref=\{dropdownRef\}>)/;
const newRightBlock = `{/* Right: Icons & Avatar */}
        <div className="flex items-center gap-2 relative">
          
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img src="/logo-chat.svg" alt="Chat" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Chat
            </div>
          </div>

          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] flex items-center justify-center text-black dark:text-[#E4E6EB] hover:bg-[#F3F2EF] dark:hover:bg-[#18191A] transition-colors overflow-hidden">
              <img src="/pemberitahuan.svg" alt="Pemberitahuan" className="w-[22px] h-[22px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Pemberitahuan
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#3E4042] mx-1"></div>

          {/* MENU ICON - NO CIRCLE */}
          <div className="relative group flex items-center justify-center mr-2 ml-1">
            <button className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
              <img src="/menu.svg" alt="Menu" className="w-[34px] h-[34px] object-contain" />
            </button>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-[60]">
              Menu
            </div>
          </div>
          
          `;
file = file.replace(oldRightBlockRegex, newRightBlock);

// Emerald branding
file = file.replace(/border-\[#0866FF\] text-\[#0866FF\]/g, 'border-emerald-500 text-emerald-500 dark:text-emerald-400 dark:border-emerald-400');
file = file.replace(/bg-\[#0866FF\]/g, 'bg-emerald-500');
file = file.replace(/bg-blue-100/g, 'bg-emerald-500');
file = file.replace(/text-blue-500/g, 'text-white');
file = file.replace(/text-blue-600 dark:text-blue-400/g, 'text-emerald-600 dark:text-emerald-400');
file = file.replace(/border-blue-600 dark:border-blue-400/g, 'border-emerald-600 dark:border-emerald-400');

// Fix Teman icon
file = file.replace(/<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth=\{2\} d="M12 4\.354a4 4 0 110 5\.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5\.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" \/><\/svg>/g,
'<svg className="w-6 h-6 text-black dark:text-[#E4E6EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>');

// Avatars
const newSvg = '<img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />';
file = file.replace(/<div className="w-10 h-10 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<button className="w-10 h-10 rounded-full hover:brightness-95 transition-all flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400 shrink-0">\n  ${newSvg}\n</button>`);
file = file.replace(/<div className="w-\[40px\] h-\[40px\] bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-gray-300 dark:border-\[#3E4042\]">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-full h-full bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-\[40px\] h-\[40px\] bg-gray-200 dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-\[#3A3B3C\] flex items-center justify-center overflow-hidden shrink-0">\s*<svg className="w-full h-full pt-1.5 text-gray-500 dark:text-\[#B0B3B8\]"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-8 h-8 rounded-full bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] flex items-center justify-center text-gray-500 dark:text-\[#B0B3B8\] shrink-0 overflow-hidden">\s*<svg className="w-full h-full pt-1.5"[^>]*>.*?<\/svg>\s*<\/div>/g,
`<div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-12 h-12 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center text-black dark:text-\[#E4E6EB\] font-bold text-\[18px\] shrink-0 overflow-hidden">\s*in\s*<\/div>/g,
`<div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n</div>`);
file = file.replace(/<div className="w-12 h-12 bg-\[#E4E6EB\] dark:bg-\[#3A3B3C\] rounded-full flex items-center justify-center text-black dark:text-\[#E4E6EB\] font-bold text-\[18px\] shrink-0 relative overflow-hidden">\s*S\s*<div className="absolute bottom-0 right-0 w-3 h-3 bg-\[#31A24C\] rounded-full border-2 border-white dark:border-\[#242526\]"><\/div>\s*<\/div>/g,
`<div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">\n  ${newSvg}\n  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>\n</div>`);

// =====================
// STEP 2: Add states for activeChatMenu BEFORE isDarkMode
// =====================
file = file.replace(
  'const [isDarkMode, setIsDarkMode] = useState(false);',
  'const [activeChatMenu, setActiveChatMenu] = useState<number | null>(null);\n    const [menuPosition, setMenuPosition] = useState<{top: number}>({ top: 0 });\n    const chatMenuRef = useRef<HTMLDivElement>(null);\n    const [isDarkMode, setIsDarkMode] = useState(true);'
);

// =====================
// STEP 3: Add chatMenuRef close to existing outside click handler
// =====================
file = file.replace(
  `      if (chatFilterRef.current && !chatFilterRef.current.contains(event.target as Node)) {
        setIsChatFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);`,
  `      if (chatFilterRef.current && !chatFilterRef.current.contains(event.target as Node)) {
        setIsChatFilterOpen(false);
      }
      if (chatMenuRef.current && !chatMenuRef.current.contains(event.target as Node)) {
        setActiveChatMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeChatMenu]);`
);

// =====================
// STEP 4: Dummy chats
// =====================
const dummyChatsArr = `
const dummyChats = [
  { name: "Budi Santoso", date: "1 Jun", msg: "Halo bro, apa kabar? Udah la...", isOnline: false },
  { name: "Siti Aminah", date: "Rab", msg: "Project kemarin gimana kelanjutannya?", isOnline: true },
  { name: "Agus Pratama", date: "Sel", msg: "Wkwk siap bro ntar malam ya", isOnline: true },
  { name: "Dewi Lestari", date: "Min", msg: "Oke, dokumennya udah aku kirim ke email.", isOnline: false },
  { name: "Andi Wijaya", date: "Sab", msg: "Jadi nongkrong nggak nih hari ini?", isOnline: true },
  { name: "Rina Kusuma", date: "Kam", msg: "Thanks ya buat bantuannya kemarin!", isOnline: false },
  { name: "Fajar Nugroho", date: "Rab", msg: "Jangan lupa meeting jam 2 siang bro.", isOnline: true },
  { name: "Maya Indah", date: "Sen", msg: "Sipp, nanti aku kabarin lagi.", isOnline: false },
  { name: "Reza Pahlevi", date: "Sen", msg: "Tugas bagian backend udah aman?", isOnline: true },
  { name: "Nina Marlina", date: "31 Mei", msg: "Wah mantap tuh idenya, boleh dicoba.", isOnline: false },
  { name: "Eko Susilo", date: "30 Mei", msg: "Kirim aja linknya kesini bro", isOnline: true },
  { name: "Fitri Yani", date: "29 Mei", msg: "Haha bener banget", isOnline: false },
];

export default function Beranda() {`;

file = file.replace('export default function Beranda() {', dummyChatsArr);

// =====================
// STEP 5: Replace chat list with hover menu version
// =====================
const oldChatList = `{/* Chat List */}
                 <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {/* Chat Item */}
                   <div className="flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">Budi Santoso</h4>
                            <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0">1 Jun</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">Halo bro, apa kabar? Udah la...</p>
                      </div>
                   </div>
                   
                    {/* Chat Item 2 */}
                    <div className="flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">Siti Aminah</h4>
                            <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0">Rab</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">Project kemarin gimana kelanjutannya?</p>
                      </div>
                   </div>
                 </div>`;

const newChatList = `{/* Chat List */}
                 <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {dummyChats.map((chat, idx) => (
                   <div key={idx} className="relative group flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">{chat.name}</h4>
                            <span className={"text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0 transition-opacity " + (activeChatMenu === idx ? 'opacity-0' : '')}>{chat.date}</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">{chat.msg}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect(); setMenuPosition({ top: rect.top }); setActiveChatMenu(activeChatMenu === idx ? null : idx); }}
                        className={"absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " + (activeChatMenu === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                        </svg>
                      </button>
                      {activeChatMenu === idx && (
                        <div ref={chatMenuRef} onClick={(e) => e.stopPropagation()} className="fixed z-[200] w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden" style={{right: '388px', top: Math.min(menuPosition.top, window.innerHeight - 480)}}>
                          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-[#3E4042]">
                            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                              <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">{chat.name}</p>
                              <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{chat.isOnline ? 'Aktif sekarang' : 'Pengguna Aktif'}</p>
                            </div>
                          </div>
                          <div className="py-1">
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Arsipkan chat</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Sematkan obrolan</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Tandai belum dibaca</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Tambah ke favorit</span>
                            </button>
                            <button className="w-full flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                                <span className="text-[14px] text-black dark:text-[#E4E6EB]">Tambah ke daftar</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <div className="border-t border-gray-100 dark:border-[#3E4042] my-1" />
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                              <span className="text-[14px] text-red-500">Blokir</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              <span className="text-[14px] text-red-500">Bersihkan obrolan</span>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              <span className="text-[14px] text-red-500">Hapus obrolan</span>
                            </button>
                          </div>
                        </div>
                      )}
                   </div>
                  ))}
                 </div>`;

file = file.replace(oldChatList, newChatList);

fs.writeFileSync('src/app/beranda/page.tsx', file);

// Verify
console.log('isDarkMode=true:', file.includes('useState(true)'));
console.log('activeChatMenu state:', file.includes('activeChatMenu'));
console.log('chatMenuRef check in useEffect:', file.includes('chatMenuRef.current && !chatMenuRef.current'));
console.log('dummyChats:', file.includes('dummyChats.map'));
console.log('fixed position panel:', file.includes("right: '388px'"));
console.log('No Bisukan:', !file.includes('Bisukan notifikasi'));
console.log('Has Sematkan:', file.includes('Sematkan obrolan'));
console.log('DONE');
