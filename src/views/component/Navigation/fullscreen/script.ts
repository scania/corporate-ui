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
  registered: function() {
    document.addEventListener('toggle-fullscreen', this.toggleFullscreen.bind(this), false);
  },
  attached: function() {
    var mode = sessionStorage.getItem(this.name);
    if(mode) {
      document.body.classList.add(this.name);
    }
  },
  toggleFullscreen: function(e) {
    var triggeredGlobally = !this._readied;
    e.preventDefault();
    document.body.classList.toggle(this.name);
    sessionStorage.setItem(this.name, 'true');

    if (!document.body.classList.contains(this.name)) {
      sessionStorage.removeItem(this.name);
    }

    if (!triggeredGlobally) {
      // This will bubble from current node and down, but if this happens 
      // from outside we should only trigger the event globally
      this.async(function() {
        this.fire('fullscreen-toggled');
      });
    } else {
      var newEvent = document.createEvent('Event');
      newEvent.initEvent('fullscreen-toggled', true, true);
      document.dispatchEvent(newEvent);
    }
  }
});