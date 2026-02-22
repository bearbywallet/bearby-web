const fs = require('fs');
const html = fs.readFileSync('/Users/rinat/Downloads/index.html', 'utf8');

const colorVarRegex = /--[\w-]+:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/g;
const colors = {};
let match;
while ((match = colorVarRegex.exec(html)) !== null) {
    colors[match[0].split(':')[0]] = match[1];
}

console.log("=== COLOR TOKEN USAGE COUNT ===");
Object.entries(colors).forEach(([token, val]) => {
    // Count occurrences of this token
    const tokenRegex = new RegExp(`var\\(${token}\\)`, 'g');
    const matches = html.match(tokenRegex);
    const count = matches ? matches.length : 0;
    if (count > 0) {
        console.log(`${val} (${token}): ${count} usages`);
    }
});

