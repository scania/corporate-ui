Polymer({
  is: name,
  listeners: {
    'navItem-active': 'hideMain',
    'fullscreen-toggle': 'hideMain'
  },
  hideMain: function() {
    var subNav = this.querySelector('primary-items nav-item.active sub-navigation');
    this.classList.remove('hideMain');
    if (subNav) {
      this.classList.add('hideMain');
    }
  }
});