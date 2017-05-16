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
  fieldType: function(type, type2) {
    type2 = !(type2 === 'select' || type2 === 'textarea') ? 'input' : type2;
    return type === type2;
  }
});