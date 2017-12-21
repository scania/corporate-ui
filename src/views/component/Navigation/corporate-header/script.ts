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

    // If main-navigation exists then we want the logotype inside corporate-header to get sticky
    if ($('c-main-navigation').length) {
      this.symbolFixed();

      // and run it again every time you scroll
      $(window).on('scroll resize', this.symbolFixed.bind(this));
    }
  },
  attached: function() {
    Polymer.updateStyles({ '--display': 'block' });
  },
  symbolFixed: function() {
    var symbol = $('.navbar-symbol', this),
        headerTop = $(this).offset().top,
        scrollTop = $(window).scrollTop(); // our current vertical position from the top

    symbol.addClass('fixed');

    if (scrollTop <= headerTop) {
      symbol.removeClass('fixed');
    }
  }
});