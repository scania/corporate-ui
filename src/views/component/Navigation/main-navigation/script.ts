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
    'fullscreen-toggled': 'setHeaderSize',
    'navigation-close': 'navigationClose'
  },
  done: function() {
    [].slice.call(this.querySelectorAll('primary-items, secondary-items')).map(function(elm) {
      elm.classList.add('nav', 'navbar-nav')
    })

    if (this.querySelector('secondary-items')) {
      this.querySelector('secondary-items').classList.add('navbar-right');
    }

    // The timeout here is used to delay the callback until template is fully rendered
    setTimeout((function() {
      this.sticky.call(this);
      this.setHeaderSize.call(this);
    }).bind(this));
  },
  attached: function() {
    this.style.display = 'block';
    this.header = document.querySelector('c-corporate-header');
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;

    // If corporate-header exists tell the logotype to have sticky handling
    if (this.header) {
      this.header.querySelector('.navbar-symbol').classList.add('should-stick');
    }

    // Show hamburger menu if item exist in main-navigation
    if (this.querySelectorAll('nav-item').length) {
      this.header.hasMainNav = true;
    }

    var nav = this.querySelector('#main-navigation');

    window.addEventListener('scroll', this.sticky.bind(this));
    window.addEventListener('resize', this.setHeaderSize.bind(this));
    nav.addEventListener('show.bs.collapse', function(e) {
      document.body.classList.add('navigation-open');
    });
    nav.addEventListener('hidden.bs.collapse', (function(e) {
      document.body.classList.remove('navigation-open');
      this.setHeaderSize.call(this);
    }).bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    // this.querySelector('.navbar-toggle').classList.add('collapsed');

    this.done.call(this);
  },
  setItemActive: function(event) {
    var parent = event.target.parentNode;
    if (parent.preActive && parent.preActive !== event.target) {
      parent.preActive.active = false;
    }
    parent.preActive = event.target;

    // $('.navbar-toggle').trigger('click');
    this.setHeaderSize.call(this);
  },
  setHeaderSize: function() {
    var headerHeight = 'auto',
        elm = this.querySelector('.navbar-toggle'),
        elm2 = this.querySelector('.navbar-default'),
        elm3 = this.querySelector('nav-item.active sub-navigation');

    if (elm2 && elm2.offsetHeight) {
      headerHeight = elm2.offsetHeight;
      if (elm3 && elm3.offsetHeight) {
        headerHeight += elm3.offsetHeight;
      }
    }

    if (elm && elm.getClientRects().length) {
      headerHeight = elm.offsetHeight
    }

    if( parseInt(this.style.height) != headerHeight ) {
      this.removeAttribute('style')
      this.style.cssText ='display: block; height: ' + headerHeight + (isNaN(Number(headerHeight)) ? ';' : 'px;');
    }

    this.querySelector('.navbar-default').removeAttribute('style');

    // Used in mobile mode
    if(window.innerWidth < 991) {
      this.querySelector('.navbar-default').style.cssText = 'padding-top: ' + this.header.offsetHeight + 'px;';
    }
  },
  navigationClose: function() {
    new window.Collapse(this.header.querySelector('.navbar-toggle')).hide();
  },
  sticky: function() {
    var stickyNavTop = this.offsetTop,
        scrollTop = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY; // our current vertical position from the top

    if (scrollTop <= Math.max(stickyNavTop, 0)) {
      document.body.classList.remove('header-is-sticky');
    } else {
      document.body.classList.add('header-is-sticky');
    }
  }
});