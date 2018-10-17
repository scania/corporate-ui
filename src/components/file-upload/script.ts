Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    _isFiles: {
      type: Boolean,
      value: false
    },
    accept: {
      type: String
    },
    fileIdCounter: {
      type: Number,
      value: 0
    },
    files: {
      type: Array,
      value: []
    },
    itemKey: {
      type: Number
    },
    maxFileSize: {
      type: Number
    },
    multiple: {
      type: Boolean,
      value: false
    },
    name: {
      type: String
    },
    statussymbol: {
      type: String,
      value: 'time'
    },
    uploaded: {
      type: Boolean,
      value: false
    }
  },
  addFiles: function(files){
    Array.prototype.forEach.call(files, this.addFile.bind(this));
    this.updateIsFiles();
  },
  addFile: function(file){
    this.fileIdCounter++;
    var fileSizeStatus;
    if(this.maxFileSize){
      fileSizeStatus = (this.updateFileSizeInfo(file.size)==true) ? true : false ;
    }
    if(fileSizeStatus){file.fileSizeStatus = 'File is too big!'}

    this.unshift('files', file);
    console.log(this.files);
    console.log(file);
    //
    // this.push('files',{
    //   file: file,
    //   size: this.calcFileSize(file.size),
    //   id: this.fileIdCounter,
    //   fileSizeStatus: fileSizeStatus
    // });
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
  handleChange: function(e){
    if(this.multiple==false){
      this.files=[];
    }
    this.addFiles(e.srcElement.files);
    e.target.value = null;
  },
  removeFile: function(e){
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    var fileId = e.target.id;

    for(var j=0; j<this.files.length; j++){
      if(this.files[j].id == fileId){
        this.files.splice(j,1);
      }

    }
    this.updateIsFiles();
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
  },
  updateIsFiles: function(){
    this._isFiles = (this.files.length!=0) ? true : false;
    // remove file from files[] if exceed max size
    for(var k=0; k < this.files.length; k++){
      if(this.files[k].fileSizeStatus==true){
        this.files.splice(k,1);
      }
    }
  },
  uploadFiles: function(e){
    this.uploaded = true;
    // this.statussymbol = '&#10004;'; &time;
    this.statussymbol = 'done';
  }
});
