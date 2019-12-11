(function(doc){
  var scriptElm = doc.scripts[doc.scripts.length - 1];

  var parentScript = doc.querySelectorAll('script');

  var parts = scriptElm.src.split('/');
  parts.pop();
  parts.push('corporate-ui');
  var url = parts.join('/');

  scriptElm = doc.createElement('script');
  scriptElm.src = url + '/corporate-ui.js';

  doc.head.insertBefore(scriptElm, parentScript[0]);

})(document);