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
    document.addEventListener('fullscreen-toggle', (function(e) {
      this.fullscreenToggle.call(e.target);
    }).bind(this), false);
  },
  attached: function() {
    var mode = sessionStorage.getItem(this.name);
    if(mode) {
      document.body.classList.add(this.name);
    }
    this.addEventListener('click', (function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.async(function() {
        this.fire('fullscreen-toggle');
      });
    }).bind(this), false);
  },
  fullscreenToggle: function(e) {
    var className = 'fullscreen';

    document.body.classList.toggle(className);
    sessionStorage.setItem(className, 'true');

    if (!document.body.classList.contains(className)) {
      sessionStorage.removeItem(className);
    }

    this.async(function() {
      this.fire('fullscreen-toggled');
    });
  }
});
