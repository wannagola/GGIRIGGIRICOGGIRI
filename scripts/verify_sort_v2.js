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
        
        if (dateB > dateA) return 1;
        if (dateB < dateA) return -1;
        return 0;
      });

    console.log('Total files found:', files.length);
    console.log('--- Top 5 (Newest) ---');
    files.slice(0, 5).forEach(f => console.log(f));
    console.log('--- Bottom 5 (Oldest) ---');
    files.slice(files.length - 5).forEach(f => console.log(f));
  }
} catch (error) {
  console.error(error);
}
