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
  labelExist: function(text) {
    return text
  },
  fieldType: function(type) {
    this.type2 = !(this.type2 === 'select' || this.type2 === 'textarea') ? 'input' : this.type2;
    return type === this.type2;
  }
});