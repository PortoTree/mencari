const fs = require('fs');

const idFile = 'messages/id.json';
const enFile = 'messages/en.json';

let idTrans = JSON.parse(fs.readFileSync(idFile, 'utf8'));
let enTrans = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Update ID
const idGroup = idTrans.group;
for (const key in idGroup) {
    if (typeof idGroup[key] === 'string') {
        idGroup[key] = idGroup[key].replace(/Grub/g, 'Komunitas').replace(/grub/g, 'komunitas').replace(/Grup/g, 'Komunitas').replace(/grup/g, 'komunitas');
    }
}

// Update EN
const enGroup = enTrans.group;
for (const key in enGroup) {
    if (typeof enGroup[key] === 'string') {
        enGroup[key] = enGroup[key].replace(/Groups/g, 'Communities').replace(/groups/g, 'communities').replace(/Group/g, 'Community').replace(/group/g, 'community');
    }
}

fs.writeFileSync(idFile, JSON.stringify(idTrans, null, 2));
fs.writeFileSync(enFile, JSON.stringify(enTrans, null, 2));

console.log('Updated translation files for Community/Komunitas.');
