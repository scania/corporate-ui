
const wv = require('webpackVariables');

window['examples'] = JSON.parse(wv.examples);
window['components'] = JSON.parse(wv.components);

// Demo for porsche
// if (typeof(jQuery) !== 'undefined') {
//   jQuery('body.porsche :not(script)').contents().filter(function() {
//     return this.nodeType === 3;
//   }).replaceWith(function() {
//     return this.nodeValue.replace('Scania', 'Porsche');
//   });
// }
