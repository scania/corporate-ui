Polymer({
  is: name,
  properties: {
    headline: {
      type: String
    },
    description: {
      type: String
    },
    // Should be moved to a notification component
    message: {
      type: String
    },
    messageType: {
      type: String
    },
    event: {
      type: String,
      value: 'login'
    },
    forgotpassword: {
      type: Boolean,
      value: false
    },
    showMessage: {
      type: Boolean,
      value: false
    }
  },
  ready: function() {
    var self = this;
    this.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();

      var inputs = this.querySelectorAll('input'),
          data = {};

      for (var i = 0; i < inputs.length; i++) {
       data[inputs[i].name] = inputs[i].value;
      }

      self.login(data);
    });

    // Should be moved to a notification component
    document.addEventListener('notify', function(event) {
      self.showMessage = true;
      self.message = event.data.message;
      self.messageType = event.data.type === 'error' ? 'danger' : event.data.type;
    });
  },
  login: function(data) {
    var self = this;
    AppEventStore.apply({ name: 'login', action: this.event, data: data });
  },
  forgotpassword: function() {
    AppEventStore.apply({ name: 'login', action: 'forgotpassword' });
  }
});