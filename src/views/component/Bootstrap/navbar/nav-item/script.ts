Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    text: {
      type: String
    },
    tab: {
      type: Boolean,
      value: false
    },
    dataToggle: '',
    isSubNav: {
      type: Boolean,
      value: false
    },
    icon: String
  },
  created: function() {
    // This section is needed to retrive a string or a element from text attribute
    var elm = this.childNodes[0];
    this.properties.text.value = (elm || this).outerHTML || elm.textContent;
    this.className += ' ' + this.nodeName.toLowerCase(); // Adds nav-item class to nav-item element (is needed for some app specific style)
  },
  attached: function() {
    //$(this).wrapInner('li').unwrap();
    /*$(this).replaceWith(function(key,  val) {
      return '<li>' + val + '</li>';
    });*/

    if( this.dataToggle ) {
      this.querySelector('a').setAttribute('data-toggle', this.dataToggle);
      this.querySelector('a').setAttribute('target', '_self');
      this.removeAttribute('data-toggle');
    }

    if( this.querySelectorAll('sub-navigation').length ) {
      this.isSubNav = true;
    }
  },
  setClasses: function(icon) {
    return icon ? 'icon-' + icon : '';
  },
  ready: function() {
    var link = this.querySelector('a');
    link.innerHTML = link.textContent;
  }
});