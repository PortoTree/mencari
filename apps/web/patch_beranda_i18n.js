const fs = require('fs');

// Baca dari source asli yang sudah ok
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// 1. Tambah import next-intl setelah baris pertama "use client"
file = file.replace(
  '"use client";\r\nimport { useState, useEffect, useRef } from "react";\r\nimport { useRouter } from "next/navigation";\r\nimport Image from "next/image";',
  '"use client";\nimport { useState, useEffect, useRef } from "react";\nimport { useRouter } from "next/navigation";\nimport Image from "next/image";\nimport { useTranslations, useLocale } from "next-intl";\nimport React from "react";'
);

// Fallback: jika CRLF tidak match, coba LF
if (!file.includes('useTranslations')) {
  file = file.replace(
    '"use client";',
    '"use client";\nimport { useTranslations, useLocale } from "next-intl";\nimport React from "react";'
  );
}

// 2. Tambah t = useTranslations() dan locale = useLocale() di dalam function Beranda
// Cari setelah "const router = useRouter();"
file = file.replace(
  'const router = useRouter();',
  'const router = useRouter();\n  const t = useTranslations();\n  const locale = useLocale();\n  console.log("[Beranda] locale:", locale);'
);

// 3. Tambah Language Switcher di header — cari vertical separator dan tambah switcher sebelumnya
const langSwitcher = `
          {/* Language Switcher */}
          <div className="relative group">
            <button
              onClick={() => {
                const newLocale = locale === 'id' ? 'en' : 'id';
                const currentPath = window.location.pathname;
                const pathWithoutLocale = currentPath.replace(/^\\/(id|en)/, '');
                window.location.href = '/' + newLocale + (pathWithoutLocale || '/beranda');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4E6EB] dark:bg-[#3A3B3C] hover:bg-[#D8D9DB] dark:hover:bg-[#4E4F50] transition-colors text-black dark:text-[#E4E6EB] text-[13px] font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
              {locale === 'id' ? 'ID' : 'EN'}
            </button>
          </div>
`;

// Sisipkan sebelum separator
file = file.replace(
  '          {/* Vertical Separator */}',
  langSwitcher + '\n          {/* Vertical Separator */}'
);

// 4. Ganti teks UI hardcoded pakai t()
// Chat panel title
file = file.replace(
  '>Obrolan<',
  ">{t('chat.title')}<"
);
// Tab Semua
file = file.replace(
  '>Semua<',
  ">{t('chat.all')}<"
);
// Tab Belum dibaca
file = file.replace(
  '>Belum dibaca<',
  ">{t('chat.unread')}<"
);
// Pesan baru panel
file = file.replace(
  '>Pesan baru<',
  ">{t('chat.newMessage')}<"
);
// Arsipkan chat
file = file.replace(
  '>Arsipkan chat<',
  ">{t('chat.archiveChat')}<"
);
// Sematkan obrolan
file = file.replace(
  '>Sematkan obrolan<',
  ">{t('chat.pinChat')}<"
);
// Tandai belum dibaca
file = file.replace(
  '>Tandai belum dibaca<',
  ">{t('chat.markUnread')}<"
);
// Tambah ke favorit
file = file.replace(
  '>Tambah ke favorit<',
  ">{t('chat.addFavorite')}<"
);
// Tambah ke daftar
file = file.replace(
  '>Tambah ke daftar<',
  ">{t('chat.addToList')}<"
);
// Blokir
file = file.replace(
  '>Blokir<',
  ">{t('chat.block')}<"
);
// Bersihkan obrolan
file = file.replace(
  '>Bersihkan obrolan<',
  ">{t('chat.clearChat')}<"
);
// Hapus obrolan
file = file.replace(
  '>Hapus obrolan<',
  ">{t('chat.deleteChat')}<"
);
// Aktif sekarang / Pengguna Aktif
file = file.replace(
  "'Aktif sekarang'",
  "t('chat.activeNow')"
);
file = file.replace(
  "'Pengguna Aktif'",
  "t('chat.activeUser')"
);

// Sidebar nav items
file = file.replace('>Beranda<', ">{t('tabs.home')}<");
file = file.replace('>Teman<', ">{t('tabs.friends')}<");
file = file.replace('>Grup<', ">{t('tabs.groups')}<");
file = file.replace('>Watch<', ">{t('tabs.watch')}<");

// Sidebar items
file = file.replace('>Kenangan<', ">{t('sidebar.memories')}<");
file = file.replace('>Tersimpan<', ">{t('sidebar.saved')}<");
file = file.replace('>Pasar<', ">{t('sidebar.marketplace')}<");
file = file.replace('>Acara<', ">{t('sidebar.events')}<");

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);

// Verifikasi
const result = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
console.log('useTranslations:', result.includes('useTranslations'));
console.log('useLocale:', result.includes('useLocale'));
console.log('Language switcher:', result.includes('Language Switcher'));
console.log('t(chat.title):', result.includes("t('chat.title')"));
console.log('Done');
