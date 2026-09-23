const fs = require('fs');
let todo = fs.readFileSync('TODO.md', 'utf8');
if (!todo.includes('dropdown searchbox mencari')) {
  todo += '\n- (Frontend) Mengubah perilaku tombol Mencari di navbar kanan menjadi dropdown searchbox, dengan tombol visit/panah untuk masuk ke halaman /mencari (serta mengubah tooltipnya menjadi "Mencari")';
  fs.writeFileSync('TODO.md', todo.trim());
}
