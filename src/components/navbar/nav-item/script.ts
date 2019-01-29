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
    items: {
      type: Array,
      observer: 'toggleModeToggler'
    },
    props: {
      type: Object,
      observer: 'setProps'
    },
    attrs: {
      type: Object,
      observer: 'setAttrs'
    },
    haveItems: {
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
      type: Boolean
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

      if(this.items && this.dropdown) {
        a.classList.add('dropdown-toggle');

        if (window['Dropdown']) {
          a.setAttribute('data-toggle', 'dropdown');
        } else {
          // Special handling for Firefox 64 if application is using requirejs
          a.onclick = function(event) {
            event.preventDefault();
            a.parentElement.classList.toggle('open');
          }
        }
      }
    }
  },
  attached: function() {
    this.dropdown = !!this.dropdown;

    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }

    if(this.querySelector('sub-navigation')) {
      this.haveItems = true;
    }

    if(this.active && this.active.toString() == 'true') {
      this.setActive(true);
    }

    if (this.classes) {
      this.classList.add.apply(this.classList, this.classes.split(' '));
    }

    if (this.template) {
      this.addTemplate();
    }

    this.toggleClass('expanded', this.hasClass(this, 'active'));

    this.addEventListener('click', function() {
      if(window.innerWidth < 992) {
        var _event = document.createEvent('Event');
        _event.initEvent('navigation-close', true, true);
        this.dispatchEvent(_event);
      }

      if (this.dropdown) {
        if (!this.classList.contains('more') && !this.active) {
          this.reSetActive();
        }
        return;
      }

      this.active = true;
    });
  },
  setProps: function(props) {
    Object.keys(props).map(function(prop) {
      this[prop] = props[prop];
    }, this);
  },
  setAttrs: function(attrs) {
    Object.keys(attrs).map(function(attr) {
      this.setAttribute(attr, attrs[attr]);
    }, this);
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
    this.items.map(function(item, key) {
      if (item.active) {
        this.set('items.' + key + '.active', false);
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
    this.haveItems = !!(items || []).length;
  }
});