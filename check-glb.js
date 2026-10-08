const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'models', 'bottle.glb');
if (fs.existsSync(filePath)) {
  const buffer = fs.readFileSync(filePath);
  console.log("File exists, size:", buffer.length);
  const magic = buffer.toString('ascii', 0, 4);
  console.log("Magic bytes:", magic);
} else {
  console.log("File not found");
}
