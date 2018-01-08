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
    var mode = localStorage.getItem(this.name);
    if(mode) {
      document.body.classList.add(this.name);
    }
  },
  toggleFullscreen: function(e) {
    e.preventDefault();
    document.body.classList.toggle(this.name);
    localStorage.setItem(this.name, 'true');

    if (!document.body.classList.contains(this.name)) {
      localStorage.removeItem(this.name);
    }

    this.async(function() {
      this.fire('toggle-fullscreen');
    });
  }
});