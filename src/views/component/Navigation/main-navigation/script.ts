Polymer({
  is: name,
  properties: {
    siteName: String,
    siteUrl: String,
    showSearch: false,
    dealerLocator: false,
    variation: 0,
    moreItemsAvailable: {
      type: Boolean,
      value: false,
      observer: 'initMoreItem'
    },
    moreItems: {
      type: Array
    },
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  listeners: {
    'navItem-active': 'setItemActive',
    'subNavigation-attached': 'setHeaderSize',
    'fullscreen-toggled': 'setHeaderSize',
    'moreItem-toggled': 'setMoreItems',
    'navigation-close': 'navigationClose'
  },
  done: function() {
    [].slice.call(this.querySelectorAll('primary-items, secondary-items')).map(function(elm) {
      elm.classList.add('nav', 'navbar-nav')
    })

    if (this.querySelector('secondary-items')) {
      this.querySelector('secondary-items').classList.add('navbar-right');
    }

    // Show hamburger menu if item exist in main-navigation
    if (this.querySelectorAll('nav-item').length) {
      this.header.hasMainNav = true;
    }

    // The timeout here is used to delay the callback until template is fully rendered
    setTimeout((function() {
      this.sticky.call(this);
      this.setHeaderSize.call(this);
      this.setMoreItems.call(this);
    }).bind(this));
  },
  created: function() {
    this.header = document.querySelector('c-corporate-header');

    var self = this,
        url = this.resolveUrl('https://static.scania.com/vendors/frameworks/bootstrap.native/2.0.21/dist/bootstrap-native.js');

    if(window.define) {
      requirejs([url], function(bsn) {
        Object.assign(window, bsn);
        self.done.call(self);
      })
    } else {
      window.CorporateUi.importScript(url, this.done.bind(this));
    }
  },
  attached: function() {
    this.style.display = 'block';
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;

    // If corporate-header exists tell the logotype to have sticky handling
    if (this.header) {
      this.header.querySelector('.navbar-symbol').classList.add('should-stick');
    }

    var nav = this.querySelector('#main-navigation'),
        styleElm = document.createElement('style');

    this.insertBefore(styleElm, this.children[0]);

    window.addEventListener('scroll', this.sticky.bind(this));
    window.addEventListener('resize', (function() {
      this.setHeaderSize.call(this);
      this.setMoreItems.call(this);
    }).bind(this));
    nav.addEventListener('show.bs.collapse', function() {
      document.body.classList.add('navigation-open');
    });
    nav.addEventListener('hidden.bs.collapse', (function() {
      document.body.classList.remove('navigation-open');
      this.setHeaderSize.call(this);
    }).bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    // this.querySelector('.navbar-toggle').classList.add('collapsed');
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

    // This is set to make height calculation correct.
    // The height of the child is otherwise inherited by the parent
    this.children[0].style.height = 'auto';

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
      this.style.cssText ='display: block; height: ' + headerHeight + (isNaN(Number(headerHeight)) ? ';' : 'px;');
    }

    this.querySelector('.navbar-default').removeAttribute('style');
  },
  setMoreItems: function() {
    var primary = this.querySelector('primary-items'),
        secondary = this.querySelector('secondary-items'),
        styleElm = this.querySelector('style'),
        itemsWidth;

    if (window.moreItemDelay) {
      clearTimeout(window.moreItemDelay);
    }

    // We have a delay here to make sure the navigation 
    // doesnt flicker on resize
    window.moreItemDelay = setTimeout((function() {
      styleElm.innerText = '';
      itemsWidth = primary.offsetWidth + (secondary ? secondary.offsetWidth : 0);
      if(itemsWidth >= this.offsetWidth) {
        this.moreItemsAvailable = true;
      }
    }).bind(this), 100);
  },
  initMoreItem: function(val) {
    if(!val) {
      return;
    }

    this.moreItems = [];

    // Async is used to make sure template has rerendered before
    // continuing. Else dropdown nav-item is not rendered
    this.async(function() {
      var primary = this.querySelector('primary-items'),
          secondary = this.querySelector('secondary-items'),
          styleElm = this.querySelector('style'),
          dropdown = this.querySelector('.dropdown-toggle'),
          availableSpace = this.offsetWidth - (secondary ? secondary.offsetWidth + 2 : 0);

      primary.style.width = ( availableSpace - dropdown.offsetWidth ) + 'px';
      new Dropdown(dropdown);

      [].slice.call(primary.querySelectorAll('nav-item')).map((function(item, index) {

        if(item.offsetTop && !styleElm.innerText) {
          styleElm.innerText = '\
            c-main-navigation nav-item:nth-child(1n+' + index + ') { display: none; } \
            c-main-navigation .more li:nth-child(1n+' + (index + 1) + ') { display: block; }';
        }

        var node = item.querySelector('a');
        this.push('moreItems', {
          text: node.text,
          href: node.getAttribute('href')
        });
      }).bind(this));

      primary.removeAttribute('style');

      this.moreItemsAvailable = false;
      this.setHeaderSize.call(this);
    });
  },
  navigationClose: function() {
    new window.Collapse(this.header.querySelector('.navbar-toggle'));
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