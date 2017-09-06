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

    $('primary-items, secondary-items' this).addClass('nav navbar-nav');
    $('secondary-items' this).addClass('navbar-right');

    $('#main-navigation', this).on('show.bs.collapse hidden.bs.collapse', function() {
      $('body').toggleClass('navigation-open');
    })

    this.siteName = $('c-corporate-header')[0].siteName;
    this.siteUrl = $('c-corporate-header')[0].siteUrl;

    // Hide hamburger menu if no items exist in main-navigation
    if (this.querySelectorAll('nav-item').length) {
      var elm = document.body.querySelector('c-corporate-header .navbar-toggle');
      elm.className = elm.className.replace(/hidden/, '');
    }

    // Move sub-navigation items to be rendered after connected anchor element
    this.querySelectorAll('sub-navigation').forEach(function(item) {
      item.parentNode.insertAdjacentElement('afterend', item);
    });

    // TODO - Remove timeout and make it work widthout it
    setTimeout(function() {
      self.sticky.call(self);
    }, 20);

    // and run it again every time you scroll
    $(window).on('scroll resize', function() {
      self.sticky.call(self);
    });

    // Set start collapse value - couldnt get this to work in a better way...
    $('.navbar-toggle > a', this).addClass('collapsed');
  },
  // if we've scrolled more than the navigation, change its position to fixed making it stick to the top,
  // otherwise change it back to relative
  sticky: function() {
    var body = $('body'),
        navContainer = $('> .navbar-default', this),
        stickyNavTop = $(this).offset().top,
        scrollTop = $(window).scrollTop(), // our current vertical position from the top
        footerHeight = $('.navbar-footer', this).height() || 'auto';

    $('.navbar-collapse.c-main-navigation', this).removeAttr('style');
    navContainer.removeAttr('style');

    // Used in mobile mode
    if (window.innerWidth <= 991) {
      var header = $('c-corporate-header').height();
      $('.navbar-default.c-main-navigation', this).css({
        'padding-top'     : header,
        'margin-top'      : header * -1,
        'padding-bottom'  : footerHeight,
        'margin-bottom'   : footerHeight * -1
      });

      $('.sticky', this).css({ top: header });
    }

    navContainer.addClass('sticky');
    body.addClass('header-is-sticky');

    // TODO - should not need to check for parent, does that for this to work on UX-lib while showing main-navigation
    if (this.parentNode.nodeName === 'C-MAIN-CONTENT' && scrollTop <= Math.max(stickyNavTop - 15, 0)) {
      body.removeClass('header-is-sticky');
    }

    if (scrollTop <= stickyNavTop) {
      navContainer.removeClass('sticky');
    }
  }
});