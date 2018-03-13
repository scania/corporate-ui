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
  listeners: {
    'navItem-active': 'setItemActive',
    'subNavigation-attached': 'setHeaderSize',
    'fullscreen-toggled': 'setHeaderSize'
  },
  done: function() {
    this.jQuery('primary-items, secondary-items', this).addClass('nav navbar-nav');
    this.jQuery('secondary-items', this).addClass('navbar-right');

    // The timeout here is used to delay the callback until template is fully rendered
    setTimeout((function() {
      this.sticky.call(this);
      this.setHeaderSize.call(this);
    }).bind(this));
  },
  attached: function() {
    var self = this;
    this.style.display = 'block';

    $('#main-navigation', this).on('show.bs.collapse hidden.bs.collapse', function() {
      self.jQuery('body').toggleClass('navigation-open');
    });

    this.header = document.querySelector('c-corporate-header');
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;

    // If corporate-header exists tell the logotype to have sticky handling
    if (this.header) {
      $('.navbar-symbol', this.header).addClass('should-stick');
    }

    // Show hamburger menu if item exist in main-navigation
    if ($('nav-item', this).length) {
      $('.navbar-toggle', this.header).removeClass('hidden');
    }

    $(window).on('scroll', this.sticky.bind(this));
    $(window).on('resize', this.setHeaderSize.bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    $('.navbar-toggle > a', this).addClass('collapsed');

    this.jQuery = window.jQuery;
    window.$ = window.jQuery = window.preJQuery;

    this.done.call(this);
  },
  setItemActive: function(event) {
    if(window.innerWidth < 991 && event.target.active == 'true' && this.jQuery(event.target).parents('sub-navigation').length) {
      this.jQuery('#main-navigation', this).collapse('hide');
    }
    // this.jQuery('.navbar-toggle').trigger('click');
    this.setHeaderSize.call(this);
  },
  setHeaderSize: function() {
    var headerHeight = this.jQuery('.navbar-toggle:visible', this.header).height()
                     || this.jQuery('> nav', this).height() + this.jQuery('sub-navigation:visible', this).height()
                     || 'auto'; // On desktop mode it will use #main-nav on mobile .navbar-toggle

    if( parseInt(this.style.height) != headerHeight ) {
      this.jQuery(this)
        .removeAttr('style')
        .css({display: 'block'})
        .height( headerHeight );
    }

    this.jQuery('> .navbar-default', this).removeAttr('style');

    // Used in mobile mode
    if(window.innerWidth < 991) {
      var header = this.jQuery(this.header).height();
      this.jQuery('> .navbar-default', this).css({ 'padding-top': header });
    }
  },
  sticky: function() {
    var body = this.jQuery('body'),
        navContainer = this.jQuery('> .navbar-default', this), // Using > could lead to performance issues due to manipulation of dom
        stickyNavTop = this.jQuery(this).offset().top,
        scrollTop = this.jQuery(window).scrollTop(); // our current vertical position from the top

    if (scrollTop <= Math.max(stickyNavTop, 0)) {
      body.removeClass('header-is-sticky');
    } else {
      body.addClass('header-is-sticky');
    }
  }
});