Polymer({
  is: name,
  properties: {
    headline: String,
    description: String,
    link: String,
    linkText: {
      type: String,
      value: 'Read more'
    },
    btnType: {
      type: String,
      value: function(){
        if(this.attributes.btnType !== undefined){
          this.btnType = this.attributes.btnType.value;
        }else {
          this.btnType = "primary";
        }
      }
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