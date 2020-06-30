# Setup a project

  This is a tutorial how to setup a project with Corporate-UI components with Scania-theme styling.

  Corporate UI is a toolbox with **UI components** that makes it easier to use reusable and modular components for your application. 

  Scania-Theme is a packages to contains the Scania specific styling for everyone of those components in Corporate UI toolbox.

## Audience

This is for developers working with web application and have knowledge about web development. Components are avaliable for **react**,**angular** and **vue**

We have setup a few example repositories for react, angular and vue
 - [React]()
 - [Angular]()
 - [Vue]()

## Prerequisties

  - Node.js 10 and up
  - Node packages manager(NPM) for our packages handling
  - Git installed
  - [Github]() account access
  - If you are behind firewall, configure proxy

  How to install Node you can find in their [documentation]() and same regarding [Npm](https://docs.npmjs.com/) and [Git](). If you are unfamiliar with npm and node, we recommend that you read more about it in their documentation.

  After Node.js,npm and git is installad, you can continue!

  Commands to help you see if you have installed these tools:
  ```bash
  > node -v
    v12.18.0
  > npm -v 
    6.4.1
  > git --version
    git version 2.17.0.windows.1
  ```

## Fork

To clone you need to have access to [Github]()

To contribute with a improvement or new component you need to [fork]() our project and make a pull-request from that repository. Reason for that security, so unauthorized people can't push code directly to our repository. To be able to for you need a github account.

1. To fork can use the easiest way by just clicking the image on the top right corner called fork [image](). You can also do it with cli to achieve this.
2. You can go your your own profile on github and find your fork there
3. After the fork is done you can start cloning the project locally to you computer

## Clone

After you have forked you can start cloning. Go to your cli enviorment and do the following: 

  1. Clone both repositories from you fork

  ````bash  
  > git clone https://github.com/<username>/corporate-ui.git
  > git clone https://github.com/<username>/scania-theme.git
  ````
  2. When cloning is done you can


## Issues that might appear

1. If you can't clone (Timeout, access for example)
  - Check so the Url is correct
  - Firewall blocking, configure that