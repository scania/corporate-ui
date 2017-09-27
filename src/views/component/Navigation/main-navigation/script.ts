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
    var self = this;

    //$('primary-items, secondary-items' this).contents().unwrap();

    $('primary-items, secondary-items', this).addClass('nav navbar-nav');
    $('secondary-items', this).addClass('navbar-right');

    $('#main-navigation', this).on('show.bs.collapse hidden.bs.collapse', function() {
      $('body').toggleClass('navigation-open');
    })

    this.siteName = $('c-corporate-header')[0].siteName;
    this.siteUrl = $('c-corporate-header')[0].siteUrl;

    // Show hamburger menu if item exist in main-navigation
    if ($('nav-item', this).length) {
      $('c-corporate-header .navbar-toggle').removeClass('hidden');
    }

    // Move sub-navigation items to be rendered after connected anchor element
    $('sub-navigation', this).each(function() {
      $(this).parent().after(this);
    });

    $(window).on('scroll resize', function() {
      self.sticky.call(self);
    });

    // Set start collapse value - couldnt get this to work in a better way...
    $('.navbar-toggle > a', this).addClass('collapsed');
  },
  ready: function() {
    var self = this;
    setTimeout(function() {
      self.sticky.call(self);
    });
  },
  // if we've scrolled more than the navigation, change its position to fixed making it stick to the top,
  // otherwise change it back to relative
  sticky: function() {
    var body = $('body'),
        navContainer = $('> .navbar-default', this),
        stickyNavTop = $(this).offset().top,
        scrollTop = $(window).scrollTop(), // our current vertical position from the top
        headerHeight = $('.navbar-toggle:visible', this).height() || $('> nav', this).height() + $('sub-navigation:visible', this).height() || 'auto',// On desktop mode it will use #main-nav on mobile .navbar-toggle
        footerHeight = $('.navbar-footer', this).height() || 'auto';

    $(this).removeAttr('style').height( headerHeight );

    $('.navbar-collapse.c-main-navigation', this).removeAttr('style');

    navContainer.removeAttr('style');
    navContainer.addClass('sticky');
    body.addClass('header-is-sticky');

    // Used in mobile mode
    if (window.innerWidth <= 991) {
      var header = $('c-corporate-header').height();
      $('.sticky', this).css({ top: header });
    }

    if (scrollTop <= Math.max(stickyNavTop - 15, 0)) {
      body.removeClass('header-is-sticky');
    }

    if (scrollTop <= stickyNavTop) {
      navContainer.removeClass('sticky');
    }
  }
});