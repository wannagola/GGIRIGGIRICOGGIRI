const fs = require('fs');
const path = require('path');

const picturesDir = path.join(process.cwd(), 'public', 'assets', 'pictures');

try {
  if (fs.existsSync(picturesDir)) {
    const files = fs.readdirSync(picturesDir)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort((a, b) => {
        const dateA = a.substring(0, 8);
        const dateB = b.substring(0, 8);
        return dateB.localeCompare(dateA);
      });

    console.log('Total files found:', files.length);
    console.log('--- All Files Sorted (Newest First) ---');
    files.forEach(f => console.log(f));
  } else {
    console.log('Directory not found:', picturesDir);
  }
} catch (error) {
  console.error('Error:', error);
}
