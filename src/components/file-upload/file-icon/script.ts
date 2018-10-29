Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    colorGroup: {
      type: String
    },
    filename: {
      type: String
    },
    extension: {
      type: String
    }
  },
  getExtension: function(){
    this.extension = this.filename.match(/[^\.]*$|$/)[0];
  },
  ready: function(){
    this.getExtension();
  }
});
