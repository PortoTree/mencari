const fs = require('fs');

let todo = fs.readFileSync('TODO.md', 'utf8');

const conceptDocs = `
## Konsep Pencarian & Pendaftaran Website (Mencari.online)
- Sistem akan menggunakan **Slug/Username Custom** untuk pengguna yang mendaftar (Contoh: \`mencari.online/tokobudi\`).
- **Aturan URL Slug:**
  - Hanya boleh huruf kecil (\`a-z\`), angka (\`0-9\`), dan tanda strip (\`-\`) atau underscore (\`_\`).
  - Tidak boleh ada spasi atau karakter spesial (\`@, !, ?, .\`).
  - Maksimal panjang 30 karakter, minimal 3 karakter.
  - Harus diset sebagai UNIQUE di database (tidak boleh ada yang duplikat).
- **Reserved Words (Blacklist):**
  - Kata-kata seperti \`beranda, mencari, group, friend, chat, login, register, api, page\` dilarang digunakan oleh user agar tidak terjadi konflik dengan sistem routing Next.js.
- **Sisi Frontend:**
  - Ada halaman pendaftaran (misal \`/page\`) yang dapat diakses dari CTA "Is your website not in our search yet?".
  - User tipe 1 (Punya web): Mengisi form, ketika hasil pencarian di klik -> redirect ke web asli.
  - User tipe 2 (Belum punya web): Mengisi form, platform akan men-generate Mini Profile (Landing Page).
`;

if (!todo.includes('Konsep Pencarian & Pendaftaran')) {
  todo += '\n' + conceptDocs;
}

todo += '\n- (Frontend) Membangun halaman `/page` untuk pendaftaran website/profil bisnis';
todo += '\n- (Frontend) Menghubungkan CTA "Register for Free" di `/beranda` ke routing `/page`';

fs.writeFileSync('TODO.md', todo.trim());
console.log('TODO updated.');
