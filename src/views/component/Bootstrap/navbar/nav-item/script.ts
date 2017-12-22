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
      type: String,
      observer: 'setActive'
    }
  },
  created: function() {
    this.classes = this.className; // Store default classlist without state included
  },
  attached: function() {
    var arr = [];
    for(var i = 0; i<this.children.length; i++){
      arr.push(this.children[i].nodeName)
    }

    // Check if we have any direct childs of current item with type A
    if (arr.indexOf('A') === -1) {
      var node;
      for(var i = 0; i<this.childNodes.length; i++){
        node = this.childNodes[i];

        // Break loop we we find a node containing a text
        if(node.nodeType === 3 && node.nodeValue.trim() != '') {
          break;
        }
      }
      var anchor = document.createElement('a');
      anchor.innerText = node.textContent.trim();
      anchor.href = this.location;
      this.replaceChild(anchor, node)
    }

    /*if( this.location && this.children.length > 2 ) {
      this.apa = true;
      this.text = this.childNodes[5].textContent;
      this.childNodes[5].textContent = '';
    }*/

    if( this.hasClass(this, 'active') ) {
      this.toggleExpand(this._getEvent());
    }
  },
  setActive: function() {
    this.classList.add('active');
    this.async(function() {
      this.fire('navItem-active');
    });
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