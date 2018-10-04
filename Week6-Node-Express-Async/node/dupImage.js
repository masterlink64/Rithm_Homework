const fs = require('fs');

fs.readFile('image.jpg', function(err, data) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  // loop to write file?
  for (let i = 1; i < 6; i++) {
    console.log(`image copying copy${i}`);
    fs.writeFile(`copyImg${i}.jpg`, data, err => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log(`copyImg${i}.jpg finished`);
    });
  }
  //console.log(data);
});
