    Polymer({
      is: 'c-list-item',
      properties: {
        fullbleed: {
          type: Boolean,
          value: true
        },
        location: {
          type: String,
          value: ''
        }
      },
      isLinks: function(location) {
        return location !== '';
      }
    });