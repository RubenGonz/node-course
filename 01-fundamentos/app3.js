const fs = require('fs');

const content = fs.readFileSync("README.md", "utf-8");

const wordCount = content.split(" ").length;
const reactCount = content.match(/React/ig).length;

console.log(`Palabras: ${wordCount}`);
console.log(`Palabra React: ${reactCount}`);