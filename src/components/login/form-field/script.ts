Polymer({
  is: name,
  properties: {
    variation: 0,
    id: String,
    fullbleed: {
      value: true
    },
    type: {
      type: String,
      value: 'text'
    },
    showText: {
      type: String,
      value: 'Show',
      observer: 'setShowHide'
    },
    hideText: {
      type: String,
      value: 'Hide',
      observer: 'setShowHide'
    },
    showHide: {
      type: String
    },
    show: {
      type: Boolean
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    required: {
      type: Boolean
    }
  },
  attached: function() {
    var button = this.querySelector('button[name=show-hide]');
    var self = this;

    this.setShowHide();

    if (button) {
      button.onclick = function() {
        var input = self.querySelector('input'),
            icon = button.querySelector('i');

        icon.classList.toggle('icon-eye-close');
        icon.classList.toggle('icon-eye-open');

        if (input.type === 'text') {
          input.type = 'password';
          self.show = false;
        } else {
          input.type = 'text';
          self.show = true;
        }

        self.setShowHide();
      }
    }
  },
  setShowHide: function() {
    this.showHide = this.show ? this.hideText : this.showText;
  },
  labelExist: function(text) {
    return text;
  },
  fieldType: function(type) {
    this.type2 = !(this.type2 === 'select' || this.type2 === 'textarea') ? 'input' : this.type2;
    return type === this.type2;
  },
  isPassword: function(type) {
    return type === 'password';
  }
});