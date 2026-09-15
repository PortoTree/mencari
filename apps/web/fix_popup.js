const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Add activeChatMenu close to existing outside click handler
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

// 2. Remove "Bisukan notifikasi" button entirely
const bisukan = `                            <button className="w-full flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] transition-colors text-left">
                              <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-black dark:text-[#E4E6EB] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="text-[14px] text-black dark:text-[#E4E6EB]">Bisukan notifikasi</span>
                              </div>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>`;
file = file.replace(bisukan, '');

// 3. Change "Lepas sematan chat" to "Sematkan obrolan"
file = file.replace('Lepas sematan chat', 'Sematkan obrolan');

fs.writeFileSync('src/app/beranda/page.tsx', file);

// Verify
if (file.includes('setActiveChatMenu(null);') && !file.includes('Bisukan notifikasi') && file.includes('Sematkan obrolan')) {
  console.log('All 3 changes applied successfully');
} else {
  console.log('Some changes may not have applied');
  console.log('Has close:', file.includes('chatMenuRef.current && !chatMenuRef.current'));
  console.log('No bisukan:', !file.includes('Bisukan notifikasi'));
  console.log('Has sematkan:', file.includes('Sematkan obrolan'));
}
