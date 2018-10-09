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
    },
    maxFileSize: {
      type: Number
    }
  },
  handleChange: function(e){
    if(this.multiple==false){
      this.fileList=[];
    }
    var fileExceed = false;
    var files = e.srcElement.files;
    var filesize = 0;
    for(var i=0; i<files.length; i++){
      filesize = this.calcFileSize(files[i].size);
      this.fileIdCounter++;
      if(this.maxFileSize){
        fileExceed = this.updateFileSizeInfo(files[i].size);
      }
      this.push('fileList',{
        file: files[i],
        size: filesize,
        id: this.fileIdCounter,
        fileSizeStatus: fileExceed
      });
    }
    console.log(this.fileList);
    this.updateIsFiles();
    e.target.value = null;
  },
  calcFileSize: function(number){
    if(number < 1024) {
      return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  },
  removeFile: function(e){
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    var fileId = e.target.id;

    for(var j=0; j<this.fileList.length; j++){
      if(this.fileList[j].id == fileId){
        this.fileList.splice(j,1);
      }

    }
    this.updateIsFiles();
  },
  updateIsFiles: function(){
    this._isFiles = (this.fileList.length!=0) ? true : false;
    // remove file from fileList if exceed max size
    for(var k=0; k < this.fileList.length; k++){
      if(this.fileList[k].fileSizeStatus==true){
        this.fileList.splice(k,1);
      }
    }
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
  },
  updateFileSizeInfo: function(fileSize){
      var max = this.maxFileSize * 1024;
      return fileSize > max ? true : false;
  }
});
