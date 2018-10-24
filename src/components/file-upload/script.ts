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
    files: {
      type: Array,
      value: []
    },
    fileLimitInfo: {
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
    }
  },
  ready: function(){
    if(this.maxFileSize){
      this.fileLimitInfo = 'Maximum file size ' + this.maxFileSize + 'KB';
    }
  },
  addFiles: function(files){
    Array.prototype.forEach.call(files, this.addFile.bind(this));
    this.updateIsFiles();
  },
  addFile: function(file){
    var fileSizeStatus;

    if(this.maxFileSize){
      fileSizeStatus = (this.updateFileSizeInfo(file.size)==true) ? true : false ;
    }

    if(fileSizeStatus){
      this.errorTitle = 'Unable to upload following files';
      file.fileSizeStatus = 'Size exceeds permissible upload limit';
      var errorFiles = document.createElement('div');
      errorFiles.innerHTML = file.name + '- '+ this.calcFileSize(file.size) + ' - ' + file.fileSizeStatus;
      Polymer.dom(this.$.fileerror).appendChild(errorFiles);

      // if file type not allowed show error

    } else {
      file.id = this.fileId;
      file.fileSize = this.calcFileSize(file.size);
      this.unshift('files', file);
      this.fileId++;
    }
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
    this.addFiles(dt.files);
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
    var elId, par;
    par = '#setPb'+f.id;
    if(p==0){
      this.$$(par).querySelector('c-progress-bar').classList.remove('hidden');
    }
    elId = '#setPb'+f.id+' c-progress-bar';
    document.querySelector(elId).setAttribute('value',p);

    if(p==100){
      this.$$(par).querySelector('.fa-check-circle').classList.remove('hidden');
      this.$$(par).querySelector('.fa-times').classList.add('hidden');
      var elementPos = this.files.map(function(x) {return x.id; }).indexOf(f.id);
      this.files.splice(elementPos, 1);
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
    this.isFiles = (this.files.length!=0) ? true : false;
  },
  uploadFiles: function(event){
    var detail= {files: this.files},
        evt = new CustomEvent('uploadFiles', {detail: detail});
    document.dispatchEvent(evt);
  }
});
