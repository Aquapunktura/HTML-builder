const { log } = require('console');
const fs = require('fs/promises');
async function main() {
  try {
    await fsp.mkdir(__dirname + '/files-copy/');
  } catch (error) {}
  await copy(__dirname + '/files/', __dirname + '/files-copy/');
  async function copy(from, to) {
    try {
      const dir = await fs.readdir(from);
      console.log(dir);

      for (let i = 0; i < dir.length; i++) {
        const file = dir[i];
        const stat = await fs.stat(from + file);

        if (stat.isDirectory()) {
          await fs.mkdir(to + file + '/');
          await copy(from + file + '/', to + file + '/');
        } else if (stat.isFile()) {
          try {
            await fs.copyFile(from + '/' + file, to + '/' + file);
          } catch (error) {
            console.log(`Error`, error);
          }
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  }
}
main();
