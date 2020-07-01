# Developing a component

  This is a tutorial how to setup a project with Corporate-UI components with Scania-theme styling.

  Corporate UI is a toolbox with **UI components** that makes it easier to use reusable and modular components for your application.

  Scania-Theme is a packages to contains the Scania specific styling for everyone of those components in Corporate UI toolbox.

## Audience

This is for developers working with web application and have knowledge about web development. Components are avaliable for **react**,**angular** and **vue**

We have setup a few example repositories for react, angular and vue
 - [React]()
 - [Angular]()
 - [Vue]()


 ## Stencil

 To be able to create a component in Corporate-Ui you need to understand what tool we are using to make it happened. We are using a **Web Component compiler** called [StencilJS](https://stenciljs.com/docs/introduction). This is the core for our components and how we build them. You can more in detail in their documentation.

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

## Npm link Corporate-UI and Scania-Theme

  When you have built Corporate-UI and Scania-Theme it is time to make is possible to use it locally in your own application. These step might look a bit confusing, but you will need to do this. This will create a symlink with your corporate-ui and scania-theme folders instead of using the npm version that you will install. This will make it possible to work locally with corporate-ui and scania-theme

  This [linking](https://docs.npmjs.com/cli/link) will create a symlink with your local corporate-ui and scania-theme packages which makes it possible to use those packages.

  Do the following steps:

  1.  Install Corporate-UI and Scania-theme in your project, this will install the latest version that is published on npm.
   ```bash
  > cd <You project folder>
  > npm i corporate-ui
  > npm i scania-theme
  ```

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

To able to use corporate-ui in your application you need to add 

1. Corporate-Ui
 


## Issues that might appear

1. **If you can't clone (Timeout, access for example)**
    - Check so the URL is correct
    - Are you behind a firewall, configure proxy (4xx error, unable to access)
2. **Errors install packages with** `npm install`
    - Using recommended Node version. `node -v`
    - Using recommended NPM version. `npm -v`
    - Are you behind a firewall, configure proxy (4xx error, unable to access)
3. **Error in creating a link locally with** `npm link` 
    - Are you behind a firewall, configure proxy (4xx error, unable to access)
    - Correct packages name on the npm link
    - 




Notes:
- Namespace