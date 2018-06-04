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
    var globalTrigger = !this.name,
        className = 'fullscreen';

    e.preventDefault();
    document.body.classList.toggle(className);
    sessionStorage.setItem(className, 'true');

    if (!document.body.classList.contains(className)) {
      sessionStorage.removeItem(className);
    }

    if (!globalTrigger) {
      // This will bubble from current node and down, but if this happens 
      // from outside we should only trigger the event globally
      this.async(function() {
        this.fire('fullscreen-toggled');
      });
    } else {
      AppEventStore.apply({ name: 'fullscreen', action: 'fullscreen-toggled' });
    }
  }
});