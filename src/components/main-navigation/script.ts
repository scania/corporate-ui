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
      type: Array,
      value: []
    },
    fullbleed: {
      type: Boolean,
      value: true
    },
    primaryItems: {
      type: Array,
      value: [],
      observer: 'setItemIndex'
    },
    secondaryItems: {
      type: Array,
      value: [],
      observer: 'setItemIndex'
    }
  },
  listeners: {
    'navItem-active': 'setItemActive',
    'subNavigation-attached': 'setHeaderSize',
    'fullscreen-toggled': 'setHeaderSize',
    'moreItem-toggled': 'setMoreItems',
    'navigation-close': 'navigationClose'
  },
  created: function() {
    this.header = document.querySelector('c-corporate-header');

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
  attached: function() {
    this.style.display = 'block';
    this.siteName = this.header.siteName;
    this.siteUrl = this.header.siteUrl;

    // If corporate-header exists tell the logotype to have sticky handling
    if (this.header) {
      this.header.sticky = 'should-stick';
    }

    var nav = this.querySelector('#main-navigation'),
        styleElm = document.createElement('style');

    this.insertBefore(styleElm, this.children[0]);

    window.addEventListener('scroll', (function() {
      this.sticky.call(this)
      this.setMoreItems.call(this);
    }).bind(this));
    window.addEventListener('resize', (function() {
      this.setHeaderSize.call(this);
      this.setMoreItems.call(this);
    }).bind(this));
    nav.addEventListener('show.bs.collapse', function() {
      window.scrollTo(0, 0);
      document.body.classList.add('navigation-open');
    });
    nav.addEventListener('hidden.bs.collapse', (function() {
      document.body.classList.remove('navigation-open');
      this.setHeaderSize.call(this);
    }).bind(this));

    // Set start collapse value - couldnt get this to work in a better way...
    // this.querySelector('.navbar-toggle').classList.add('collapsed');
  },
  ready: function() {
    this.unwrap(this.getContentChildren('#primary-items')[0]);
    this.unwrap(this.getContentChildren('#secondary-items')[0]);

    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-main-navigation', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Main navigation'  //categorizing events
      });
    }
  },
  unwrap: function(node) {
    if (!node) {
      return
    }

    while (node.firstChild) {
      node.parentNode.insertBefore(node.firstChild, node);
    }
    for (var i = 0; i < node.attributes.length; i++) {
      var attrs = node.attributes[i],
          val = node.parentNode.getAttribute(attrs.name) || '';
      node.parentNode.setAttribute(attrs.name, val + ' ' + attrs.value);
      // node.parentNode[attrs.name] = attrs.value;
    }
    node.parentNode.removeChild(node);
  },
  dashed: function(text) {
    return text.toLowerCase().split(' ').join('-');
  },
  setItemActive: function(event) {
    var parent = event.target.parentNode,
        index = Array.prototype.indexOf.call(parent.children, event.target);

    // Stop here if current item is the more item
    if (event.target.classList.contains('dropdown')) {
      event.target.active = false;
      return
    }

    if (parent.preActive && parent.preActive !== event.target) {
      parent.preActive.active = false;
    }

    parent.preActive = event.target;

    if(this.moreItems) {
      this.moreItems.map((function(item, key) {
        if (item.active) {
          this.set('moreItems.' + key + '.active', false);
        }
      }).bind(this))
      this.set('moreItems.' + index + '.active', true);
    }

    // $('.navbar-toggle').trigger('click');
    this.setHeaderSize.call(this);
  },
  setActiveClass: function(active) {
    return active ? 'active' : '';
  },
  setHeaderSize: function() {
    var headerHeight = 'auto',
        elm = this.querySelector('.navbar-toggle'),
        elm2 = this.querySelector('.navbar-default'),
        elm3 = this.querySelector('nav-item.active sub-navigation');

    // This is set to make min-height calculation correct.
    // The min-height of the child is otherwise inherited by the parent
    elm2.style.minHeight = 'auto';

    if (elm2 && elm2.offsetHeight) {
      headerHeight = elm2.offsetHeight;
      if (elm3 && elm3.offsetHeight) {
        headerHeight += elm3.offsetHeight;
      }
    }

    if (elm && elm.getClientRects().length) {
      headerHeight = elm.offsetHeight
    }

    if( parseInt(this.style.height) != parseInt(headerHeight) ) {
      this.style.cssText ='display: block; min-height: ' + headerHeight + (isNaN(Number(headerHeight)) ? ';' : 'px;');
    }

    this.querySelector('.navbar-default').removeAttribute('style');
  },
  setMoreItems: function() {
    var primary = this.querySelector('primary-items'),
        secondary = this.querySelector('secondary-items'),
        styleElm = this.querySelector('style') || {},
        itemsWidth;

    if (window['moreItemDelay']) {
      clearTimeout(window['moreItemDelay']);
    }

    // We have a delay here to make sure the navigation
    // doesnt flicker on resize
    window['moreItemDelay'] = setTimeout((function() {
      styleElm.innerText = '';

      this.customStyle['--more-visibility'] = 'hidden';
      this.updateStyles();

      itemsWidth = primary.offsetWidth + (secondary ? secondary.offsetWidth + 2 : 0);
      if(itemsWidth >= this.offsetWidth) {
        this.moreItemsAvailable = true;
      }
    }).bind(this), 20);
  },
  initMoreItem: function(val) {
    if(!val) {
      return;
    }

    // Async is used to make sure template has rerendered before
    // continuing. Else dropdown nav-item is not rendered
    this.async(function() {
      var primary = this.querySelector('primary-items'),
          secondary = this.querySelector('secondary-items'),
          styleElm = this.querySelector('style'),
          dropdown = this.querySelector('.dropdown-toggle'),
          availableSpace = this.offsetWidth - (secondary ? secondary.offsetWidth + 2 : 0),
          // We have -2 here because we dont want to count the template element or "More" nav-item
          itemsChanged = primary.children.length - 2 !== this.moreItems.length;

      if (itemsChanged) {
        this.moreItems = [];
      }

      this.customStyle['--more-visibility'] = 'visible';
      this.updateStyles();

      primary.style.width = ( availableSpace - dropdown.offsetWidth ) + 'px';

      // We have -1 here to skip the "More" nav-item
      for(var i=0; i<primary.children.length - 1; i++) {
        var item = primary.children[i],
            node = item.querySelector('a');

        if (item.nodeName !== 'NAV-ITEM') {
          continue;
        }

        if(item.offsetTop && !styleElm.innerText) {
          var css = '\
            @media (min-width: 991px) {\
              c-main-navigation primary-items > nav-item:nth-child(1n+' + i + ') > a { display: none; } \
              c-main-navigation .more li:nth-child(1n+' + i + ') { display: block !important; } \
            }';
          if (styleElm.styleSheet){
            styleElm.styleSheet.cssText = css;
          } else {
            styleElm.appendChild(document.createTextNode(css));
          }
        }

        if (itemsChanged && node) {
          this.push('moreItems', {
            text: node.text,
            href: node.getAttribute('href')
          });
        }
      }

      primary.removeAttribute('style');

      this.moreItemsAvailable = false;
      this.setHeaderSize.call(this);
    });
  },
  setMoreItemActive: function(event) {
    var trigger = event.target.parentNode,
        index = Array.prototype.indexOf.call(trigger.parentNode.children, trigger);

    this.querySelector('primary-items').children[index].active = true;
  },
  navigationClose: function() {
    var hamburger = this.header.querySelector('.navbar-toggle');
    hamburger.Collapse.hide();
  },
  sticky: function() {
    var stickyNavTop = this.offsetTop,
        scrollTop = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY, // our current vertical position from the top
        isSticky = document.body.classList.contains('header-is-sticky');

    if (scrollTop <= Math.max(stickyNavTop, 0)) {
      if (isSticky) {
        document.body.classList.remove('header-is-sticky');
      }
    } else {
      if (!isSticky) {
        document.body.classList.add('header-is-sticky');
      }
    }
  },
  setItemIndex: function(val, oldVal) {
    if (oldVal && val.toString() != oldVal.toString()) {
      val = val.map(function(item, key) {
        item.orgIndex = key;
        return item;
      })
    }
  },
  sort: function(a, b) {
    // Compare item a and b origional index to
    // decide what item is first
    var order = a.orgIndex < b.orgIndex ? -1 : 1,
        maxIndex = 100;

    // Check if item has a user set index or
    // set a max index
    a.index = a.index || maxIndex;
    b.index = b.index || maxIndex;

    // Compare user set index on item if they
    // dont match decide what item is first
    if (a.index < b.index) order = -1;
    if (a.index > b.index) order = 1;

    return order;
  }
});
