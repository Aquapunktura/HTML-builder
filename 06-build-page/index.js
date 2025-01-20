const fsPromise = require('fs/promises');
const fs = require('fs');
main();
async function main() {
  console.log('Build html + css');
  await fsPromise.rm(__dirname + '/project-dist', {
    recursive: true,
    force: true,
  });
  await fsPromise.mkdir(__dirname + '/project-dist');

  const html = fs.createWriteStream(__dirname + '/project-dist/template.html');
  let templateFile = await fsPromise.readFile(__dirname + '/template.html', {
    encoding: 'utf8',
  });
  let headerFile = await fsPromise.readFile(
    __dirname + '/components/header.html',
    {
      encoding: 'utf8',
    },
  );
  templateFile = templateFile.replace('{{header}}', headerFile);

  let articlesFile = await fsPromise.readFile(
    __dirname + '/components/articles.html',
    {
      encoding: 'utf8',
    },
  );
  templateFile = templateFile.replace('{{articles}}', articlesFile);

  let footerFile = await fsPromise.readFile(
    __dirname + '/components/footer.html',
    {
      encoding: 'utf8',
    },
  );
  templateFile = templateFile.replace('{{footer}}', footerFile);

  html.write(templateFile);

  ///////////////////////////////////////////////////////////////////////////////
  try {
    await fsPromise.mkdir(__dirname + '/project-dist/');
  } catch (error) {}
  await copy(__dirname + '/assets/', __dirname + '/project-dist/');
  async function copy(from, to) {
    try {
      const dir = await fsPromise.readdir(from);

      for (let i = 0; i < dir.length; i++) {
        const file = dir[i];
        console.log(file);

        const stat = await fsPromise.stat(from + file);

        if (stat.isDirectory()) {
          await fsPromise.mkdir(to + file + '/');
          await copy(from + file + '/', to + file + '/');
        } else if (stat.isFile()) {
          try {
            await fsPromise.copyFile(from + '/' + file, to + '/' + file);
          } catch (error) {
            console.log(`Error`, error);
          }
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////
  await buildCSS();
  async function buildCSS() {
    try {
      const bundleCSS = fs.createWriteStream(
        __dirname + '/project-dist/bundle.css',
      );
      try {
        const array = await fsPromise.readdir(__dirname + '/styles');

        for (let i = 0; i < array.length; i++) {
          const file = array[i];
          const stats = await fsPromise.stat(__dirname + '/styles/' + file);
          if (!stats.isFile()) return;
          const strArr = file.split('.');
          if (strArr.length < 2 || strArr.at(-1) !== 'css') return;
          let cssStr = await fsPromise.readFile(__dirname + '/styles/' + file, {
            encoding: 'utf8',
          });
          bundleCSS.write(`${cssStr}\n`);
        }
      } catch (error) {}
    } catch (error) {}
  }
}
