Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    showSearch: Boolean,
    caption: String
  },
  attached: function() {
    this.async(function() {
      this.fire('subNavigation-attached');
    });

    $('nav-item', this).each(function() {
      if (this.init) {
        return;
      }

      this.init = true;

      $(this).on('click', function() {
        if(window.innerWidth < 991) {
          $('.navbar-toggle').trigger('click');
        }
      });
    });
  }
});