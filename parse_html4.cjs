const fs = require('fs');
const html = fs.readFileSync('/Users/rinat/Downloads/index.html', 'utf8');

// try to extract text from h1, h2, h3 tags
const hRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
const headings = [];
let match;
while ((match = hRegex.exec(html)) !== null) {
    // strip inner tags
    headings.push(match[1].replace(/<[^>]+>/g, '').trim());
}
console.log("=== HEADINGS ===");
console.log(headings.filter(h => h.length > 0).slice(0, 20).join('\n'));
