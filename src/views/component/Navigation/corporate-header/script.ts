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
  ready: function() {
    var self = this;

    // If main-navigation exists then we want the logotype inside corporate-header to get sticky
    if ($('c-main-navigation').length) {
      this.symbolFixed();

      // and run it again every time you scroll
      $(window).on('scroll resize', function() {
        self.symbolFixed();
      });
    }
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