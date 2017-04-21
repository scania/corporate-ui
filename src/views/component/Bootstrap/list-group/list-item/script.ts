    Polymer({
      is: 'c-list-item',
      properties: {
        fullbleed: {
          type: Boolean,
          value: true
        },
        variation: 0,
        location: {
          type: String,
          value: ''
        }
      },
      isLinks: function(location) {
        return location !== '';
      }
    });