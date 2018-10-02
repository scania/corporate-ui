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
    var filesize = 0;
    for(var i=0; i<files.length; i++){
      filesize = Math.round(files[i].size/1024);
      this.push('filenames',{
        name: files[i].name,
        size: filesize
      });
    }
    if(this.filenames!=[]) this._isFiles=true;
  }
});
