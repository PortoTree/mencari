const fs = require('fs');

// ===== UPDATE TRANSLATION FILES =====
const id = JSON.parse(fs.readFileSync('messages/id.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

const newId = {
  ...id,
  nav: {
    ...id.nav,
    notifications: "Pemberitahuan",
    info: "Informasi",
    search: "Cari..."
  },
  tabs: {
    ...id.tabs,
    groups: "Grup"
  },
  sidebar: {
    ...id.sidebar,
    viewProfile: "Lihat profil",
    groups: "Grup",
    friends: "Teman"
  },
  dropdown: {
    viewAllProfiles: "Lihat semua profil",
    settings: "Pengaturan & privasi",
    help: "Bantuan & dukungan",
    report: "Laporkan masalah",
    lightMode: "Tema terang",
    darkMode: "Tema gelap",
    logout: "Keluar"
  },
  feed: {
    createPost: "Apa yang Anda pikirkan?",
    photo: "Foto/Video",
    feeling: "Perasaan/aktivitas",
    liveVideo: "Video langsung",
    noPost: "Belum ada postingan"
  },
  filter: {
    favorite: "Favorit",
    groupChat: "Grub Chat",
    chatList: "Daftar Obrolan",
    archived: "Diarsipkan"
  }
};

const newEn = {
  ...en,
  nav: {
    ...en.nav,
    notifications: "Notifications",
    info: "Profile Info",
    search: "Search..."
  },
  tabs: {
    ...en.tabs,
    groups: "Groups"
  },
  sidebar: {
    ...en.sidebar,
    viewProfile: "View profile",
    groups: "Groups",
    friends: "Friends"
  },
  dropdown: {
    viewAllProfiles: "See all profiles",
    settings: "Settings & privacy",
    help: "Help & support",
    report: "Report a problem",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    logout: "Log out"
  },
  feed: {
    createPost: "What's on your mind?",
    photo: "Photo/Video",
    feeling: "Feeling/Activity",
    liveVideo: "Live video",
    noPost: "No posts yet"
  },
  filter: {
    favorite: "Favorites",
    groupChat: "Group Chat",
    chatList: "Chat List",
    archived: "Archived"
  }
};

fs.writeFileSync('messages/id.json', JSON.stringify(newId, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(newEn, null, 2));
console.log('✅ Translation files updated');

// ===== PATCH BERANDA PAGE =====
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacements = [
  // Nav tooltips
  ["'Pemberitahuan'", "t('nav.notifications')"],
  [">Pemberitahuan\n", ">{t('nav.notifications')}\n"],
  [">Informasi\r\n", ">{t('nav.info')}\r\n"],
  ['"Cari..."', '{t(\'nav.search\')}'],

  // Tabs
  [">Grub<", ">{t('tabs.groups')}<"],

  // Sidebar
  [">Lihat profil<", ">{t('sidebar.viewProfile')}<"],
  [">Teman<", ">{t('sidebar.friends')}<"],
  [">Grub<", ">{t('sidebar.groups')}<"],

  // Dropdown
  [">Lihat semua profil<", ">{t('dropdown.viewAllProfiles')}<"],
  [">Pengaturan & privasi<", ">{t('dropdown.settings')}<"],
  [">Bantuan & dukungan<", ">{t('dropdown.help')}<"],
  [">Laporkan masalah<", ">{t('dropdown.report')}<"],
  [">Keluar<", ">{t('dropdown.logout')}<"],
  ["'Tema terang'", "t('dropdown.lightMode')"],
  ["'Tema gelap'", "t('dropdown.darkMode')"],

  // Feed
  ['"Apa yang Anda pikirkan?"', "t('feed.createPost')"],
  ["'Apa yang Anda pikirkan?'", "t('feed.createPost')"],
  [">Foto/Video<", ">{t('feed.photo')}<"],
  [">Perasaan/aktivitas<", ">{t('feed.feeling')}<"],
  [">Video langsung<", ">{t('feed.liveVideo')}<"],

  // Filter dropdown
  [">Favorit<", ">{t('filter.favorite')}<"],
  [">Grub Chat<", ">{t('filter.groupChat')}<"],
  [">Daftar Obrolan<", ">{t('filter.chatList')}<"],
  [">Diarsipkan<", ">{t('filter.archived')}<"],
];

let patchCount = 0;
for (const [from, to] of replacements) {
  if (file.includes(from)) {
    file = file.split(from).join(to);
    patchCount++;
    console.log(`✅ Replaced: ${from.substring(0, 40)}...`);
  }
}

// Ke: label (chat new message panel)
file = file.replace(/>Ke:<\/span>/, ">{t('chat.to')}</span>");

// Placeholder search
file = file.replace(
  'placeholder="Cari..."',
  `placeholder={t('nav.search')}`
);

// alt="Pemberitahuan"
file = file.replace(
  'alt="Pemberitahuan"',
  `alt={t('nav.notifications')}`
);

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);

console.log(`\n✅ Total ${patchCount} replacements done`);
console.log('✅ Beranda patched successfully');
