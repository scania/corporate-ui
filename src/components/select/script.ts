
var Choices = require('choices.js/assets/scripts/dist/choices.min.js');

Polymer({
  is: name,
  properties: {
    variation: 0,
    fullbleed: {
      type: Boolean,
      value: true
    },
    label: {
      type: String
    },
    name: {
      type: String,
      value: 'multiselect'
    },
    options: {
      type: Object
    },
    multiple: {
      type: Boolean,
      value: false
    },
    group: {
      type: Boolean
    }
  },
  created: function() {
    this.items = [].slice.call(this.children).map(renderObj);

    function renderObj(item) {
      var obj:any = { label: item.label };
      if (item.nodeName == 'OPTION') {
        obj.value = item.value
      } else {
        obj.choices = [].slice.call(item.children).map(renderObj);
      }
      return obj;
    }
  },
  attached: function() {
    var node = this.querySelector('.node');

    this.options = Object['assign']({removeItemButton:true, multiple:true}, this.options);
    this.multiple = this.options.multiple;

    if (this.options.choices) {
      this.group = !!(this.options.choices.filter(function(item) { return item.choices }).length);
    }

    if (this.options.choices) {
      this.options.choices = this.options.choices.concat(this.items);
    }

    if(this.options.items) {
      this.options.items = this.options.items.concat(this.items);
    }

    // Should probably add support for checking if it is in fact 
    // choices we are suppose to add or if its actually items
    if (!(this.options.choices || this.options.items)) {
      this.options.choices = this.items;

      // Would be better to stop rendering here and then restart over again
      node = document.createElement('select');
      // this.appendChild(node);
      // this.prepend(this.firstChild, node);
      this.insertBefore(node, this.children[2]);
    }

    var instance = new Choices(node, this.options);

    if (this.group) {
      this.classList.add('grouped');
      instance.setChoices(this.options.choices, 'value', 'label', false);
    }
  }
});
