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
    loginUsername: {
      type: String,
      value: "Username"
    },
    loginPassword: {
      type: String,
      value: "Password"
    },
    showPassword: {
      type: String,
      value: "Show"
    },
    hidePassword: {
      type: String,
      value: "Hide"
    },
    registerHeadline: {
      type: String,
      value: 'Sign up for Scania Developer Portal'
    },
    registerDescription: {
      type: String,
      value: "Once the account has been created and verified, you will be able to access all Scania's API."
    },
    registerFName: {
      type: String,
      value: "First name"
    },
    registerLName: {
      type: String,
      value: "Last name"
    },
    registerEmail: {
      type: String,
      value: "Email address"
    },
    registerPassword: {
      type: String,
      value: "Password"
    },
    registerButton: {
      type: String,
      value: "Sign up"
    },
    registeredHeadline: {
      type: String,
      value: 'Your user account has been created and needs to be activated.'
    },
    registeredDescriptionEmail: {
      type: String,
      value: 'To activate your user account, please follow the link that has been sent to the following address'
    },
    registeredDescription: {
      type: String,
      value: 'If you do not receive this email, please check your spam filter or re-register.'
    },
    recoverHeadline: {
      type: String,
      value: "Password recovery"
    },
    recoverDescription: {
      type: String,
      value: "Enter your email to recover your password."
    },
    recoverEmail: {
      type: String,
      value: "Email address"
    },
    recoverButton: {
      type: String,
      value: "Recover password"
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
    loginButton: {
      type: String,
      value: 'Log in'
    },
    backButton: {
      type: String,
      value: 'Back to login'
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
    view: {
      type: String,
      value: 'login'
    },
    mainImage: {
      type: String,
      value: 'https://static.scania.com/resources/images/background-images/login-image.jpg',
      observer: 'setMainImage'
    },
    viewAction: {
      type: Function
    }
  },
  currentView: function(prop) {
    this.view = prop.target;
  },
  setView: function(event) {
    var action = this.viewAction || this.currentView;
    action.call(this, event.target.dataset);
  },
  setMainImage: function (path) {
    this.customStyle['--main-image'] = 'url(' + path + ')';
    this.updateStyles();
  }
});
