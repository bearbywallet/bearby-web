const fs = require('fs');
const html = fs.readFileSync('/Users/rinat/Downloads/index.html', 'utf8');

const colorVarRegex = /--[\w-]+:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/g;
const colors = {};
let match;
while ((match = colorVarRegex.exec(html)) !== null) {
    if(!colors[match[0].split(':')[0]]) {
        colors[match[0].split(':')[0]] = match[1];
    }
}
console.log(Object.entries(colors).map(([k,v]) => `${k}: ${v}`).join('\n'));
