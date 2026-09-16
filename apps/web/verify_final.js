const fs = require('fs');
const f = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');
const i = f.indexOf("feed.createPost");
console.log('feed.createPost found:', i > 0 ? 'YES at '+i : 'NO');
if(i>0) console.log('context:', JSON.stringify(f.slice(i-30,i+40)));

const id = JSON.parse(fs.readFileSync('messages/id.json','utf8'));
const en = JSON.parse(fs.readFileSync('messages/en.json','utf8'));
console.log('id createPost:', id.feed && id.feed.createPost);
console.log('en createPost:', en.feed && en.feed.createPost);
console.log('id chat.title:', id.chat && id.chat.title);
console.log('en chat.title:', en.chat && en.chat.title);
console.log('en nav.chat:', en.nav && en.nav.chat);
