
const fs = require('fs');
const path = require('path');

function rmrf(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.lstatSync(full);
    if (stat.isDirectory()) rmrf(full);
    else fs.unlinkSync(full);
  }
  fs.rmdirSync(dir);
}

rmrf(path.join(process.cwd(), '.next'));
console.log('.next removed');
