[![Build Status](https://travis-ci.com/scania/corporate-ui-dev.svg?branch=master)](https://travis-ci.com/scania/corporate-ui-dev)
[![npm version](http://img.shields.io/npm/v/corporate-ui-dev.svg?style=flat&color=1081C2)](https://npmjs.org/package/corporate-ui-dev)
[![Github release](https://img.shields.io/github/v/tag/scania/corporate-ui-dev.svg?label=release&color=1081C2)](https://github.com/scania/corporate-ui-dev/releases)
[![Components library](https://img.shields.io/badge/Components%20library-master-f4871a.svg)](https://d1kybmg72qo0dt.cloudfront.net/build/global/branch/master/www/index.html?selectedKind=Info&selectedStory=Corporate%20UI&full=0&addons=0&stories=1&panelRight=0)
[![Join Slack](https://img.shields.io/badge/slack-join-%23dd3072.svg)](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/license/scania/corporate-ui-dev.svg?style=flat)

# Corporate UI Development Repository

In this repository we're developing the next generation components for Corporate UI. We're improving a lot of our findings that we've done implementing the current production version of the library: https://github.com/scania/corporate-ui

**Demo page**

[Simple HTML ↗](https://codepen.io/corporate-ui/pen/OYmqpr) | [Angular ↗](https://github.com/scania/corporate-ui-angular) | [React ↗](https://github.com/scania/corporate-ui-react) | [Vue ↗](https://github.com/scania/corporate-ui-vue)

## Wiki

[Github wiki](https://github.com/scania/corporate-ui-dev/wiki) includes: 
- Project focus and structure
- Upgrade from version 3 to 4
- Components status
- Browser support, and more. 


## Quick start

Several options to add corporate-ui in the project: 

1. Add via CDN, link to the script by adding the following to the `<head></head>`.

Make sure to include scania-theme script BEFORE the corporate-ui script.

```
<script src="https://static.scania.com/build/global/themes/scania/1.x/scania-theme.js"></script>
<script src="https://static.scania.com/build/global/4.x/corporate-ui.js"></script>
```
Replace `x` with available releases.

2. Install corporate-ui via NPM package by running the command below.

```
npm i corporate-ui-dev
npm i scania-theme
```

Import component as a module with `defineCustomElements` function.

```js
import { defineCustomElements, addTheme } from 'corporate-ui-dev';
import { theme as scania } from 'scania-theme'; 

defineCustomElements(['c-theme', 'c-footer', 'c-content']);
addTheme(scania);

// to import all components pass an 'all' value
// defineCustomElements('all');
```

## Developing components

#### 1. Prerequisites

- Download and install node.js: https://nodejs.org/en/
  
  **NodeJS: use 8.15 or newer stable version of node**

- If you're behind a firewall, CONFIGURE THE PROXY

#### 2. Getting the code

- Clone the Corporate UI Dev repo and install package dependencies: 
```shell
git clone https://github.com/scania/corporate-ui-dev.git
cd path/to/corporate-ui-dev
npm i
```

#### 3. Sync with theme project

- Clone scania-theme repo and install package dependencies: 
```shell
git clone https://github.com/scania/scania-theme.git
cd /path/to/scania-theme
npm i
```
- Create a global symlink for `scania-theme` project. A symlink, short for symbolic link, is a shortcut that points to another directory or file on your syste. Go to scania-theme folder and do `npm link`
- Start the local scania-theme setup by running `npm start`
- Tell `corporate-ui-dev` to use the global symlink with `npm link scania-theme`

[Read more about Scania theme](https://github.com/scania/scania-theme)

```shell
cd /path/to/scania-theme
npm link
npm start

cd path/to/corporate-ui-dev
npm link scania-theme
npm start
```

#### 4. Running demo

- Start the local setup by running `npm start`
- Open your browser and go to [http://localhost:1337](http://localhost:1337)

#### 5. Running test

Testing the components is done using the Stencil testing setup that includes unit test and End-to-End test. To test locally run `npm test`

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
