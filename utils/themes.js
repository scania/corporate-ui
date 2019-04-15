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

function addScClass(contentCss, componentName, regex) {
  let matchRegex;
  let matchWord;
   // add .sc-componentName
   while ((matchRegex = regex.exec(contentCss)) !== null) {
    if (matchRegex.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    let replaceWord = []
    // change every selector separated with comma
    // example: .navbar, nav a => will match .navbar and nav
    let selectors = matchRegex[1].split(',')
    selectors.forEach(selector => {
      // only match the first selector (example: nav a, will only match nav)
      matchWord = selector.trim().split(' ')
      // if c-header it means it styles the host, then add .sc-c-header-h
      // if not, just add .sc-c-header
      let replaceWith = matchWord[0] + `.sc-${componentName}` + ( matchWord[0] == componentName ? '-h' : '' );
      selector = selector.replace(matchWord[0],replaceWith)
      replaceWord.push(selector)
    })
    replaceWord = replaceWord.join()
    contentCss = contentCss.replace(matchRegex[0], `${replaceWord} {`)
  }
  return contentCss
}

function IEStyle(css, componentName) {
  let matchSlot, mediaContent;
  const regex = /^([\.a-z].*)\{/gm;
  // regex  for all characters including spaces
  const slotRegex = /\:\:slotted\(([^)]+)\)/g;

  css = css.replace(/\:host/g, `${componentName}`)
  // change ::slotted to .sc-xxx-s
  while ((matchSlot = slotRegex.exec(css)) !== null) {
    if (matchSlot.index === slotRegex.lastIndex) {
      slotRegex.lastIndex++;
    }
    css = css.replace(matchSlot[0], `.sc-${componentName}-s ` + matchSlot[1]);
  }
  css = addScClass(css, componentName, regex);
  css = sass.renderSync({ data: css }).css;

  // for content inside media query we need to do the same process again
  const regexMedia = /^(?=.*(?:\r?\n(?!\r?).*)*?\@media).*(?:\r?\n(?!\r?\n).*)*/gm;
  while ((mediaContent = regexMedia.exec(css)) !== null) {
    let content = mediaContent[0].trim().split('\n')
    let mediaQueryCtn = content[0];
    content = content.slice(1,-1)
    content = content.join('\n')
    const regexFull = /^(\s*[\.a-z].*)\{/gm;
    let Newcontent = addScClass(content, componentName, regexFull)
    css += mediaQueryCtn + Newcontent + '}'
  }

  return css
}

function walkDir(dir, done) {
  var globalCSS = []; // save global CSS
  var componentCSS = {}; // save component css theme
  var data = {}; // temporary container for file content
  var cssContent = ''; // temporary container for string addition
  var cssIe = ''; // temporary container for string addition

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

              cssIe = IEStyle(dt[a], filename);

              cssContent = '';
              cssContent += '\nexport const ' + brandName + ' = `';
              cssContent += sass.renderSync({ data: dt[a] }).css;
              cssContent += '`;\n';
              cssContent += '\nexport const ' + brandName + '_ie = `';
              cssContent += cssIe;
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