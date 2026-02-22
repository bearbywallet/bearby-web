const fs = require('fs');
const html = fs.readFileSync('/Users/rinat/Downloads/index.html', 'utf8');

const colorVarRegex = /--[\w-]+:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+);/g;
const colors = {};
let match;
while ((match = colorVarRegex.exec(html)) !== null) {
    if (match[1].startsWith('#') || match[1].startsWith('rgb')) {
        colors[match[0].split(':')[0]] = match[1];
    }
}
console.log(Object.entries(colors).map(([k,v]) => `${k}: ${v}`).join('\n'));

console.log("\n=== TEXT WITH DATA-FRAMER-NAME ===");
const namesRegex = /data-framer-name="([^"]+)"/g;
const names = new Set();
while ((match = namesRegex.exec(html)) !== null) {
    names.add(match[1]);
}
console.log(Array.from(names).slice(0, 40).join('\n'));
