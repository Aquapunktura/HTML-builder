const fs = require('fs/promises');

async function main() {
  const directory = await fs.readdir(__dirname);
  for (let i = 0; i < directory.length; i++) {
    const file = directory[i];
    const stat = await fs.stat(__dirname + '/' + file);

    if (stat.isFile()) {
      const strArr = file.split('.');

      let name = strArr[0];
      let fileType = strArr.at(-1);
      let size = stat.size + ' Byte';
      console.log(`${name} - ${fileType} - ${size}`);
    }
  }
}
main();
