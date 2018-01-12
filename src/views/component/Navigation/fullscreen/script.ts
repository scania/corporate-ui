Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    name: {
      type: String,
      value: 'fullscreen'
    }
  },
  attached: function() {
    var mode = sessionStorage.getItem(this.name);
    if(mode) {
      document.body.classList.add(this.name);
    }
  },
  toggleFullscreen: function(e) {
    e.preventDefault();
    document.body.classList.toggle(this.name);
    sessionStorage.setItem(this.name, 'true');

    if (!document.body.classList.contains(this.name)) {
      sessionStorage.removeItem(this.name);
    }

    this.async(function() {
      this.fire('toggle-fullscreen');
    });
  }
});