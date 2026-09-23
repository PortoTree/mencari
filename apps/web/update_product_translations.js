const fs = require('fs');

const idFile = 'messages/id.json';
const enFile = 'messages/en.json';

let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.product = {
  "title": "Produk Digital",
  "search_placeholder": "Cari produk digital...",
  "filter_all": "Semua",
  "badge_new": "Baru",
  "sold": "Terjual"
};

enTrans.product = {
  "title": "Digital Products",
  "search_placeholder": "Search digital products...",
  "filter_all": "All",
  "badge_new": "New",
  "sold": "Sold"
};

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

console.log('Translations updated successfully');
