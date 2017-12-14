Polymer({
  is: name,
  properties: {
    siteName: String,
    siteUrl: String,
    showSearch: false,
    dealerLocator: false,
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  attached: function() {
    //$('primary-items, secondary-items' this).contents().unwrap();

    $('primary-items, secondary-items', this).addClass('nav navbar-nav');
    $('secondary-items', this).addClass('navbar-right');

    $('#main-navigation', this).on('show.bs.collapse hidden.bs.collapse', function() {
      $('body').toggleClass('navigation-open');
    })

    this.header = document.querySelector('c-corporate-header')
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;

    // Show hamburger menu if item exist in main-navigation
    if ($('nav-item', this).length) {
      $('c-corporate-header .navbar-toggle').removeClass('hidden');
    }

    $(window).on('scroll', this.sticky.bind(this));
    $(window).on('resize', this.setHeaderSize.bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    $('.navbar-toggle > a', this).addClass('collapsed');
  },
  ready: function() {
    var self = this;
    setTimeout(function() {
      self.setHeaderSize.call(self);
      Polymer.updateStyles({ '--display': 'block' });
    });
  },
  setHeaderSize: function() {
    var headerHeight = $('.navbar-toggle:visible', this.header).height() || $('> nav', this).height() + $('sub-navigation:visible', this).height() || 'auto'; // On desktop mode it will use #main-nav on mobile .navbar-toggle

    // if( $(this).offset().top === 0 || $(this).height() != headerHeight ) {
      $(this)
        .removeAttr('style')
        .height( headerHeight );
    // }

    $('> .navbar-default', this).removeAttr('style');

    // Used in mobile mode
    if(window.innerWidth <= 991) {
      var header = $(this.header).height();
      $('> .navbar-default', this).css({ 'padding-top': header });
    }
  },
  sticky: function() {
    var body = $('body'),
        navContainer = $('> .navbar-default', this), // Using > could lead to performance issues due to manipulation of dom
        stickyNavTop = $(this).offset().top,
        scrollTop = $(window).scrollTop(); // our current vertical position from the top

    if (scrollTop <= Math.max(stickyNavTop, 0)) {
      body.removeClass('header-is-sticky');
    } else {
      body.addClass('header-is-sticky');
    }
  }
});