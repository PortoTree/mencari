const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/page/page.tsx', 'utf8');

code = code.replace(
  '{ displayName: "User", email: "user@example.com", photoURL: "/profil.jpg" }', 
  '{ displayName: "User", email: "user@example.com", photoURL: "/profil.jpg", username: "user" }'
);

code = code.replace('locale === "en"', 'String(locale) === "en"');

fs.writeFileSync('src/app/[locale]/page/page.tsx', code);
console.log('Fixed TS');
