Polymer({
  is: 'c-teaser-item',
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    variation: 0,
    headline: String,
    image: String,
    imageText: {
      type: String,
      value: false
    },
    link: String,
    linkText: {
      type: String,
      value: 'Read more'
    }
  }
});