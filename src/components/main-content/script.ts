Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  attached: function() {
    this.style.display = 'block';

    var style = document.createElement('style');
    style.appendChild(document.createTextNode('body { display: flex; flex-direction: column; }'));
    document.head.insertBefore(style, document.head.lastChild);

});