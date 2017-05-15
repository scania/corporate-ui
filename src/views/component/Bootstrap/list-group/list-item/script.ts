Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    location: {
      type: String,
      value: ''
    }
  },
  isLinks: function(location) {
    return location !== '';
  }
});