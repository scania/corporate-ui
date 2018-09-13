Polymer({
  is: name,
  properties: {
    id: String,
    fullbleed: {
      value: true
    },
    variation: 0,
    type: {
      type: String,
      value: 'text'
    },
    name: {
      type: String
    },
    label: {
      type: String
    }
  },
  attached: function() {
    var button = this.querySelector('button[name=show-hide]');
    var self = this;
    if (button) {
      button.onclick = function(event) {
        var input = self.querySelector('input'),
            icon = button.querySelector('i'),
            text = button.querySelector('span');

        icon.classList.toggle('icon-eye-close');
        icon.classList.toggle('icon-eye-open');

        if (input.type === 'text') {
          input.type = 'password';
          text.textContent = 'Show';
        } else {
          input.type = 'text';
          text.textContent = 'Hide';
        }
      }
    }
  },
  labelExist: function(text) {
    return text
  },
  fieldType: function(type) {
    this.type2 = !(this.type2 === 'select' || this.type2 === 'textarea') ? 'input' : this.type2;
    return type === this.type2;
  },
  isPassword: function(type) {
    return type === 'password';
  }
});