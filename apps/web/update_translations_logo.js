const fs = require('fs');

const idFile = 'messages/id.json';
const enFile = 'messages/en.json';

const idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
const enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

idTrans.register.name_tooltip = 'Ini akan muncul pada tampilan pencarian user';
enTrans.register.name_tooltip = 'This will appear on the user search display';

idTrans.register.logo_label = 'Upload Logo';
enTrans.register.logo_label = 'Upload Logo';

idTrans.register.media_url_label = 'URL Media (Opsional)';
enTrans.register.media_url_label = 'Media URL (Optional)';

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));
console.log('Translations updated successfully');
