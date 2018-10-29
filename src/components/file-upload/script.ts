Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    accept: {
      type: String
    },
    browseButton: {
      type: Boolean,
      value: false
    },
    showDropArea: {
      type: Boolean,
      value: true
    },
    files: {
      type: Array,
      value: []
    },
    fileLimitInfo: {
      type: String
    },
    fileAcceptInfo: {
      type: String
    },
    errorTitle: {
      type: String
    },
    fileId: {
      type:Number,
      value: 0
    },
    isFiles: {
      type: Boolean,
      value: false
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
    totalFileUpload: {
      type: Number
    },
    totalProgress: {
      type: Number,
      value: 0
    },
    uploadBtnText: {
      type: String
    }
  },
  ready: function(){
    if(this.maxFileSize){
      this.fileLimitInfo = 'Maximum file size ' + this.maxFileSize + 'KB';
    }
    if(this.accept){
      this.fileAcceptInfo = 'Only '+this.accept+' files are allowed';
    }
  },
  addFiles: function(files){
    Array.prototype.forEach.call(files, this.addFile.bind(this));
    this.updateIsFiles();
  },
  addFile: function(file){
    var fileExceedsMax, fileExt, regex, allowFileType;
    // javascript regex syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    // match all characters after . at the end of input
    fileExt = file.name.match(/\.[^\.]*$|$/)[0];

    file.extension = fileExt;
    // if maximum file size is set
    if(this.maxFileSize){
      fileExceedsMax = (this.updateFileSizeInfo(file.size)==true) ? true : false ;
    } else {fileExceedsMax=false;}
    // if file accept attribute is set
    if(this.accept){
      // for example accept="image/*" will create regex = /^(image\/.*)$/i
      regex = new RegExp('^(' + this.accept.replace(/[, ]+/g, '|').replace(/\/\*/g, '/.*') + ')$', 'i');
      allowFileType = (regex.test(file.type) || regex.test(fileExt));
    } else {allowFileType=true;}

    if(fileExceedsMax || !allowFileType){

      if(fileExceedsMax) file.fileErrorMessage = 'Size exceeds permissible upload limit';
      if(!allowFileType) file.fileErrorMessage = 'File type not allowed';

      this.errorTitle = 'Unable to upload following files';
      var errorFiles = document.createElement('div');
      errorFiles.innerHTML = file.name + '- '+ this.calcFileSize(file.size) + ' - ' + file.fileErrorMessage;
      Polymer.dom(this.$.fileerror).appendChild(errorFiles);
    } else {
      file.id = this.fileId;
      file.fileSize = this.calcFileSize(file.size);
      this.unshift('files', file);
      this.fileId++;
    }
    this.browseButton = true;
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
  allowDrop: function(ev){
    ev.preventDefault();
    Polymer.dom(this.$.dropArea).classList.add('highlight');
    ev.dataTransfer.dropEffect = "move";
  },
  dropFile: function(ev){
    ev.preventDefault();
    this.removeHighlight();
    var dt = ev.dataTransfer;
    var totalFiles = dt.files.length;

    if(this.multiple){
      this.addFiles(dt.files);
    } else {
      if(totalFiles==1){
        if(this.files.length>0){
          this.files=[];
        }
        this.addFiles(dt.files);
      } else {
        // reject drop
        ev.dataTransfer.clearData();
        // show warning
        console.log('No multiple files allowed');
      }
    }
  },
  removeHighlight: function(){
    Polymer.dom(this.$.dropArea).classList.remove('highlight');
  },
  handleChange: function(e){
    if(this.multiple==false){
      this.files=[];
    }
    this.addFiles(e.srcElement.files);
    e.target.value = null;
  },
  removeFile: function(e){

    var _id = e.target.id;
    var toRemove = '#setPb'+_id;
    this.$$(toRemove).parentNode.removeChild(this.$$(toRemove));

    for(var j=0; j<this.files.length; j++){
      if(this.files[j].id == _id){
        this.splice('files', j, 1);
      }
    }

    this.updateIsFiles();
  },
  setProgressBarValue: function(f,p){
    var parentEl = '#setPb'+f.id;
    this.totalProgress += p;
    var pbVal = (this.totalProgress/this.totalFileUpload*100) ;

    if(p==0){
      this.$$('c-progress-bar').classList.remove('hidden');
    }
    this.$$('c-progress-bar').setAttribute('value',pbVal);
    this.$$(parentEl).querySelector('.file-meta').classList.add('uploading');

    this.uploadBtnText = 'Uploading... ';
    this.$$(parentEl).querySelector('.file-size').innerHTML = 'Uploading...';
    if(p==100){
      this.uploadFileDone(f,parentEl);
      this.$$(parentEl).querySelector('.file-size').innerHTML = 'Uploaded';
    }
    if(pbVal==100){
      this.uploadFilesDone();
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
  },
  updateIsFiles: function(){
    this.uploadBtnText = 'Upload '+this.files.length+ (this.files.length==1?' file':' files');
    this.isFiles = (this.files.length!=0) ? true : false;
  },
  uploadFiles: function(event){
    var detail= {files: this.files},
        evt = new CustomEvent('uploadFiles', {detail: detail});
    document.dispatchEvent(evt);
    this.totalFileUpload = this.files.length*100;
    this.totalProgress = 0;
  },
  uploadFileDone: function(f,parentEl){
    this.$$(parentEl).querySelector('.file-meta').classList.add('done');
    this.$$(parentEl).querySelector('.file-icon').classList.add('done');
    var elementPos = this.files.map(function(x) {return x.id; }).indexOf(f.id);
    this.files.splice(elementPos, 1);
    this.updateIsFiles();
  },
  uploadFilesDone: function(){
    if(!this.multiple){
      this.browseButton = false;
      this.showDropArea = false;
    }
  }
});
