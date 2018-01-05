Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    }
  },
  attached: function() {
    this.style.display = 'block';
  }
});