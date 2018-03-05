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
  attached: function() {
    this.async(function() {
      this.fire('subNavigation-attached');
    });
  }
});