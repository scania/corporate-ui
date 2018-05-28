Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    scroll: {
      type: Boolean,
      value: false,
      observer: 'initScroll'
    }
  },
  attached: function() {
    this.style.display = 'block';

    var style = document.createElement('style');
    style.appendChild(document.createTextNode('body { display: flex; flex-direction: column; }'));
    document.head.insertBefore(style, document.head.lastChild);
  },
  initScroll: function(scroll) {
    if (scroll) {
      this.classList.add('scroll');
    } else {
      this.classList.remove('scroll');
    }
  }
});