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
    'subNavigation-attached': 'setHeaderSize',
    'navItem-active': 'setHeaderSize',
    'fullscreen-toggled': 'setHeaderSize'
  },
  created: function() {
    if (!window.jQuery) {
      var placeHolder = document.createElement('div'),
          url = this.resolveUrl('/vendors/frameworks/jQuery/2.2.2/dist/jquery.min.js');

      this._template.parentNode.insertBefore(placeHolder, this._template.parentNode.children[0]);
      CorporateUi.importScript(url, this.created.bind(this), placeHolder);
    } else {
      this.jqReady.call(this);
    }
  },
  jqReady: function() {
    // We load sub-navigation dynamically because it will trigger "setHeaderSize" and this have a dependency to jQuery
    // TODO - We should probably have solution using promises instead so that we dont have these special cases...
    var url = this.resolveUrl('sub-navigation/sub-navigation.html');
    this.importHref(url);

    CorporateUi.importScript('/vendors/frameworks/bootstrap/3.2.0/dist/js/bootstrap.js', undefined, this._template.parentNode.children[0]);
    //$('primary-items, secondary-items' this).contents().unwrap();

    $('primary-items, secondary-items', this).addClass('nav navbar-nav');
    $('secondary-items', this).addClass('navbar-right');

    $('#main-navigation', this).on('show.bs.collapse hidden.bs.collapse', function() {
      $('body').toggleClass('navigation-open');
    })

    // If corporate-header exists tell the logotype to have sticky handling
    if (this.header) {
      $('.navbar-symbol', this.header).addClass('should-stick');
    }

    // Show hamburger menu if item exist in main-navigation
    if ($('nav-item', this).length) {
      $('.navbar-toggle', this.header).removeClass('hidden');
    }

    this.sticky.call(this);
    this.setHeaderSize.call(this);

    $(window).on('scroll', this.sticky.bind(this));
    $(window).on('resize', this.setHeaderSize.bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    $('.navbar-toggle > a', this).addClass('collapsed');

    this.sticky.call(this);
    this.setHeaderSize.call(this);
  },
  attached: function() {
    this.style.display = 'block';
    this.header = document.querySelector('c-corporate-header')
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;
  },
  setHeaderSize: function() {
    var headerHeight = $('.navbar-toggle:visible', this.header).height() || $('> nav', this).height() + $('sub-navigation:visible', this).height() || 'auto'; // On desktop mode it will use #main-nav on mobile .navbar-toggle

    if( parseInt(this.style.height) != headerHeight ) {
      $(this)
        .removeAttr('style')
        .css({display: 'block'})
        .height( headerHeight );
    }

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