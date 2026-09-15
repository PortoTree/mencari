const fs = require('fs');
let file = fs.readFileSync('src/app/beranda/page.tsx', 'utf8');

// Replace standard w-6 h-6 and w-7 h-7 with w-[115%] h-[115%] mt-3
file = file.replace(/<svg className="w-6 h-6 text-gray-500([^>]+)><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%] text-gray-500><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"');

file = file.replace(/<svg className="w-7 h-7 text-gray-500([^>]+)><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%] text-gray-500><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"');

// The one in the blue circle (w-10 h-10)
file = file.replace(/<svg className="w-10 h-10 text-blue-500([^>]+)><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%] text-blue-500><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"');

// The small one in New Message (w-5 h-5)
file = file.replace(/<svg className="w-5 h-5 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/g, 
  '<svg className="w-[115%] h-[115%] mt-[15%]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"');

fs.writeFileSync('src/app/beranda/page.tsx', file);
console.log('Fixed avatars');
