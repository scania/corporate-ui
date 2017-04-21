$('body.porsche :not(script)').contents().filter(function() {
    return this.nodeType === 3;
  }).replaceWith(function() {
      return this.nodeValue.replace('Scania', 'Porsche');
});

// Triggers when corporate-ui has finnised loading
document.addEventListener('corporate-ui.loaded', function(e) {

  document.body.className += ' done-loading';

}, false);