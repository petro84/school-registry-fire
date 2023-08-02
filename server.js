const fs = require('fs');
const path = require('path');

const dir = '/src/environments';
const file = '/environment.ts';
const prodFile = '/environment.prod.ts'

const content = `${process.env.FIREBASE_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log('src does not exist, creating now...', process.cwd());

    fs.mkdir(path.resolve(path.join(__dirname, dir)), {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  try {
    fs.writeFileSync(path.resolve(path.join(__dirname, dir, file)), content);
    fs.writeFileSync(path.resolve(path.join(__dirname, dir, prodFile)), content);
    console.log('Created successfully in', process.cwd());
    if (fs.existsSync(dir + '/' + file)) {
      console.log('File is created', path.resolve(dir + '/' + file));
      const str = fs.readFileSync(dir + '/' + file).toString();
      console.log(str);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
