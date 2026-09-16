const fs = require('fs');

// Update translation files
const id = JSON.parse(fs.readFileSync('messages/id.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

id.feed = {
  ...id.feed,
  createPost: "Posting dan buat orang mencarimu",
  photo: "Foto",
  link: "Link",
  events: "Acara",
  more: "Lainnya",
  like: "Suka",
  comment: "Komentar",
  share: "Bagikan"
};

en.feed = {
  ...en.feed,
  createPost: "Post and let people find you",
  photo: "Photo",
  link: "Link",
  events: "Events",
  more: "More",
  like: "Like",
  comment: "Comment",
  share: "Share"
};

fs.writeFileSync('messages/id.json', JSON.stringify(id, null, 2));
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

// Patch beranda
let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

const replacements = [
  // Feed input placeholder
  ['"Posting dan buat orang mencarimu"', "t('feed.createPost')"],
  // Feed buttons
  ['                Foto\n', "                {t('feed.photo')}\n"],
  ['                Link\n', "                {t('feed.link')}\n"],
  ['                Acara\n', "                {t('feed.events')}\n"],
  ['                Lainnya\n', "                {t('feed.more')}\n"],
  // Post actions
  ['                 Like\n', "                 {t('feed.like')}\n"],
  ['                 Coment\n', "                 {t('feed.comment')}\n"],
  ['                 Share\n', "                 {t('feed.share')}\n"],
  // Placeholder search bar
  ['placeholder="Cari..."', "placeholder={t('nav.search')}"],
  // Pemberitahuan tooltip
  ['\n               Pemberitahuan\n', "\n               {t('nav.notifications')}\n"],
];

let count = 0;
for (const [from, to] of replacements) {
  if (file.includes(from)) {
    file = file.split(from).join(to);
    count++;
    console.log('✅', from.substring(0,50).trim());
  } else {
    console.log('⚠️  NOT FOUND:', from.substring(0,50).trim());
  }
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('\n✅ Done:', count, 'replacements');
