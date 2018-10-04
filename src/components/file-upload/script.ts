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
    fileList: {
      type: Array,
      value: []
    },
    _isFiles: {
      type: Boolean,
      value: false
    },
    multiple: {
      type: Boolean,
      value: false
    },
    itemKey: {
      type: Number
    },
    fileIdCounter: {
      type: Number,
      value: 0
    }
  },
  handleChange: function(e){
    if(this.multiple==false){
      this.fileList=[];
    }
    var files = e.srcElement.files;
    var filesize = 0;
    for(var i=0; i<files.length; i++){
      filesize = Math.round(files[i].size/1024);
      this.fileIdCounter++;
      this.push('fileList',{
        file: files[i],
        size: filesize,
        id: this.fileIdCounter
      });
    }
    this.updateIsFiles();
    e.target.value = null;
    console.log(this.fileList);
  },
  removeFile: function(e){
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    var fileId = e.target.id;

    for(var j=0; j<this.fileList.length; j++){
      if(this.fileList[j].id == fileId){
        this.fileList.splice(j,1);
      }

    }
    console.log(e);
    this.updateIsFiles();
  },
  updateIsFiles: function(){
    this._isFiles = (this.fileList.length!=0) ? true : false;
  },
  sortFilenames: function(a,b){
    var aId = a.id;
    var bId = b.id;

    if(aId < bId){
      return -1;
    }
    if(aId > bId){
      return 1;
    }
    return 0;
  }
});
