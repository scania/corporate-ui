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
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-main-content', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Main content'  //categorizing events
      });
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
