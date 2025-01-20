const fsPromises = require('fs/promises');
const fs = require('fs');

main();
async function main() {
  try {
    const bundleCSS = fs.createWriteStream(
      __dirname + '/project-dist/bundle.css',
    );
    try {
      const array = await fsPromises.readdir(__dirname + '/styles');

      for (let i = 0; i < array.length; i++) {
        const file = array[i];
        const stats = await fsPromises.stat(__dirname + '/styles/' + file);
        if (!stats.isFile()) return;
        const strArr = file.split('.');
        if (strArr.length < 2 || strArr.at(-1) !== 'css') return;
        let cssStr = await fsPromises.readFile(__dirname + '/styles/' + file, {
          encoding: 'utf8',
        });
        bundleCSS.write(`${cssStr}\n`);
      }
    } catch (error) {}
  } catch (error) {}
}
