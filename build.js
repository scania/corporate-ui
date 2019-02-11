const fs = require('fs');
const path = require('path');

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

var walkDir = function(dir, done) {
  var globalCSS =[], // save global CSS
      componentCSS ={}, // save component css theme
      data = {}, // temporary container for file content
      cssContent=''; // temporary container for string addition
  fs.readdir(dir, function(err, list) {
    if (err) { return done(err);}

    var pending = list.length;
    if (!pending){ return done(null, data);}
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walkDir(file, function(err, dt) {
            for(var a in dt){
              var filename = path.parse(a).name;
              var brandName = path.basename(path.dirname(a));
              if(!isInArray(brandName, globalCSS)){
                globalCSS.push(brandName);
              }

              cssContent = '';
              cssContent += '\nconst '+ brandName +' = \`';
              cssContent += dt[a];
              cssContent += '\`\n';
              if(componentCSS[filename]) componentCSS[filename] += cssContent;
              else componentCSS[filename] = cssContent;
            }
            data[file] = dt;
            if (!--pending) done(null, data, globalCSS, componentCSS);
          });
        } else {
          fs.readFile(file, 'utf-8', function(err, content){
            if(err) console.log(err);
            data[file] = content;
            if (!--pending) done(null, data);
          })

        }
      });
    });
  });
};

const components = 'src/components/';
const themesFolder = 'src/themes/';
var counter = 0,
    addString = '';

fs.readdir(components, (err, files) => {
  if(err) console.log(err);
  files.forEach(file => {
    walkDir(themesFolder, function(err, data, globalCSS, componentCSS){
      console.log('============ checking ',file);
      if (err) console.log(err);
        for(var key in componentCSS){
          if(file===key){
            addString = '';
            addString += componentCSS[key] + 'export{';
            globalCSS.forEach(brand => {
              addString += brand + ',';
            })
            addString += '}';
            fs.writeFile('./src/components/'+file+'/style.ts', addString, 'utf8', (err) => {
                if (err) throw err;
                console.log('write file', file + '/style.ts');
            });
          } else if(key==='global' && counter!=1){
            addString = '';
            addString += componentCSS[key] + 'export{';
            globalCSS.forEach(brand => {
              addString += brand + ',';
            })
            addString += '}';
            fs.writeFile('./src/components/cui-theme/style.ts', addString, 'utf8', (err) => {
                if (err) throw err;
                console.log('write file cui-theme/style.ts');
            });
            counter++;
          }
        }

    })

  })
})
