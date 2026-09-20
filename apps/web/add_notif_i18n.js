const fs = require('fs');

const enPath = 'messages/en.json';
const idPath = 'messages/id.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const id = JSON.parse(fs.readFileSync(idPath, 'utf8'));

// Add notif keys to both files
en.notif = {
  title: "Notifications",
  all: "All",
  unread: "Unread",
  friendRequest: "{name} sent you a friend request.",
  likedPost: "{name} liked your post.",
  commented: "{name} commented on your post: \"{text}\"",
  groupInvite: "{name} invited you to join the group {group}.",
  mentioned: "{name} mentioned you in a comment.",
  confirm: "Confirm",
  delete: "Delete",
  minutesAgo: "{n} minutes ago",
  hoursAgo: "{n} hours ago",
  daysAgo: "{n} days ago",
  yesterday: "Yesterday",
};

id.notif = {
  title: "Pemberitahuan",
  all: "Semua",
  unread: "Belum Dibaca",
  friendRequest: "{name} mengirimkan permintaan pertemanan kepada kamu.",
  likedPost: "{name} menyukai postingan kamu.",
  commented: "{name} mengomentari postingan kamu: \"{text}\"",
  groupInvite: "{name} mengundangmu bergabung ke grup {group}.",
  mentioned: "{name} menyebutmu di sebuah komentar.",
  confirm: "Konfirmasi",
  delete: "Hapus",
  minutesAgo: "{n} menit yang lalu",
  hoursAgo: "{n} jam yang lalu",
  daysAgo: "{n} hari yang lalu",
  yesterday: "Kemarin",
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(idPath, JSON.stringify(id, null, 2));
console.log('Translation keys added');
