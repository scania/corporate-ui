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
    // Add support for old structure where content was added textContent
    var content = this.getAttribute('text');
    if (this.childNodes.length) {
      content = content || this.childNodes[0].textContent || this.childNodes[1].textContent;
    }
    this.setAttribute('text', content);
  },
  attached: function() {
    //$(this).wrapInner('li').unwrap();
    /*$(this).replaceWith(function(key, val) {
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
  }
});