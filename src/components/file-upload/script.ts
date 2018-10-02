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
    },
    _isFiles: {
      type: Boolean,
      value: false
    },
    multiple: {
      type: Boolean,
      value: false
    }
  },
  handleChange: function(e){
    if(this.multiple==false){
      this.filenames=[];
    }
    var files = e.srcElement.files;
    for(var i=0; i<files.length; i++){
      this.push('filenames',{name: files[i].name});
    }
    if(this.filenames!=[]) this._isFiles=true;
  }
});
