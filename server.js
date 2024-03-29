const fs = require('fs');
const path = require('path');

const dir = '/src/environments';
const file = '/environment.ts';
const prodFile = '/environment.prod.ts'

const content = `${process.env.FIREBASE_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log('src does not exist, creating now...', process.cwd());

    fs.mkdir(path.resolve(path.join(process.cwd(), dir)), {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  try {
    fs.writeFile(path.resolve(path.join(process.cwd(), dir, file)), content, (err) => {
      console.log(err);
    });
    fs.writeFile(path.resolve(path.join(process.cwd(), dir, prodFile)), content, (err) => console.log(err));
    console.log('Created successfully in', process.cwd());
    if (fs.existsSync(dir + '/' + file)) {
      console.log('File is created', path.resolve(path.join(process.cwd(), dir, file)));
      const str = fs.readFileSync(path.resolve(path.join(process.cwd(), dir, file))).toString();
      console.log(str);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
