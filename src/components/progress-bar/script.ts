Polymer({
  is: name,
  properties: {
    fullbleed: {
      type: Boolean,
      value: true
    },
    value: {
      type: Number,
      value: 0,
      notify:true
    },
    context: {
      type:String
    },
    striped:{
      type: String
    }
  }
});
