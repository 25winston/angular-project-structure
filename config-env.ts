import fs from 'fs';
import { argv } from 'yargs';

let targetPath = './src/environments/environment.ts';
let production = false;
let readenv = '.env';
if (argv.APP_ENV === 'production') {
  if (fs.existsSync('.env.production')) {
    readenv = '.env.production';
  } else if (fs.existsSync('.env.test')) {
    readenv = '.env.test';
  }
  targetPath = `./src/environments/environment.prod.ts`;
  production = true;
}
require('dotenv').config({ path: readenv });

let contentenv = '';
fs.readFile(readenv, 'utf8', function read(err, data) {
  if (err) {
    console.log('readFile:', err);
  }
  //---
  contentenv += `\tproduction: ${production},\n`;
  data &&
    data.split(/\r?\n/).forEach(function (dataline, index) {
      // console.log(index, dataline);
      if (dataline) {
        const dr = dataline.split('=');
        const key = String(dr[0]).trim();
        let value = String(dr[1])
          .replaceAll("'", '')
          .replaceAll('"', '')
          .trim();
        contentenv += `\t${key}: "${value}",\n`;
      }
    });
  //---

  const envContentFile = `
export const environment = {
${contentenv}};
`;

  fs.writeFile(targetPath, envContentFile, function (err) {
    if (err) {
      console.log('writeFile:', err);
    }
  });
});
