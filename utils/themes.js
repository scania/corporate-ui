const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

const components = 'src/components/';
const inputFolder = 'src/themes/';
const outputFolder = 'src/themes.built/';
const time = new Date();

export { generateTheme }


function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function walkDir(dir, done) {
  var globalCSS = []; // save global CSS
  var componentCSS = {}; // save component css theme
  var data = {}; // temporary container for file content
  var cssContent = ''; // temporary container for string addition

  fs.readdir(dir, function(err, list) {
    if (err) {
      return done(err);
    }

    var pending = list.length;
    if (!pending) {
      return done(null, data);
    }
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err2, stat) {
        if (stat && stat.isDirectory()) {
          walkDir(file, function(err3, dt) {
            for (const a of Object.keys(dt)) {
              var filename = path.parse(a).name;
              var brandName = path.basename(path.dirname(a));

              if (!isInArray(brandName, globalCSS)) {
                globalCSS.push(brandName);
              }

              cssContent = '';
              cssContent += '\nexport const ' + brandName + ' = `';
              cssContent += sass.renderSync({ data: dt[a] }).css;
              cssContent += '`;\n';

              if (componentCSS[filename]) {
                componentCSS[filename] += cssContent;
              } else {
                componentCSS[filename] = cssContent;
              }
            }
            data[file] = dt;
            if (!--pending) {
              done(null, data, globalCSS, componentCSS);
            }
          });
        } else {
          fs.readFile(file, 'utf-8', function(err4, content) {
            if (err4) {
              console.log(err4);
            }
            data[file] = content;
            if (!--pending) {
              done(null, data);
            }
          });
        }
      });
    });
  });
}

function generateTheme(callback=function(){}) {
  let counter = 0;
  let addString = '';

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  fs.readdir(components, (err, files) => {
    let index = 0;
    if (err) {
      console.log(err);
    }
    files.forEach(file => {
      walkDir(inputFolder, function(err2, data, globalCSS, componentCSS) {
        // console.log('============ checking ', file)
        if (err2) {
          console.log(err2);
        }
        for(var key in componentCSS) {
          if('c-' + file === key) {
            addString = '\n// Auto Generated Below\n';
            addString += componentCSS[key];

            fs.writeFile(
              outputFolder + key + '.ts',
              addString,
              'utf8',
              err3 => {
                if (err3) {
                  throw err3;
                }
                counter++;
                console.log('[' + time.getMinutes() + ':' + time.getSeconds() + ':' + time.getMilliseconds().toString()[0] + ']  Generated: themes.built/' + key + '.ts');
                if(counter === Object.keys(componentCSS).length) {
                  callback();
                }
              }
            );
          }
        }
      });
    });
  });
}