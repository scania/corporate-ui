[![Build Status](https://travis-ci.com/scania/corporate-ui-dev.svg?branch=master)](https://travis-ci.com/scania/corporate-ui-dev)
[![Join Slack](https://img.shields.io/badge/slack-join-%23dd3072.svg)](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/license/scania/corporate-ui-dev.svg?style=flat)

# Corporate UI Development Repository

In this repository we're developing the next generation components for Corporate UI. We're improving a lot of our findings that we've done implementing the current production version of the library: https://github.com/scania/corporate-ui

## Table of contents

- [Quick start](#quick-start)
- [Styling](#styling)
- [Setup local environment](#setup-local-environment)
- [Wiki](#wiki)
- [Learn more](#learn-more)
  - [Focus area](#focus-area)
  - [Purpose](#purpose)
  - [Tech stack](#tech-stack)
  - [Testing](#testing)
- [Contributing](#contributing)
- [Community](#community)
- [License](#license)

## Quick start

Several options to add corporate-ui in the project: 

1. Add via CDN, link to the script by adding the following to the `<head></head>`.

```html
<script src="https://static.scania.com/build/global/4.x/corporate-ui.js"></script>
```
Replace the version number with the [available releases](https://github.com/scania/corporate-ui-dev/releases)

2. Install corporate-ui via NPM package by running the command below.

```
npm i corporate-ui-dev
```

Import component as a module with `defineCustomElements` function.

```js
import { defineCustomElements } from 'corporate-ui-dev/dist/define';

defineCustomElements(['c-theme','c-footer', 'c-content']);
// to import all components pass an 'all' value
// defineCustomElements('all');
```

See project examples for [Angular](https://github.com/scania/corporate-ui-angular) and [React](https://github.com/scania/corporate-ui-react).

## Styling

A major change in the new setup is the configuration for styling. It enables the possibility to implement different brands styling with the use of `c-theme` component. The styling is now available as a separate package. All assets such as favicons, fonts, logotype, and wordmarks, now are added in the theme and are available in the theme package. 

To apply the styling, you need to add a theme package and use `c-theme` component. Check out [Scania theme repository](https://github.com/scania/scania-theme/) for detail documentation.

## Setup local environment

- Clone the Corporate UI Dev repo: `git clone https://github.com/scania/corporate-ui-dev.git`
- Download and install node.js: https://nodejs.org/en/
- If you're behind a firewall, CONFIGURE THE PROXY
- From the corporate-ui-dev folder, run `npm i` to install package dependencies
- Start the local setup by running `npm start`
- Open your browser and go to [http://localhost:1337](http://localhost:1337)

## Requirements

**NodeJS: use 8.15 or newer stable version of node**

## Wiki

[Github wiki](https://github.com/scania/corporate-ui-dev/wiki) includes: 
- Project examples in HTML, Angular, and React
- Project structure
- Components library
- Components status
- Browser support, and more. 

## Learn more

Corporate-UI 4 alpha: [What's new?](https://github.com/scania/corporate-ui-dev/releases/)

### Focus area

Focus is right now set on getting a solid architecture in place. Any of the basic components that you'll be able to view in this repository is not finalized when it comes to design and CSS values.

### Purpose

Corporate UI is a library for using and building web components as custom elements. Custom elements enables developers to in a really easy way apply branding guidelines and apply interaction patterns without having to build them all from scratch.

### Tech stack

Corporate UI outputs browser native code such as JavaScript, CSS and HTML. Although, behind the scenes a variety of tools are used. The technical infrastructure currently includes; Bootstrap, Sass, StencilJS, Redux, TSX, Travis, NPM, Gulp, esLint, Prettier, Jest, Puppeteer, Webpack and Storybook.

### Testing

Testing the components is done using the Stencil testing setup that includes unit test and End-to-End test. Both tests use Jest as the JavaScript testing solution. The browser environment for end-to-end testing is done using Puppeteer.

To test locally:

`npm test`

## Contributing

Please read through our [contributing guidelines](https://github.com/scania/corporate-ui-dev/blob/master/CONTRIBUTING.md) for the directions to create a pull request and coding standard.

- [Report bug](https://github.com/scania/corporate-ui-dev/issues/new/choose)
- [Request feature](https://github.com/scania/corporate-ui-dev/issues/new?assignees=&labels=Feature&template=feature_request.md&title=Feature+-+%22title+text%22)

## Community

Get in touch with the team and the community:
- [Join us on slack](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)
- [Teams](https://teams.microsoft.com/l/team/19%3a1257007a64d44c64954acca27a9d4b46%40thread.skype/conversations?groupId=79f9bfeb-73e2-424d-9477-b236191ece5e&tenantId=3bc062e4-ac9d-4c17-b4dd-3aad637ff1ac)


## License

All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.
