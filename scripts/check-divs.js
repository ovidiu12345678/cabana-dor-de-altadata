import fs from 'fs';
const path = 'E:/SITE PREZENTARE CABANA/index.jsx';
const source = fs.readFileSync(path, 'utf8');
const start = source.indexOf('function Foto()');
const end = source.indexOf('function VideoSection()');
console.log('start', start, 'end', end);
if (start === -1 || end === -1) {
  console.error('Could not find function boundaries');
  process.exit(1);
}
const block = source.slice(start, end);
const open = (block.match(/<div\b/g) || []).length;
const close = (block.match(/<\/div>/g) || []).length;
const outLines = [];
const blockLines = block.split(/\r?\n/);
blockLines.forEach((line, idx) => {
  if (line.includes('<div') || line.includes('</div>')) {
    outLines.push(`${idx + 1}: ${line}`);
  }
});
fs.writeFileSync('scripts/check-divs-output.txt', `start ${start} end ${end}\nopen div: ${open} close div: ${close}\n---\n${outLines.join('\n')}
`, 'utf8');
