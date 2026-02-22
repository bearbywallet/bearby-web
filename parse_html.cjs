const fs = require('fs');
const html = fs.readFileSync('/Users/rinat/Downloads/index.html', 'utf8');

// 1. Extract CSS variables that look like colors
const colorVarRegex = /--[\w-]+:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+);/g;
const colors = {};
let match;
while ((match = colorVarRegex.exec(html)) !== null) {
    colors[match[0].split(':')[0]] = match[1];
}

// Extract background-color and color from inline styles or style tags
const bgRegex = /background-color:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/g;
const textRegex = /color:\s*(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8})/g;
const bgColors = new Set();
const textColors = new Set();

while ((match = bgRegex.exec(html)) !== null) bgColors.add(match[1]);
while ((match = textRegex.exec(html)) !== null) textColors.add(match[1]);

// 2. Extract font families
const fontRegex = /font-family:\s*([^;>}]+)/g;
const fonts = new Set();
while ((match = fontRegex.exec(html)) !== null) {
    fonts.add(match[1].replace(/"/g, '').replace(/'/g, '').trim());
}

// 3. Extract sections (look for <section>, <header>, <footer>, or major <div> classes)
// Simple regex to get tags with classes
const sectionRegex = /<(section|header|footer|nav|main|div[^>]*id="[^"]*"[^>]*|div[^>]*class="[^"]*section[^"]*"[^>]*)>/gi;
const sections = [];
while ((match = sectionRegex.exec(html)) !== null) {
    // Just get the tag and its class/id
    const tagMatch = match[0].match(/<([a-z]+)[^>]*(class="[^"]*"|id="[^"]*")?[^>]*>/i);
    if (tagMatch) {
        sections.push(tagMatch[0].substring(0, 100) + '...');
    }
}

console.log("=== COLOR VARIABLES ===");
console.log(Object.keys(colors).slice(0, 20).map(k => `${k}: ${colors[k]}`).join('\n'));
console.log("Found", Object.keys(colors).length, "color variables total.");

console.log("\n=== BACKGROUND COLORS ===");
console.log(Array.from(bgColors).slice(0, 15).join('\n'));

console.log("\n=== TEXT COLORS ===");
console.log(Array.from(textColors).slice(0, 15).join('\n'));

console.log("\n=== FONTS ===");
console.log(Array.from(fonts).join('\n'));

console.log("\n=== SECTIONS (Sample) ===");
console.log(sections.slice(0, 20).join('\n'));
