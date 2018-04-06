Polymer({
  is: name,
  properties: {
    siteName: String,
    variation: 0,
    siteUrl: {
      type: String,
      value: '/'
    },
    fullbleed: {
      type: Boolean,
      value: true
    },
    hasMainNav: {
      type: Boolean,
      value: false,
      observer: 'initCollapsable'
    }
  },
  created: function() {
    /* What this does is to visualize whatever nav-item will do if it was not yet loaded.
      We might wanna add same thing to corporate-footer later if we wanna keep using Polymer... */
    if (window['params'].preload === 'false') {
      var items = this.querySelectorAll('nav-item');
      for(var i=0; i<items.length; i++) {
        var item = items[i];
        if ( !(item.children.length && item.children[0].nodeName === 'A') ) {
          item.innerHTML = '<a href="' + item.getAttribute('location') + '">' + item.innerHTML + '</a>';
        }
      }
    }
  },
  ready: function() {
    if (window['params'].preload !== 'false') {
      var url = this.resolveUrl('../../Bootstrap/navbar/nav-item/nav-item.html');
      this.importHref(url);
    }
  },
  attached: function() {
    this.style.display = 'block';
  },
  initCollapsable: function(newState) {
    if (newState) {
      var elm = this.querySelector('.navbar-toggle');
      if (!elm) {
        // IE issue - We need this recursive loop to
        // make sure that the elm is actually available
        return setTimeout((function() {
          this.initCollapsable(newState);
        }).bind(this), 100);
      }
      new window.Collapse(elm);
    }
  }
});