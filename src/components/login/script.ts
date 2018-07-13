Polymer({
  is: name,
  properties: {
    headline: {
      type: String,
      value: 'Log in to application'
    },
    description: {
      type: String
      value: "Haven't registered yet?"
    },
    variation: 0,
    // Should be moved to a notification component
    message: {
      type: String
    },
    messageType: {
      type: String
    },
    showMessage: {
      type: Boolean,
      value: false
    },
    view: {
      type: String,
      value: 'login'
    }
  },
  ready: function() {
    var self = this;
    /*this.querySelector('form.login')
      .addEventListener('submit', function(event) {
        event.preventDefault();

        var inputs = this.querySelectorAll('input'),
            data = {};

        for (var i = 0; i < inputs.length; i++) {
         data[inputs[i].name] = inputs[i].value;
        }

        self.action('login', data);
      });*/

    var forms = this.querySelectorAll('form');
    for(var i=0; i<forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
        self.action(this.id, { action: event.target.dataset.target, component: self });
      });
    }

    // Should be moved to a notification component
    document.addEventListener('notify', function(event:any) {
      self.showMessage = true;
      self.message = event.data.message;
      self.messageType = event.data.type === 'error' ? 'danger' : event.data.type;
    });
  },
  action: function(action, data) {
    /*var event = document.createEvent('Event');
    event.initEvent(action, true, true);
    this.dispatchEvent(event);*/
    window['AppEventStore'].apply({ name: 'login', action: action, data: data || {} });
  },
  setView: function(event) {
    this.view = event.target ? event.target.dataset.target : event;
  }
});