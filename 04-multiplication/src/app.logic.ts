import { yarg } from "./config/plugins/args.plugin";
import fs from 'fs';

const { b:base, l:limit, s:showTable } = yarg;

let table = `
===========================
Tabla de multiplicar del ${base}
===========================\n`;
for (let i = 1; i <= limit; i++) {
  table += `${base} x ${i} = ${base * i}\n`;
}

if (showTable) console.log(table);
const outputPath = 'output';
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, table);
console.log("File created!");
