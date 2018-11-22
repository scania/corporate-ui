
## Login component
This component is based on 5 views containing different actions for the user.
Every view will describe what the user is expected to provide.

### Views
- Login (Here the user will write userid and password to access further)
- Register (Here the user will write a desired userid and password to register)
    - Confirm (A confirmation message will show a success view)
- Recover (Here the user will be able to select a userid to recover a lost access)
    - Confirm (A confirmation message will show a success view)

### The user interaction will be as follow:
First view will be the login. Where the user can choose to either: login (primary action) or go to register/recover views.
In both register and recover view the user can either go back to the login view or choose to register/recover action.

### Developer API
As a developer you can use this component by adding the component (```<c-login></c-login>```) to a page.
By doing that you will have access to the main view (login/register/recover) automatically and can toggle between these.

To implement a authentication logic for these views to use simply add chosen listener to the document.
For example to add the login logic add:
document.addEventListener('login', Login, false);
Inside the Login method put the desired authentication method together with what view to display on success/error.

When the register/recover events are triggered these events will contain a callback method to use on success state.
For example:
```javascript
event.detail.callback({
    status: 200,
    message: 'User was successfully registered',
    target: event.detail.target
});
```
