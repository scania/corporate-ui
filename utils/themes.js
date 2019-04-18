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
      let startWith = new RegExp('^' + componentName).test(matchWord[0])
      let replaceWith = matchWord[0] + `.sc-${componentName}` + ( startWith ? '-h' : '' );
      selector = selector.replace(matchWord[0],replaceWith)
      replaceWord.push(selector)
    })
    replaceWord = replaceWord.join()
    contentCss = contentCss.replace(matchRegex[0], `${replaceWord} {`)
  }
  return contentCss
}

function IEStyle(css, componentName) {
  let matchSlot, mediaContent, matchHost;
  const regex = /^([\.a-z].*)\{/gm;
  // regex  for all characters including spaces
  const slotRegex = /\:\:slotted\(([^)]+)\)/g;

  let hostRegex = /\:host(\s* |\(([^)]+)\))/g;
  while ((matchHost = hostRegex.exec(css)) !== null) {
    if (matchHost.index === hostRegex.lastIndex) {
      hostRegex.lastIndex++;
    }
    let hostText = matchHost[2] ? componentName + matchHost[2] : componentName;
    css = css.replace(matchHost[0], hostText);
  }

  // change ::slotted to .sc-xxx-s
  while ((matchSlot = slotRegex.exec(css)) !== null) {
    if (matchSlot.index === slotRegex.lastIndex) {
      slotRegex.lastIndex++;
    }
    css = css.replace(matchSlot[0], `.sc-${componentName}-s ` + matchSlot[1]);
  }
  css = addScClass(css, componentName, regex);

  // for content inside media query we need to do the same process again
  const regexMedia = /^(@media|@supports)(.*){[\r\n]([\S\n\r\s]+?)(^})/gm;
  mediaContent = css.match(regexMedia);

  while ((mediaContent = regexMedia.exec(css)) !== null) {
    if (mediaContent.index === regexMedia.lastIndex) {
      regexMedia.lastIndex++;
    }

    let content = mediaContent[3].trim()
    const regexFull = /^(\s*[\.a-z].*)\{/gm;
    let Newcontent = addScClass(content, componentName, regexFull)
    let text = `\n${mediaContent[1] + mediaContent[2]} {\n ${Newcontent}\n }\n`  
    css = css.replace(mediaContent[0], text)
  }

  css = sass.renderSync({ data: css }).css;

  return css
}

function walkDir(dir, done) {
  const globalCSS = []; // save global CSS
  const componentCSS = {}; // save component css theme
  const data = {}; // temporary container for file content
  let cssContent = ''; // temporary container for string addition
  var cssIe = ''; // temporary container for string addition

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

              cssIe = IEStyle(dt[a], filename);

              cssContent = '';
              cssContent += `\nexport const ${brandName} = \``;
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