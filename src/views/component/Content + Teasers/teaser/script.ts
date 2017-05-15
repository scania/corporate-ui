Polymer({
  is: name,
  properties: {
    headline: String,
    description: String,
    link: String,
    linkText: {
      type: String,
      value: 'Read more'
    }
  },
  created: function() {
    var self = this,
        variation = this.attributes.variation.value;

    this.className += ' ' + this.localName + '-' + variation;

    /*var XFooProto = Object.create(HTMLElement.prototype);

    var XFooExtended = document.registerElement('x-foo-extended', {
      prototype: XFooProto,
      extends: 'c-teaser-variation-1'
    });*/

    /*$(this.children).each(function() {
      $(this).attr('variation', variation);
    })*/
  },
  info: function(headline, description) {
    return headline || description;
  }
});