# Setup for Corporate-UI and Scania-Theme

  This is a tutorial how to setup a project with Corporate-UI components with Scania-theme styling.

  Corporate UI is a toolbox with **UI components** that makes it easier to use reusable and modular components for your application. For examples, header, footer, buttons, and dropdowns.

  Scania-theme is a package that contains Scania specific styling for everyone of those components in Corporate UI toolbox. Every component has a unique styling with Scania look and feel.


## Components

 Header,footer or a button are all components in our Design System, the difference between them is how they technically made.

 `<c-header></c-header>` is a web component, while a `<button> Click Me </button>` is a regular HTML element that already exist in the HTML Standard. One easy thing to differentiate between those is by looking at the dash in the element name, for example "c-header", that indicates it is a web-component.

 A web component can be used in the same way as a regular element in the HTML standard. Difference is what is under the hood. You can read more about it here https://developer.mozilla.org/en-US/docs/Web/Web_Components

 All web-components in Scania digital design system have namespace with  `<c-nameOfComponent>`

## Audience

This is for developers working with web application and have knowledge about web development. Components are available for **react**,**angular** and **vue**

We have setup a few example repositories for react, angular and vue
 - [React]()
 - [Angular]()
 - [Vue]()


 ## Stencil

 To be able to create a component in Corporate-Ui you need to understand what tool we are using to make it happened. We are using a **Web Component compiler** called [StencilJS](https://stenciljs.com/docs/introduction). This is the core for our components and how we build them. You can read more in Stencil documentation.

 StencilJS contains features like:

  - Virtual DOM
  - TypeScript
  - JSX

  Example component:

  ```javascript

    import { Component, Prop, h } from '@stencil/core';

    @Component({
    tag: 'my-component',
    })
    export class MyComponent {

      // Indicate that name should be a public property on the component
      @Prop() name: string;

      render() {
        return (
          <p>
            My name is {this.name}
          </p>
        );
      }
    }

  ```

## Prerequisties

  - Node.js 8 and up(Latest stable)
  - Node packages manager(NPM) for our packages handling
  - Git installed
  - [Github]() account access
  - If you are behind firewall, configure proxy

  How to install Node you can find in their [documentation]() and same regarding [Npm](https://docs.npmjs.com/) and [Git](). If you are unfamiliar with npm and node, we recommend that you read more about it in their documentation.After Node.js,npm and git is installad, you can continue!

  Commands to help you see if you have installed these tools:
  ```bash
  > node -v
    v12.18.0
  ```
  ```bash
  > npm -v
    6.4.1
  ```
  ```bash
  > git --version
    git version 2.17.0.windows.1
  ```

  If you come across any problems during this installation guide or feel something needs to be more clear, please contact us our report a issue in our [github]()

---

## Fork

To clone you need to have access to [Github]()

To contribute with a improvement or new component you need to [fork]() our project and make a pull-request from that repository. Reason for that security, so unauthorized people can't push code directly to our repository. To be able to for you need a github account.

1. To fork can use the easiest way by just clicking the image on the top right corner called fork [image](). You can also do it with cli to achieve this.
2. You can go your your own profile on github and find your fork there
3. After the fork is done you can start cloning the project locally to you computer

## Clone

After you have forked you can start cloning. Go to your cli enviorment and do the following:

  Clone both repositories from you fork

  ##### Corporate-ui

   ```bash
    > git clone https://github.com/<username>/corporate-ui.git
    > cd corporate-ui
  ```
  ##### Scania-theme

  ```bash
    > git clone https://github.com/<username>/scania-theme.git
    > cd scania-theme
  ```


---
## Installing npm packages

After the cloning is done, it is time to install all the npm packages. This packages are modules that we are using for different reasons, for example bootstrap, redux and other packages. You can find all our packages in our **package.json** file.

To install our packages you need to be in your project folder, where your package.json file is run `npm install` or `npm i`:

 ##### 1. corporate-ui:

  ```bash
    > cd corporate-ui
    > npm install
  ```

  ##### scania-theme:

  ```bash
    > cd scania-theme
    > npm install
  ```

  _*Warnings(warn) might apprear, often it isn't anything causing problems_

## Building Corporate-UI and Scania-Theme

When you are done with install all the npm packages, it is time to build Corporate-ui and Scania-theme. You will do this by running the command `npm run build`. You can find all our commands in package.json file inside `"scripts": { }`.

##### Corporate-ui

  ```bash
  > npm run build
  ```

  This will build the components with their functionality without any scania styling. For example the header,footer and so on.

##### Scania-theme

  ```bash
  > npm run build
  ```

  This will build the styling for every component with scania styling.

  _*Warnings(warn) might apprear, often it isn't anything causing problems_

## Npm link for Corporate-UI and Scania-Theme

  When you have built Corporate-UI and Scania-Theme it is time to make is possible to use it locally in your own application. These step might look a bit confusing, but you will need to do this. This will create a symlink with your corporate-ui and scania-theme folders instead of using the npm version that you will install. This will make it possible to work locally with corporate-ui and scania-theme

  This [linking](https://docs.npmjs.com/cli/link) will create a symlink with your local corporate-ui and scania-theme packages which makes it possible to use those packages.

  Do the following steps:

  1.  Install Corporate-UI and Scania-theme in your project, this will install the latest version that is published on npm.
   ```bash
  > cd <You project folder>
  > npm i corporate-ui
  > npm i scania-theme
  ```

  SCREENSHOT of packages file

  2. Go to your corporate-ui folder and create a symlink of corporate-ui
  ```bash
    > cd corporate-ui
    > npm link
  ```

  3. Go to your scania-theme folder and create a symlink of corporate-ui
  ```bash
    > cd scania-theme
    > npm link
  ```

  4. Go back to your project directory which has corporate-ui and scania-theme installed. This time we will use the `npm link <repo name>` command again, but this will create the actual symlink for Corporate-ui and Scania-theme packages in your project.

   ```bash
    > cd <Your project folder>
    > npm link corporate-ui
    > npm link scania-theme
  ```

  After this is done, you will be able to run your local Corporate-Ui and Scania-theme.

----

## How to use Corporate-ui and Scania-theme

You need to import ` { addTheme, defineCustomElements } ` from Corporate-Ui package and ` { theme } ` from Scania-theme package after you haver installed them (See section Installing npm packages).


### React

  1. In React you can go to src/index.js and import the packages Corporate-Ui and Scania-theme.

 ```Javascript

  import { addTheme, defineCustomElements } from 'corporate-ui'
  import { theme } from 'scania-theme'

 ```

 2. You need to call `defineCustomElements()`

 ```Javascript
  defineCustomElements();
 ```

 3. After that you need to call `addTheme()` , this function takes one parameter, which is the theme from Scania-theme packages that you imported in step 1.

 ```Javascript
  addTheme(theme)
 ```


### Angular

1.  In Angular, go to **main-ts**(or some other appropriate place), and import the packages Corporate-Ui and Scania-theme.

  ```Javascript
    import { AppModule } from './app/app.module';
    import { environment } from './environments/environment';
    //Import for Corporate-Ui and Scania-theme
    import { defineCustomElements, addTheme } from 'corporate-ui'
    import { theme } from 'scania-theme'
  ```

2. Angular doesn't recognize what a stencil component is, so what you need to do to solve this is to add `CUSTOM_ELEMENTS_SCHEMA` inside app.module.ts

  ```Javascript
    import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

    @NgModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        BrowserModule
      ],
      providers: [],
      bootstrap: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add the Schema
    })

  ```

3. Inside **main.ts**, You need to call `defineCustomElements()`

  ```Javascript
    defineCustomElements();
  ```

4. After that you need to call `addTheme()` , this function takes one parameter, which is the theme from Scania-theme packages that you imported in step 1.

  ```Javascript
    addTheme(theme)
  ```


### Vue

1. In Vue, go to **main.js** and import the packages Corporate-Ui and Scania-theme

  ```Javascript
    import Vue from 'vue'
    import App from './App.vue'
    //Import Corporate-Ui and Scania-theme
    import { addTheme, defineCustomElements } from 'corporate-ui'
    import { theme } from 'scania-theme'

  ```

  2. In the **main.js** you also need to tell the application to ignore custom-element tags such as `<c-header>` by adding this line. Otherwise a warning will be thrown in the console.

  ```Javascript
  //Ignore all components custom-elements named c-*
  Vue.config.ignoredElements = [/c-\w*/];
  ```

  3. You need to call `defineCustomElements()`

  ```Javascript
    defineCustomElements();
  ```

  4. After that you need to call `addTheme()` , this function takes one parameter, which is the theme from Scania-theme packages that you imported in step 1.

  ```Javascript
    addTheme(theme)
  ```

## Add theming

  When former step (How to use Corporate-Ui and Scania-Theme) is done, you can start adding theme to get the styling. Try and add `<c-theme>` component high up in the hierarchy of your application. for example app.js in react. If it works you should see fonts and so on change.

 ```Javascript
  // React example
    function App() {
      return (
        <div className="App">

          // Add Theme like this for the styling
          <c-theme name="scania" global="true"></c-theme>

        </div>
      );
    }

  ```


## Add header,content and footer

After theme is added(Add theming) is done, you can add components `<c-header>`,`<c-content>` and `<c-footer>` in that order. After that you should see the header and footer. Content component will push down the footer below the content.

  ```Javascript
    // React example
    function App() {
      return (
        <div className="App">
          <c-theme name="scania" global="true"></c-theme>
          // Add Header,content and footer component
          <c-header></c-header>
          <c-content>
              // Application content
          </c-content>
          <c-footer></c-footer>
        </div>
      );
    }

  ```

---

## Creating a new component


### Component (Corporate UI)

  Before you start develop a component, don't forget to link Corporate-Ui and Scania, follow the steps in Npm link section

  1. To create a new component you need to go your forked **Corporate-Ui** folder and go to `/src/components/`. Don't forget to create a npm link with both Corporate-Ui and Scania-theme. Create a new folder inside `/src/components/` with the name of the component.

  2. Create a new file called the same as your component, make it a **.tsx** file

  3. Go to the your components .tsx file and import the core function for component called `Components` and `h` 

  ```Javascript
    import { Component, h } from '@stencil/core';
  ```

  4. Now it is time to name your component, add the following line below the import. The `tag` property is where you need the component you are creating. We have rule when naming, you need to use a "c-" before the component name.

  ```Javascript
  @Component({
    tag:'c-new-component' // Name of the component <c-new-component>
  })
  ```
  5. Next step is to add the class for the component. Create a class and export it.

  ```Javascript
    export class NewComponent {
        //Component
    }
  ```

  6. Inside the class add the `render()` function, this is where you return your elements HTML structure. Inside the `render()` you return a tree structure of your component. You **need** to have the html nested inside a parent element on highest level, and you can't have two on the highest level.

   ```Javascript
    export class NewComponent {
      // Add Render()
      render() {
        return(
          // Add your HTML inside the return
          <div>
              Cool Component!
          </div>
        )
      }
    }
  ```

  7. Add your Component in your application

  ```HTML
    <section>
      <h3>A Title of the page React</h3>
      <!--  Add your new component here-->
      <c-new-component></c-new-component>
      <!-- Your application content goes here -->
    </section>
  ```


  8. For the default (non-scania) styling you need to add a another file called `new-component.scss`. This file will contain all non related styling that might come with the component. This styling will follow the component even if you don't use the scania-theme. Keep this file in the same folder as your component `src/components/"new-component"/`. For example a component that should have a dropdown function might be able to use bootstraps global dropdown css. That should be in this file then.

  ```Javascript
    @Component({
      tag:'c-new-component',
      styleUrl: 'new-component.scss'
      })
  ```

  9. Inside the `@Component` decorator you need to add another property called `shadow: true`. This will make the component isolated and not effected by the reset of the global styling.

  ```Javascript
    @Component({
      tag:'c-new-component',
      styleUrl: 'new-component.scss',
      shadow: true
    })
  ```

  10. How to add properties,states or watches you can look at the stencil documentation. Here is an example of a hello world component.

  ```Javascript
    // Example component
    import { Component, h, Prop } from '@stencil/core';

    @Component({
      tag: 'c-new-component',
      styleUrl: 'new-component.scss',
      shadow: true,
    })
    export class NewComponent {
      @Prop() text: string = 'Hello World';

      render() {
        return (
          <div>
            <h2>{this.text} component</h2>
          </div>
        );
      }
    }
  ```

  If you have done everything correctly you should see the component in Action without any specific styling, otherwise check of errors or see if everything is imported and linked correctly. You can see the "Problems that might appear" section


### Styling a component

  To be able to the Scania UI styling(Colors,fonts...) you need to use Scania-theme and add styling from there.


  1. You need **two files for the styling**. Both inside Corporate Ui and Scania Theme

  - You will need one file `components/new-component/new-component.scss`(contains default styling) in corporate-ui
  - one `src/styles/elements/c-new-component.scss`(contains scania specific styling) in scania-theme.

  2. Go to `components/new-component/new-component.scss` inside corporate-ui. You can add any default styling that this component should contain. When you have added styling you just rebuild corporate-ui that you have linked and it should you the new styling.

  ```SCSS
   // Example
    :host {
      color: red;
    }
  ```

  3. To use boostrap styling you need to add the basic foundation, like bootstrap variables. Some of these are required. You can also import styling for example button and so on.

  ```SCSS
    // Required
    @import 'node_modules/bootstrap/scss/functions';
    @import 'node_modules/bootstrap/scss/variables';
    @import 'node_modules/bootstrap/scss/mixins';
    @import 'node_modules/bootstrap/scss/transitions';

    // Optional (example)
    @import 'node_modules/bootstrap/scss/reboot';
    @import 'node_modules/bootstrap/scss/buttons';


    @import '../../components.scss'; //Setting box-model

    :host {
      color: red;
    }
  ```

  4. Go to `src/styles/elements/c-new-component.scss` in scania-theme. Inside this file you will add everything scania related, like colors, fonts ,buttons or any other elements that you might use in your component. 

  Look at the `styles/variables.scss` to see which colors, font-size and other styling that exist.

  ```SCSS
    //Example
    @import '../variables'; // Scania variables
    @import '../components/button'; //Scania button
    @import '../utilities/typography'; //Scania font styling


    :host {
      // You need to add both css variables and scss variables to support IE( https://caniuse.com/#feat=css-variables )
      font-family: $font-family-base;
      font-size: $font-size-base;

      color: $primary; // You need to add both for IE suport
      color: Var(--primary);

      margin: 2rem;
      padding: 3rem;
    }
  ```
5. Before you can use your scss file that you created in scania-theme, you need to add some properties and methods that a required. Go to your components tsx file, `new-component.tsx`. This props and state are create to handle how we add the styling for the component, so it doesn't leak out to other parts of the application. For example if you only want to use the component and not the reset of the styling that is applied with `<c-theme name='name' global='false'>`. 

 ```Javascript
  //Example

  export class NewComponent {
    // Add this before the render method
    @Prop({ context: 'store' }) ContextStore: any;

    @Prop({ mutable: true }) theme: string;

    @State() store: any;

    @State() tagName: string;

    @State() currentTheme = { components: [] };

    @State() style: Array<CSSStyleSheet>;

    @Element() el;

 ```


6. When you have add the correct props, states and element, you can add a watcher for the theme property.

```Javascript
 @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.current;
    this.currentTheme = this.store.getState().theme.items[this.theme];
  }
```

7.  You need to import a helper function called `themeStyle`


```Javascript
import { themeStyle } from '../../helpers/themeStyle';
```


8. Before the render function you need to add method `componentWillLoad()` and `componentDidLoad() `. This will set the theme for your component.

```Javascript
  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => {
      this.setTheme();

      themeStyle(this.currentTheme, this.tagName, this.style, this.el);
    });

    if (!(this.el && this.el.nodeName)) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  componentDidLoad() {

    this.style = this.el.shadowRoot.adoptedStyleSheets || [];

    themeStyle(this.currentTheme, this.tagName, this.style, this.el);

  }
```


9. Example using Button primary

  ```JSX
   return[
      <div>
        <h1>Cool Headline</h1>
        <button class="btn btn-primary">Click Me!</button>
        <p>Awesome text</p>
      </div>
    ]
  ```

  10. Application example in angular, you should see two primary buttons, one inside the component and one outside using the same styling from scania-theme.

   ```HTML
      <c-theme name='scania' global='true'></c-theme>
      <c-header></c-header>
      <c-content>
        <section>
          <button class="btn btn-primary">Accept</button>
          <c-new-component></c-new-component>
          <!-- Your application content goes here -->
        </section>
      </c-content>
      <c-footer></c-footer>
   ```


  Screenshot added

If you have added everything above, you should see a button with the scania primary color from scania-theme.

---

## Problems that might appear

* **If you can't clone (Timeout, access for example)**
    - Check so the URL is correct
    - Are you behind a firewall, configure proxy (4xx error, unable to access)
* **Errors install packages with** `npm install`
    - Using recommended Node version. `node -v`
    - Using recommended NPM version. `npm -v`
    - Are you behind a firewall, configure proxy (4xx error, unable to access)
    - Check which version of those packages you are trying to download, if it exist on npm
* **Error in creating a link locally with** `npm link`
    - Correct packages name on the npm link
    - Have you cloned Corporate Ui and/or Scania-Theme
* **Missing component or styling**
    - Do you have **Scania-theme installed**
    - Are you using `<c-theme></c-theme>` component
    - Check so styling isn't overriden by anything
    - You created npm link with scania-theme and corporate-ui
    - Call `defineCustomElements()` and `addTheme()` from Corporate-Ui package
    - Some version of corporate-ui and scania-theme isn't compatible together
    - Have you set global attribute to true on `<c-theme global=true>`
    - Have you set the name attribute to scania(or if you have your own theme) `<c-theme name='scania'>`
    - Is everything you are using in the component compatible with the browser, you can check [caniuse.com](caniuse.com)
    - Are you using correct version of Corporate-Ui or Scania-theme, some versions might not contain what you are looking for
