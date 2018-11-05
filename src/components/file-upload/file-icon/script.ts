Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    filename: {
      type: String,
      notify: true
    },
    extension: {
      type: String
    }
  },
  getExtension: function(){
    this.extension = this.filename.match(/[^\.]*$|$/)[0];
  },
  attached: function(){
    this.getExtension();
  },
  listeners:{
    'filename-changed': 'onChange'
  },
  onChange: function(){
    this.getExtension();
  }
});
