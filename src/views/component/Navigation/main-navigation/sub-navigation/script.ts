Polymer({
      is: 'c-sub-navigation',
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
        this.fire('childAttached');
      }
    });