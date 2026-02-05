const fs = require('fs');
const path = require('path');

const picturesDir = path.join(process.cwd(), 'public', 'assets', 'pictures');

try {
  if (fs.existsSync(picturesDir)) {
    const files = fs.readdirSync(picturesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    console.log('--- Debugging Sort ---');
    
    // Sort logic
    files.sort((a, b) => {
        const dateA = a.substring(0, 8);
        const dateB = b.substring(0, 8);
        const comparison = dateB.localeCompare(dateA);
        
        // Debug specific pair if one of them is the problematic file
        if (a === '2026012547.jpg' && b.startsWith('1979')) {
             console.log(`Comparing ${a} (${dateA}) with ${b} (${dateB}): result ${comparison}`);
        }
        if (b === '2026012547.jpg' && a.startsWith('1979')) {
             console.log(`Comparing ${a} (${dateA}) with ${b} (${dateB}): result ${comparison}`);
        }

        return comparison;
      });

    console.log('--- Final List (First 50) ---');
    files.slice(0, 50).forEach(f => console.log(f));
    
    console.log('--- Final List (Last 5) ---');
    files.slice(files.length - 5).forEach(f => console.log(f));

  } else {
    console.log('Directory not found:', picturesDir);
  }
} catch (error) {
  console.error('Error:', error);
}
