Polymer({
  is: name,
  properties: {
    text: String,
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    copyright: {
      type: String,
      value: function() {
        var date = new Date();
        return "Copyright Scania " + date.getFullYear() + " All rights reserved."
      }
    },
    navItems: {
      type: Boolean,
      value: false
    },
    items: {
      type: Array,
      observer: 'changedItems'
    }
  },
  created: function() {
    /* This condition was added based on solution in corporate-header */
    if (window['params'].preload === 'false') {
      var items = this.querySelectorAll('nav-item');
      for(var i=0; i<items.length; i++) {
        var item = items[i];
        if ( !(item.children.length && item.children[0].nodeName === 'A') ) {
          item.innerHTML = '<a href="' + item.getAttribute('location') + '">' + item.innerHTML + '</a>';
        }
      }
    }

    var items = [].slice.call(this.children).filter(function(item) {
      return item.nodeName == 'NAV-ITEM';
    });
    this.properties.navItems.value = items.length;
  },
  attached: function() {
    this.style.display = 'block';
  },
  changedItems: function(items) {
    this.navItems = this.navItems || items.length;
  }
});
