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
      type: String,
      value: ''
    },
    icon: {
      type: String,
      observer: 'AddIcon'
    },
    active: {
      type: String,
      observer: 'setActive'
    }
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
      // this.appendChild(anchor);
      this.insertBefore(anchor, this.firstChild)
    }

    var _anchor = this.querySelector('a');

    if (_anchor && _anchor.attributes.href && !_anchor.attributes.href.value) {
      _anchor.onclick = function(event) {
        event.preventDefault();
      }
    }

    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }

    if (this.active && this.active.toString() == 'true') {
      this.setActive(true);
    }

    this.listen(this, 'tap', 'onTap');
  },
  onTap: function() {
    this.active = true;

    if(window.innerWidth < 991) {
      var event = document.createEvent('Event');
      event.initEvent('navigation-close', true, true);
      this.dispatchEvent(event);
    }
  },
  setActive: function(newState) {
    if (newState.toString() == 'true') {
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
    e.stopPropagation();
    this.toggleClass('collapsed', this.hasClass(this, 'expanded'));
    this.toggleClass('expanded');
  },
  AddIcon: function(icon) {
    var anchor = document.createElement('a');
    anchor.href = this.location;
    this.appendChild(anchor);
    var SpanIcon = document.createElement('span');
    SpanIcon.classList.add('icon-' + icon);
    anchor.appendChild(SpanIcon);
  }
});