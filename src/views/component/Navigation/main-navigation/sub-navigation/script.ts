Polymer({
      is: 'c-sub-navigation',
      properties: {
        showSearch: Boolean,
        caption: String,
        variation: 0,
        fullbleed: {
          type: Boolean,
          value: true
        }
      },
      attached: function() {
        this.fire('childAttached');
      }
    });