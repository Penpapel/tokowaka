const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'Images');
const outputFile = path.join(__dirname, 'manifest.json');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading Images folder:', err);
    return;
  }

  const imageFiles = files.filter(file =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  fs.writeFile(outputFile, JSON.stringify(imageFiles, null, 2), err => {
    if (err) {
      console.error('Error writing manifest.json:', err);
    } else {
      console.log(`✅ manifest.json generated with ${imageFiles.length} image(s).`);
    }
  });
});
