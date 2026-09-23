const fs = require('fs');

const idFile = 'messages/id.json';
const enFile = 'messages/en.json';

let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.product.search_placeholder = "Cari produk atau kategori...";
idTrans.product.sort_placeholder = "Pilih filter";
idTrans.product.sort_popular = "Populer";
idTrans.product.sort_lowest_price = "Harga terendah";
idTrans.product.sort_highest_price = "Harga tertinggi";
idTrans.product.sort_highest_rating = "Rating tertinggi";

enTrans.product.search_placeholder = "Search products or categories...";
enTrans.product.sort_placeholder = "Select filter";
enTrans.product.sort_popular = "Popular";
enTrans.product.sort_lowest_price = "Lowest price";
enTrans.product.sort_highest_price = "Highest price";
enTrans.product.sort_highest_rating = "Highest rating";

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

console.log('Translations updated successfully');
