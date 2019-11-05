export default {
  title: 'c-theme',
  description: ['Theme component will set the theme styling for all other components by default. You can set the theme name attribute to set a theme. Put the theme component anywhere in your page inside the body tag. We use <a href="https://redux.js.org/" target="_blank">Redux</a> to store the theme value in a global store. The other components then subscribed to the store and will be updated for any changes.',
    'Example use:',
    '<pre>&lt;c-theme name="scania"&gt;&lt;/c-theme&gt;</pre>',
    '<h4>Bootstrap custom events</h4>',
    'All custom events for Bootstrap plugins are available globally in the CorporateUi.$ object. For example, this is how to trigger Bootstrap modal event:',
    '<pre>CorporateUi.$(\'#exampleModal\').modal();</pre>'],
};
