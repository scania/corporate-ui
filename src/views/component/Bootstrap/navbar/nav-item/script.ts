Polymer({
      is: 'c-nav-item',
      properties: {
        tab: {
          type: Boolean,
          value: false
        },
        dataToggle: '',
        fullbleed: {
          type: Boolean,
          value: true
        },
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

        if( this.querySelectorAll('c-sub-navigation').length ) {
          this.isSubNav = true;
        }
      },
      setClasses: function(icon) {
        return icon ? 'icon-' + icon : '';
      }
    });