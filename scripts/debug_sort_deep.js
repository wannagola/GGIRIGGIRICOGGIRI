const fs = require('fs');
const path = require('path');

const picturesDir = path.join(process.cwd(), 'public', 'assets', 'pictures');

try {
  if (fs.existsSync(picturesDir)) {
    const files = fs.readdirSync(picturesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    console.log('--- Inspecting File Names (quoted) and Extracted Dates ---');
    
    const debugList = files.map(f => {
      const date = f.substring(0, 8);
      return {
        original: f,
        quoted: `"${f}"`,
        date: date,
        dateCode: date.charCodeAt(0) // Check first char code
      };
    });

    // Check specific problematic files
    const problem = debugList.find(x => x.original.includes('2026012544'));
    const ref = debugList.find(x => x.original.includes('19791212'));

    if (problem) console.log('Problem file:', problem);
    if (ref) console.log('Reference file:', ref);

    // Sort using the same logic
    debugList.sort((a, b) => {
      if (b.date > a.date) return 1;
      if (b.date < a.date) return -1;
      return 0;
    });

    console.log('--- Sorted List (Last 5) ---');
    debugList.slice(debugList.length - 5).forEach(x => console.log(`${x.date} : ${x.quoted}`));
    
    console.log('--- Sorted List (First 5) ---');
    debugList.slice(0, 5).forEach(x => console.log(`${x.date} : ${x.quoted}`));

  }
} catch (error) {
  console.error(error);
}
