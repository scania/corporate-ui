Polymer({
  is: name,
  properties: {
    variation: 0,
    loginSelectHeadline: {
        type: String,
        value: 'Log in to application'
    },
    loginSelectDescription: {
        type: String,
        value: 'Choose a login service.'
    },
    loginHeadline: {
        type: String,
        value: 'Log in to application'
    },
    loginDescriptionRegister: {
        type: String,
        value: "Haven't registered yet?"
    },
    loginDescriptionRecover: {
        type: String,
        value: "Have you"
    },
    registerHeadline: {
        type: String,
        value: 'Sign up for Scania Developer Portal'
    },
    registerDescription: {
        type: String,
        value: "Once the account has been created and verified, you will be able to access all Scania's API."
    },
    recoverHeadline: {
        type: String,
        value: "Password recovery"
    },
    recoverDescription: {
        type: String,
        value: "Enter your email to recover your password."
    },
    recoveredHeadline: {
        type: String,
        value: "Password recovery"
    },
    recoveredDescription: {
        type: String,
        value: "Your password have been reset and sent to your email."
    },
    toRegister: {
        type: String,
        value: 'Create an account.'
    },
    toRecover: {
        type: String,
        value: 'forgotten your password?'
    },
    cookieMessage: {
        type: String,
        value: 'This portal uses cookies. By logging in, you are allowing cookies to be saved on your computer.'
    },
    termsMessage: {
        type: String,
        value: 'By signing up you agree to'
    },
    toTerms: {
        type: String,
        value: 'terms and conditions.'
    },
    loginAction: {
        type: String,
        value: 'login'
    },
    // Should be moved to a notification component
    loginMessage: {
        type: String
    },
    register: {
        type: Boolean
    },
    terms: {
        type: Boolean
    },
    recover: {
        type: Boolean
    },
    showLoginMessage: {
        type: Boolean
    },
    view: {
        type: String,
        value: 'login'
    },
    mainImage: {
        type: String,
        value: 'https://static.scania.com/resources/images/background-images/login-image.jpg',
        observer: 'setMainImage'
    }
  },
  currentView: function(prop) {
    this.view = prop.target;
  },
  setView: function(event) {
    this.currentView(event.target.dataset);
  },
  setMainImage: function (path) {
      this.customStyle['--main-image'] = 'url(' + path + ')';
      this.updateStyles();
  }
});
