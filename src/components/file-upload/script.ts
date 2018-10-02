Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    name: {
      type: String
    },
    filenames: {
      type: Array,
      value:[]
    }
  },
  handleChange: function(e){
    var files = e.srcElement.files;
    for(var i=0; i<files.length; i++){
      this.push('filenames',{name: files[i].name});
    }
  }
});
