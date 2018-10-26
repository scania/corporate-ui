Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    filename: {
      type: String
    },
    extension: {
      type: String
    }
  },
  getExtension: function(){
    this.extension = this.filename.match(/\.[^\.]*$|$/)[0];
  },
  ready: function(){
    this.getExtension();
  }
});
