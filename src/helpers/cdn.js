(function(doc) {
  var parentScript = doc.querySelectorAll('script');
  var arr = Array.prototype.slice.call(parentScript);
  var scriptElm = arr.filter(function(item) { return item.src.indexOf('dist/corporate-ui.js') > -1 })[0] || doc.scripts[doc.scripts.length - 1];

  var parts = scriptElm.src.split('/');
  parts.pop();
  parts.push('corporate-ui');
  var url = parts.join('/');

  scriptElm = doc.createElement('script');
  scriptElm.src = url + '/corporate-ui.js';

  doc.head.insertBefore(scriptElm, parentScript[0]);
})(document);