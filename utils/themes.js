const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

const components = 'src/components/';
const inputFolder = 'src/themes/';
const outputFolder = 'src/themes.built/';
const time = new Date();

export { generateTheme };


function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function walkDir(dir, done) {
  const globalCSS = []; // save global CSS
  const componentCSS = {}; // save component css theme
  const data = {}; // temporary container for file content
  let cssContent = ''; // temporary container for string addition

  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err);
    }

    let pending = list.length;
    if (!pending) {
      return done(null, data);
    }
    list.forEach((file) => {
      file = path.resolve(dir, file);
      fs.stat(file, (err2, stat) => {
        if (stat && stat.isDirectory()) {
          walkDir(file, (err3, dt) => {
            pending -= 1;
            for (const a of Object.keys(dt)) {
              const filename = path.parse(a).name;
              const brandName = path.basename(path.dirname(a));

              if (!isInArray(brandName, globalCSS)) {
                globalCSS.push(brandName);
              }

              cssContent = '';
              cssContent += `\nexport const ${brandName} = \``;
              cssContent += sass.renderSync({ data: dt[a] }).css;
              cssContent += '`;\n';

              if (componentCSS[filename]) {
                componentCSS[filename] += cssContent;
              } else {
                componentCSS[filename] = cssContent;
              }
            }
            data[file] = dt;
            if (!pending) {
              done(null, data, globalCSS, componentCSS);
            }
          });
        } else {
          fs.readFile(file, 'utf-8', (err4, content) => {
            pending -= 1;
            if (err4) {
              console.log(err4);
            }
            data[file] = content;
            if (!pending) {
              done(null, data);
            }
          });
        }
      });
    });
  });
}

function generateTheme(callback = function () {}) {
  let counter = 0;
  let addString = '';

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  fs.readdir(components, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach(file => {
      walkDir(inputFolder, (err2, data, globalCSS, componentCSS) => {
        // console.log('============ checking ', file)
        if (err2) {
          console.log(err2);
        }
        for (const key in componentCSS) {
          if (`c-${file}` === key) {
            addString = '\n// Auto Generated Below\n';
            addString += componentCSS[key];

            fs.writeFile(
              `${outputFolder + key}.ts`,
              addString,
              'utf8',
              err3 => {
                if (err3) {
                  throw err3;
                }
                counter += 1;
                console.log(`[${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds().toString()[0]}]  Generated: themes.built/${key}.ts`);
                if (counter === Object.keys(componentCSS).length) {
                  callback();
                }
              },
            );
          }
        }
      });
    });
  });
}
