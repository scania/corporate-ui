import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import builtins from 'rollup-plugin-node-builtins';

const fs = require('fs');
const path = require('path');

const components = 'src/components/';
const themesFolder = 'src/themes/';
var tree = [];
var cssData = '';
var filepath = '';

var readFile = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) { return done(err);}

    var pending = list.length;
    if (!pending){ return done(null, results);}
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          readFile(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};
var cssDataObj = {},
    brandName;

readFile('./src/themes/', function(err, results) {
  if (err) throw err;
  results.forEach(result => {

    fs.readdir(components, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if(path.parse(result).name === file){
          fs.readFile(result, "utf8", (err, data) => {
            if (err) throw err;
            brandName = path.basename(path.dirname(result));
            cssData='';
            cssData += '\n:host(.'+ brandName +'){\n';
            cssData += data;
            cssData += '\n}\n';
            if(cssDataObj[file]) {cssDataObj[file] += cssData;} else {
              cssDataObj[file] = cssData;
            }
            // console.log(cssDataObj);
            fs.writeFile('./src/components/'+file+'/theme.scss', cssDataObj[file], 'utf8', (err) => {
                if (err) throw err;
                console.log('wrote file', file);
            });
          });
        }
      })
    })
  })

});

export const config: Config = {
  namespace: 'corporate-ui',
  hashFileNames: false,
  outputTargets:[
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  /*bundles: [
    {
      components: ['cui-theme', 'cui-header', 'cui-footer', 'cui-content', 'cui-navigation'],
    },
    {
      components: ['cui-list'],
    },
    {
      components: ['user-tags']
    }
  ],*/
  copy: [
    { src: 'themes'},
    { src: 'demo' }
  ],
  testing: {
    testPathIgnorePatterns: ['/node_modules/', '/projects/']
  },
  plugins: [
    builtins({fs: true}),
    sass({
      includePaths: ['node_modules']
    })
  ]
};
