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
  let matchRegex = regex.exec(contentCss);
  let matchWord;
  // add .sc-componentName
  while (matchRegex != null) {
    let replaceWord = [];
    // change every selector separated with comma
    // example: .navbar, nav a => will match .navbar and nav
    const selectors = matchRegex[1].split(',');
    selectors.forEach(selector => {
      // only match the first selector (example: nav a, will only match nav)
      matchWord = selector.trim().split(' ');
      // if c-header it means it styles the host, then add .sc-c-header-h
      // if not, just add .sc-c-header
      const startWith = new RegExp(`^${componentName}`).test(matchWord[0]);
      const replaceWith = `${matchWord[0]}.sc-${componentName}${startWith ? '-h' : ''}`;
      selector = selector.replace(matchWord[0], replaceWith);
      replaceWord.push(selector);
    });
    replaceWord = replaceWord.join();
    // const re = new RegExp(/`^${matchRegex[0]}`/, 'g');
    // There is a bug in this replace when using a word contining another tags
    // name in combination with a "{". For example: "i {" will replace "li {".
    // In case this is a sass var the build will fail making the issue visible.
    // For example: "p {" will replace "$map {" making the sass compilation fail.
    contentCss = contentCss.replace(matchRegex[0], `${replaceWord} {`);
    matchRegex = regex.exec(contentCss);
  }
  return contentCss;
}

function IEStyle(css, componentName) {
  const regex = new RegExp(/^([\.a-z].*)\{/, 'gm');
  // regex  for all characters including spaces
  const slotRegex = new RegExp(/\:\:slotted\(([^)]+)\)/, 'g');

  const hostRegex = new RegExp(/\:host(\s* |\(([^)]+)\))/, 'g');
  let matchHost = hostRegex.exec(css);
  while (matchHost != null) {
    const hostText = matchHost[2] ? componentName + matchHost[2] : componentName;
    css = css.replace(matchHost[0], hostText);
    matchHost = hostRegex.exec(css);
  }
  let matchSlot = slotRegex.exec(css);
  // change ::slotted to .sc-xxx-s
  while (matchSlot != null) {
    css = css.replace(matchSlot[0], `.sc-${componentName}-s ${matchSlot[1]}`);
    matchSlot = slotRegex.exec(css);
  }

  // add .sc-xxx
  css = addScClass(css, componentName, regex);

  // for content inside media query we need to do the same process again
  const regexMedia = new RegExp(/^(@media|@supports)(.*){[\r\n]([\S\n\r\s]+?)(^})/, 'gm');
  let mediaContent = regexMedia.exec(css);

  while (mediaContent != null) {
    const content = mediaContent[3].trim();
    const regexFull = new RegExp(/^(\s*[\.a-z].*)\{/, 'gm');
    const Newcontent = addScClass(content, componentName, regexFull);
    const text = `\n${mediaContent[1] + mediaContent[2]} {\n ${Newcontent}\n }\n`;
    css = css.replace(mediaContent[0], text);
    mediaContent = regexMedia.exec(css);
  }

  css = sass.renderSync({ data: css }).css;

  return css;
}

function walkDir(dir, done) {
  const globalCSS = []; // save global CSS
  const componentCSS = {}; // save component css theme
  const data = {}; // temporary container for file content
  let cssContent = ''; // temporary container for string addition
  let cssIe = ''; // temporary container for string addition

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
              cssContent += `\nexport const ${brandName}_ie = \``;
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
