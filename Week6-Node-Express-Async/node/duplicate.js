const fs = require('fs');

fs.readFile('test.txt', 'utf8', function(err, data) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  // loop to write file?
  for (let i = 1; i < 6; i++) {
    console.log(`Writing copy${i}`);
    fs.writeFile(`copy${i}.txt`, data, err => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log(`copy${i} finished`);
    });
  }
  //console.log(data);
});
