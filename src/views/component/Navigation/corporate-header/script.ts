Polymer({
      is: 'c-corporate-header',
      properties: {
        siteName: String,
        variation: 0,
        siteUrl: {
          type: String,
          value: '/'
        },
        fullbleed: {
          type: Boolean,
          value: true
        }
      }
    });