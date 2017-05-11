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

    this.siteName = $('c-corporate-header')[0].siteName;
    this.siteUrl = $('c-corporate-header')[0].siteUrl;

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

    // Handling for navigation scoll in mobile mode
    $('#main-nav', this).on('shown.bs.collapse hide.bs.collapse', function(event) {
      $('body').toggleClass('navigation-open');
    });

    // If no nav-item is selected set top-level as selected
    if( !$('nav-item.active', this).length ) {
      $('.top-level').addClass('active');
    } 

    // This have been moved to css section, should work
    /*$('main-navigation .nav-item').bind("mouseover", function(){
      var color  = $(this).css("color");
      $('primary-items .nav-item').css("color", "#d4d4d3");
      $('primary-items .nav-item:hover').css("color", "#041e42");

      $(this).bind("mouseout", function(){
        $('primary-items .nav-item').css("color", "#041e42");
      })
    });*/
  },
  // if we've scrolled more than the navigation, change its position to fixed making it stick to the top,
  // otherwise change it back to relative
  sticky: function() {
    var body = $('body'),
        navContainer = $('.nav-container', this),
        stickyNavTop = $(this).offset().top,
        scrollTop = $(window).scrollTop(), // our current vertical position from the top
        headerHeight = $('.navbar-toggle:visible', this).height() || $('#main-nav .top-level', this).height() + $('c-sub-navigation:visible', this).height() || 'auto',// On desktop mode it will use #main-nav on mobile .navbar-toggle
        footerHeight = $('.navbar-footer', this).height() || 'auto';

    $(this).height( headerHeight );
    $('.navbar-collapse.c-main-navigation', this).removeAttr('style');
    navContainer.removeAttr('style');

    // Used in mobile mode
    if (window.innerWidth <= 991) {
      $('.navbar-collapse.c-main-navigation', this).css({
        'padding-top'     : headerHeight,
        'margin-top'      : headerHeight * -1,
        'padding-bottom'  : footerHeight,
        'margin-bottom'   : footerHeight * -1
      });

      $('.sticky', this).css({ top: headerHeight });
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