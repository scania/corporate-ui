Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      value: true
    },
    icon: {
      type: String,
      value: 'user'
    },
    headline: {
      type: String
    },
    description: {
      type: String
    },
    href: {
      type: String
    }
  }
});