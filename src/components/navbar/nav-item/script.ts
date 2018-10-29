Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    text: {
      type: String,
      value: ''
    },
    template: {
      type: String
    },
    classes: {
      type: String
    },
    location: {
      type: String,
      value: ''
    },
    caption: {
      type: String,
      value: ''
    },
    children: {
      type: Array,
      observer: 'toggleModeToggler'
    },
    props: {
      type: Object
    },
    attrs: {
      type: Object
    },
    haveChildren: {
      type: Boolean
    },
    icon: {
      type: String
    },
    active: {
      type: String,
      observer: 'setActive'
    },
    dropdown: {
      type: Boolean,
      value: false
    }
  },
  listeners: {
    'dom-change': 'render'
  },
  render: function() {
    var anchors = this.querySelectorAll('a[href=""]');

    for (var i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      if (!anchor.attributes.href.value) {
        anchor.onclick = function(event) {
          event.preventDefault();
        }
      }
    }

    var a = this.querySelector('a');

    var attrs = [].slice.call(this.attributes).filter(function(item) {
      if (item.name.indexOf('attr-') == 0) {
        return true;
      }
    });

    if (a) {
      for(var i=0; i<attrs.length; i++) {
        var key = attrs[i].name,
            attr = key.replace('attr-', '');

        a.setAttribute(attr, this.attributes[key].value);
      }

      if(this.children && this.dropdown) {
        a.classList.add('dropdown-toggle');
        a.setAttribute('data-toggle', 'dropdown');
      }
    }
  },
  attached: function() {
    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }

    if(this.querySelector('sub-navigation')) {
      this.haveChildren = true;
    }

    if(this.active && this.active.toString() == 'true') {
      this.setActive(true);
    }

    if(this.props) {
      Object.keys(this.props).map(function(prop) {
        this[prop] = this.props[prop];
      }, this);
    }

    if(this.attrs) {
      Object.keys(this.attrs).map(function(attr) {
        this.setAttribute(attr, this.attrs[attr]);
      }, this);
    }

    if (this.classes) {
      this.classList.add.apply(this.classList, this.classes.split(' '));
    }

    if (this.template) {
      this.addTemplate();
    }

    this.toggleClass('expanded', this.hasClass(this, 'active'));

    this.listen(this, 'tap', 'onTap');
  },
  onTap: function(event) {
    event.stopPropagation();

    if (this.dropdown) {
      if (!this.classList.contains('more') && !this.active) {
        this.reSetActive();
      }
      return;
    }

    this.active = true;

    if(window.innerWidth < 992) {
      var _event = document.createEvent('Event');
      _event.initEvent('navigation-close', true, true);
      this.dispatchEvent(_event);
    }
  },
  setActive: function(newState) {
    if (newState && newState.toString() == 'true') {
      this.classList.add('active');

      this.async(function() {
        this.fire('navItem-active');
      });
    } else {
      this.classList.remove('active');
    }
  },
  reSetActive: function() {
    this.children.map(function(item, key) {
      if (item.active) {
        this.set('children.' + key + '.active', false);
      }
    }, this);
  },
  setDropdownItemActive: function(e) {
    this.reSetActive();

    e.model.set('item.active', true);
    this.active = true;
    this.fire('navItemDropdown-active', {navItem: this}, {node: e.target});
    e.stopPropagation();
  },
  addTemplate: function() {
    var div = document.createElement('div')
    div.innerHTML = this.template;
    while (div.firstChild) {
      this.appendChild(div.firstChild);
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
  dashed: function(text) {
    return (text || '').toLowerCase().split(' ').join('-');
  },
  setActiveClass: function(active) {
    return active ? 'active' : '';
  },
  toggleModeToggler: function(items) {
    this.haveChildren = !!(items || []).length;
  }
});