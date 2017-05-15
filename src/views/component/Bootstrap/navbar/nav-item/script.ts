Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    tab: {
      type: Boolean,
      value: false
    },
    dataToggle: '',
    isSubNav: {
      type: Boolean,
      value: false
    },
    icon: String
  },
  attached: function() {
    if( this.dataToggle ) {
      this.querySelector('a').setAttribute('data-toggle', this.dataToggle);
      this.querySelector('a').setAttribute('target', '_self');
      this.removeAttribute('data-toggle');
    }

    if( this.querySelectorAll('sub-navigation').length ) {
      this.isSubNav = true;
    }
  },
  setClasses: function(icon) {
    return icon ? 'icon-' + icon : '';
  }
});