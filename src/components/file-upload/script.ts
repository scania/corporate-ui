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
    display: {
      type: String
    },
    disableSimpleBtn: {
      type: String,
      value:'disabled'
    },
    errorTitle: {
      type: String
    },
    files: {
      type: Array,
      value: []
    },
    filesUploaded: {
      type: Array,
      value: []
    },
    fileLimitInfo: {
      type: String
    },
    fileAcceptInfo: {
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
    showDropArea: {
      type: Boolean,
      value: true
    },
    simpleInputVal: {
      type: String,
      value:""
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

    if(files.length==1){
      this.simpleInputVal = files[0].name;
    } else {
      this.simpleInputVal = this.files.length + ' files';
    }

    this.updateIsFiles();
  },
  addFile: function(file){
    // check if file has been added or uploaded before
    var fileExist = this.isFileExist(file);

    if(!fileExist){
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

        // this.errorTitle = 'Unable to upload following files';
        var errorFiles = document.createElement('p');
        errorFiles.innerHTML = file.name + '- '+ this.calcFileSize(file.size) + ' - ' + file.fileErrorMessage;
        errorFiles.classList.add('help-block');
        Polymer.dom(this.$.fileerror).appendChild(errorFiles);
        Polymer.dom(this.$.fileerror).classList.remove('hidden');
      } else {
        file.id = this.fileId;
        file.fileSize = this.calcFileSize(file.size);
        this.unshift('files', file);
        this.fileId++;
      }
    }

  },
  allowDrop: function(ev){
    ev.preventDefault();
    Polymer.dom(this.$.dropArea).classList.add('highlight');
    ev.dataTransfer.dropEffect = "move";
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
  clickFileInput: function(e){
      Polymer.dom(this.root).querySelector('#fileinput').click();
  },
  dropFile: function(ev){
    ev.preventDefault();
    this.removeHighlight();
    var dt = ev.dataTransfer;
    var totalFiles = dt.files.length;

    if(this.multiple){
      Polymer.dom(this.root).querySelector('#fileinput').files = dt.files;
      this.addFiles(dt.files);
    } else {
      if(totalFiles==1){
        if(this.files.length>0){
          this.files=[];
        }
        Polymer.dom(this.root).querySelector('#fileinput').files = dt.files;
        this.addFiles(dt.files);
      } else {
        // reject drop
        ev.dataTransfer.clearData();
        // show warning
        this.errorTitle = "No multiple files allowed";
      }
    }
  },
  handleChange: function(e){
    if(this.multiple==false || this.display=='inline'){
      this.files=[];
    }
    this.addFiles(e.srcElement.files);
  },
  isFileExist: function(file){
    var returnVal = false;
    for(var j=0; j<this.files.length; j++){
      if(this.files[j].name == file.name && this.files[j].size == file.size){
        returnVal = true;
      }
    }
    if(this.filesUploaded.length>0){
      for(var i=0; i<this.filesUploaded.length; i++){
        if(this.filesUploaded[i].name == file.name && this.filesUploaded[i].size == file.size){
          returnVal = true;
        }
      }
    }
    return returnVal;
  },
  removeHighlight: function(){
    Polymer.dom(this.$.dropArea).classList.remove('highlight');
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
    if(!this.isFiles && this.filesUploaded.length==0){
      Polymer.dom(this.root).querySelector('#fileinput').value = null;
    }
  },
  resetInput: function(){
    this.simpleInputVal = '';
    this.files=[];
    Polymer.dom(this.root).querySelector('#fileinput').value = null;
    this.updateIsFiles();
  },
  setProgressBarValue: function(file,progress){
    var parentEl, pbVal;
    if(this.display=='inline'){
      parentEl = '#simpleInput';
      pbVal = ((this.totalProgress+progress)/this.totalFileUpload) * 100;
    } else {
      parentEl = '#setPb'+file.id;
      pbVal = progress;
      this.uploadBtnText = 'Uploading... ';
      this.$$(parentEl).querySelector('.file-size').innerHTML = 'Uploading...';
    }

    if(pbVal==0){
      this.$$(parentEl).querySelector('c-progress-bar').classList.remove('hidden');
    }

    this.$$(parentEl).querySelector('c-progress-bar').setAttribute('value',pbVal);
    this.$$(parentEl).querySelector('.file-meta').classList.add('uploading');

    if(progress==100){
      this.totalProgress += progress;
      this.uploadFileDone(file);
      if(this.display!='inline'){
        this.$$(parentEl).classList.add('done');
        this.$$(parentEl).querySelector('.file-size').innerHTML = 'Uploaded';
      }
    }

    if(pbVal==100){
      this.$$(parentEl).classList.add('done');
      this.uploadFilesDone();
      if(this.display=='inline'){
        this.simpleInputVal = 'Files uploaded';
        this.$$(parentEl).querySelector('input[type="text"]').setAttribute('disabled','disabled') ;
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
  },
  updateIsFiles: function(){
    this.uploadBtnText = 'Upload '+this.files.length+ (this.files.length==1?' file':' files');

    if(this.files.length==0){
      this.simpleInputVal = '';
      this.disableSimpleBtn = 'disabled';
    } else { this.disableSimpleBtn = '';}

    this.isFiles = (this.files.length!=0) ? true : false;
  },
  uploadFiles: function(event){
    var detail= {files: this.files, name: this.name},
        evt = new CustomEvent('uploadFiles', {detail: detail});
    document.dispatchEvent(evt);
    this.totalFileUpload = this.files.length*100;
    this.totalProgress = 0;
  },
  uploadFileDone: function(file){
    var elementPos = this.files.map(function(x) {return x.id; }).indexOf(file.id);
    this.files.splice(elementPos, 1);
    this.unshift('filesUploaded', file);
    this.updateIsFiles();
  },
  uploadFilesDone: function(){
    if(!this.multiple){
      this.showDropArea = false;
    }
  }
});
