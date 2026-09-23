const fs = require('fs');
let code = fs.readFileSync('src/app/[locale]/beranda/page.tsx', 'utf8');

// Inject the states
const stateSearch = '  const [productFilter, setProductFilter] = useState("all");';
const stateReplace = `  const [productFilter, setProductFilter] = useState("all");
  const [isProductSortOpen, setIsProductSortOpen] = useState(false);
  const [productSort, setProductSort] = useState("popular");`;

if (code.includes(stateSearch)) {
  code = code.replace(stateSearch, stateReplace);
  console.log('Successfully injected sort states.');
} else {
  console.log('Failed to find state injection point.');
}

fs.writeFileSync('src/app/[locale]/beranda/page.tsx', code);
