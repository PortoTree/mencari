const fs = require('fs');

let file = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Map: exact string in file -> replacement
const replacements = [
  ['          Foto\r\n              </button>', '          {t(\'feed.photo\')}\r\n              </button>'],
  ['          Acara\r\n              </button>', '          {t(\'feed.events\')}\r\n              </button>'],
  ['          Lainnya\r\n              </button>', '          {t(\'feed.more\')}\r\n              </button>'],
  ['          Like\r\n              </button>', '          {t(\'feed.like\')}\r\n              </button>'],
  ['          Coment\r\n              </button>', '          {t(\'feed.comment\')}\r\n              </button>'],
  ['          Share\r\n              </button>', '          {t(\'feed.share\')}\r\n              </button>'],
  ['          Pemberitahuan\n            </div>', '          {t(\'nav.notifications\')}\n            </div>'],
  // Search placeholder
  ['placeholder="Cari..."', "placeholder={t('nav.search')}"],
  ['placeholder={t(\'nav.search\')}', "placeholder={t('nav.search')}"], // idempotent guard
];

let count = 0;
// Remove duplicate
const seen = new Set();
for (const [from, to] of replacements) {
  if (seen.has(from)) continue;
  seen.add(from);
  if (file.includes(from)) {
    file = file.split(from).join(to);
    count++;
    console.log('✅', from.substring(0,50).trim());
  } else {
    console.log('⚠️  NOT FOUND:', JSON.stringify(from).substring(0,70));
  }
}

// Also fix "Link" button - it doesn't have CRLF issue, check separately
const linkPattern = '                 Link\r\n               </button>';
if (file.includes(linkPattern)) {
  file = file.split(linkPattern).join("                 {t('feed.link')}\r\n               </button>");
  count++;
  console.log('✅ Link button');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', file);
console.log('\n✅ Done:', count, 'replacements');
