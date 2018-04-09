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
    location: {
      type: String
    },
    active: {
      type: Boolean,
      observer: 'setActive'
    }
  },
  created: function() {
    this.classes = this.className; // Store default classlist without state included
  },
  attached: function() {
    var child = this.firstChild,
        texts = [];

    while (child) {
      if (child.nodeType == 3) {
        texts.push(child.data);
        child.data = '';
      }
      child = child.nextSibling;
    }

    var text = texts.join('').trim();

    if (text) {
      var anchor = document.createElement('a');
      anchor.innerText = text;
      anchor.href = this.location;
      this.appendChild(anchor);
    }

    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }

    if (this.active) {
      this.classList.add('active');
    }

    this.onclick = (function() {
      this.active = true;
    }).bind(this);
  },
  setActive: function(newState) {
    if (newState) {
      this.classList.add('active');

      this.async(function() {
        this.fire('navItem-active');
      });
    } else {
      this.classList.remove('active');
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