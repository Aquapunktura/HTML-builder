const fsPromise = require('fs/promises'),
  fs = require('fs'),
  readline = require('readline');

let userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openFile = fs.createWriteStream(`${__dirname}/text.txt`, {
  flags: 'a',
});

const main = async () => {
  let isEmpty = true;
  try {
    const stats = await fsPromise.stat(`${__dirname}/text.txt`);
    isEmpty = stats.size === 0;
  } catch (err) {
    console.log('create new');
  }

  while (true) {
    let inputStr = await ask();
    if (inputStr.toLocaleLowerCase() === 'exit') {
      break;
    }
    if (!isEmpty) {
      openFile.write('\n');
    }
    isEmpty = false;
    openFile.write(inputStr);
  }

  userInterface.close();
};

process.on('exit', () => {
  openFile.close();
  console.log('\nSee you next time');
});

function ask() {
  return new Promise((resolve) => {
    userInterface.question('Input text:', (text) => resolve(text));
  });
}

main();
