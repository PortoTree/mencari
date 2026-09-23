const fs = require('fs');

const idFile = 'messages/id.json';
const enFile = 'messages/en.json';

let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.product.title = "Temukan produk digital dari berbagai platform";
enTrans.product.title = "Discover digital products from various platforms";

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

console.log('Translations updated successfully');
