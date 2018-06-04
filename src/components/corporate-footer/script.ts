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
      value: 'Copyright Scania 2018 All rights reserved.'
    }
  },
  attached: function() {
    this.style.display = 'block';
  }
});