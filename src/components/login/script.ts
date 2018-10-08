Polymer({
  is: name,
  properties: {
    headline: {
      type: String,
      value: 'Log in to application'
    },
    description: {
      type: String,
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
    var forms = this.querySelectorAll('form');
    for(var i=0; i<forms.length; i++) {
      forms[i].addEventListener('submit', this.action.bind(this));
    }

  },
  action: function(event) {
    event.preventDefault();

    var action = ( event.target.action || '' ).split('/').pop(),
        detail = { callback: this.currentView.bind(this), target: action + 'Confirm' },
        _event = new CustomEvent(action, { detail: detail });

    document.dispatchEvent(_event);
  },
  currentView: function(prop) {
    this.view = prop.target;
  },
  setView: function(event) {
    this.currentView(event.target.dataset);
  }
});
