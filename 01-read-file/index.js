const fs = require('fs');
const readline = require('readline');

try {
  const file = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/text.txt`),
    output: process.stdout,
    terminal: false
  });
  file.on('line', (line) => {
    console.log(line);
  });

} catch (error) {
  console.log(`Error!`);

}