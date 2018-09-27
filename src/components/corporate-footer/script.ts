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
    }
  },
  created: function() {
    var items = [].slice.call(this.children).filter(function(item) {
      return item.nodeName == 'NAV-ITEM';
    });
    this.properties.navItems.value = items.length;
  },
  ready: function(){
    if(window['params'].monitoring){
      ga('send', {
        hitType: 'event',
        eventCategory: 'c-corporate-footer', //the object that user interact with on the page
        eventAction: 'loaded', // type of interaction with the object
        eventLabel: 'Corporate footer'  //categorizing events
      });
    }
  },
  attached: function() {
    this.style.display = 'block';
  }
});
