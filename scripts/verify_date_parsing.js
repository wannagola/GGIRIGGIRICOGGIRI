// Verification script for date parsing logic

const filenames = [
  '20260122_212719.jpg',
  '20260204.JPG',
  '1979121201.JPG',
  'invalid_file.jpg',
  '20250101_test.png'
];

filenames.forEach(filename => {
  // Logic to be implemented in component
  const match = filename.match(/^(\d{4})(\d{2})(\d{2})/);
  
  console.log(`Filename: ${filename}`);
  if (match) {
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    const formatted = `${year}년 ${month}월 ${day}일`;
    console.log(`  -> Parsed: ${formatted}`);
  } else {
    console.log(`  -> No date found, fallback required`);
  }
});
