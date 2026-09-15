const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Add activeChatMenu state after isChatFilterOpen state
file = file.replace(
  'const [isChatFilterOpen, setIsChatFilterOpen] = useState(false);',
  'const [isChatFilterOpen, setIsChatFilterOpen] = useState(false);\n    const [activeChatMenu, setActiveChatMenu] = useState(null);\n    const chatMenuRef = useRef(null);'
);

// 2. Add useEffect to close chat menu on outside click - add after chatFilterRef declaration
file = file.replace(
  'const chatFilterRef = useRef(null);',
  `const chatFilterRef = useRef(null);
  
    useEffect(() => {
      function handleChatMenuOutside(e) {
        if (chatMenuRef.current && !chatMenuRef.current.contains(e.target)) {
          setActiveChatMenu(null);
        }
      }
      if (activeChatMenu !== null) {
        document.addEventListener('mousedown', handleChatMenuOutside);
      }
      return () => document.removeEventListener('mousedown', handleChatMenuOutside);
    }, [activeChatMenu]);`
);

// 3. Replace chat list item render with hover menu version
const oldChatMapStr = `{dummyChats.map((chat, idx) => (
                   <div key={idx} className="flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">{chat.name}</h4>
                            <span className="text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0">{chat.date}</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">{chat.msg}</p>
                      </div>
                   </div>
                  ))}`;

const newChatMapStr = `{dummyChats.map((chat, idx) => (
                   <div key={idx} className="relative group flex items-center gap-3 p-3 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] cursor-pointer transition-colors">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden border border-emerald-600 dark:border-emerald-400">
                        <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                        {chat.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#31A24C] rounded-full border-2 border-white dark:border-[#242526]"></div>
                        )}
                      </div>
                      {/* Text */}
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline">
                            <h4 className="font-semibold text-[14px] text-black dark:text-[#E4E6EB] truncate">{chat.name}</h4>
                            <span className={"text-[12px] text-gray-500 dark:text-[#B0B3B8] shrink-0 transition-opacity " + (activeChatMenu === idx ? 'opacity-0' : '')}>{chat.date}</span>
                         </div>
                         <p className="text-[13px] text-gray-500 dark:text-[#B0B3B8] truncate mt-0.5">{chat.msg}</p>
                      </div>
                      {/* Three dots button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveChatMenu(activeChatMenu === idx ? null : idx); }}
                        className={"absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#E4E6EB] dark:bg-[#4E4F50] flex items-center justify-center text-gray-600 dark:text-[#B0B3B8] hover:bg-[#D8D9DB] dark:hover:bg-[#5A5B5C] transition-all z-10 " + (activeChatMenu === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                        </svg>
                      </button>
                      {/* Dropdown Menu */}
                      {activeChatMenu === idx && (
                        <div ref={chatMenuRef} onClick={(e) => e.stopPropagation()} className="absolute z-[100] w-[260px] bg-white dark:bg-[#242526] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-gray-100 dark:border-[#3E4042] overflow-hidden" style={{right: '-268px', top: '0'}}>
                          {/* Profile Card */}
                          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-[#3E4042]">
                            <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden border border-emerald-600 dark:border-emerald-400">
                              <img src="/default-avatar.svg" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[14px] text-black dark:text-[#E4E6EB]">{chat.name}</p>
                              <p className="text-[12px] text-gray-500 dark:text-[#B0B3B8]">{chat.isOnline ? 'Aktif sekarang' : 'Pengguna Aktif'}</p>
                            </div>
                          </div>
                          {/* Menu Items */}
                          <div className="py-1">
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Arsipkan chat</span>
                            </button>
                            <button className="w-full flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="text-[14px] text-black dark:text-[#E4E6EB]">Bisukan notifikasi</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                              <span className="text-[14px] text-black dark:text-[#E4E6EB]">Lepas sematan chat</span>
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
                  ))}`;

file = file.replace(oldChatMapStr, newChatMapStr);

if (file.includes(newChatMapStr.substring(0, 80))) {
  console.log('Chat hover menu added successfully');
} else {
  console.log('Replacement may have failed');
}

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Done writing file');
