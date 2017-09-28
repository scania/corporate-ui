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
    renderLink: {
      type: Boolean,
      value: true
    }
  },
  created: function() {
    if (!this.children.length) {
      this.attributes.renderLink = false;
    }
    this.className += ' ' + this.nodeName.toLowerCase(); // Adds nav-item class to nav-item element (is needed for some app specific style)
    this.classes = this.className; // Store default classlist without state included
  },
  attached: function() {
    if( this.dataToggle ) {
      this.querySelector('a').setAttribute('data-toggle', this.dataToggle);
      this.querySelector('a').setAttribute('target', '_self');
      this.removeAttribute('data-toggle');
    }

    if( !this.location ) {
      this.renderLink = false;
    }

    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }
  },
  hasClass: function(element, className) {
    return element.className.split(' ').indexOf(className) > -1;
  },
  toggleExpand: function(e) {
    e.preventDefault();
    var state = this.hasClass(this, 'expanded') ? ' collapsed' : ' expanded';
    this.className = this.classes + state;
    // this.mode = ['expand', 'collapse'].find(x => x !== this.mode); // Another way of doing the same :)
  }
});