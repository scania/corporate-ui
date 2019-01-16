Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    showSearch: Boolean,
    caption: String
  },
  listeners: {
    'navItem-active': 'setItemActive'
  },
  attached: function() {
    this.async(function() {
      this.fire('subNavigation-attached');
    });
  },
  setItemActive: function(event) {
    event.target.parentNode.parentNode.parentNode.classList.add('active');
  }
});