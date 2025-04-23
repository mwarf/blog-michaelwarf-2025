const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'src/content/blog/images');
const quality = 80; // JPG quality (0-100)

fs.readdir(imageDir, (err, files) => {
  if (err) {
    console.error('Error reading image directory:', err);
    return;
  }

  files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.png') {
      const inputPath = path.join(imageDir, file);
      const baseName = path.basename(file, '.png');
      const outputPath = path.join(imageDir, `${baseName}.jpg`);

      console.log(`Converting ${file} to ${baseName}.jpg...`);

      sharp(inputPath)
        .jpeg({ quality: quality })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error(`Error converting ${file}:`, err);
          } else {
            console.log(`Successfully converted ${file} to ${baseName}.jpg`, info);
            // Optional: Delete the original PNG after successful conversion
            // fs.unlink(inputPath, (unlinkErr) => {
            //   if (unlinkErr) {
            //     console.error(`Error deleting original file ${inputPath}:`, unlinkErr);
            //   } else {
            //     console.log(`Deleted original file: ${inputPath}`);
            //   }
            // });
          }
        });
    }
  });
});
