[![Build Status](https://travis-ci.com/scania/corporate-ui-dev.svg?branch=master)](https://travis-ci.com/scania/corporate-ui-dev)
[![npm version](http://img.shields.io/npm/v/corporate-ui-dev.svg?style=flat&color=1081C2)](https://npmjs.org/package/corporate-ui-dev)
[![Github release](https://img.shields.io/github/v/tag/scania/corporate-ui-dev.svg?label=release&color=1081C2)](https://github.com/scania/corporate-ui-dev/releases)
[![Components library](https://img.shields.io/badge/Components%20library-master-f4871a.svg)](https://scania.github.io/corporate-ui-site/)
[![Join Slack](https://img.shields.io/badge/slack-join-%23dd3072.svg)](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/license/scania/corporate-ui-dev.svg?style=flat)

# Corporate UI Development Repository

In this repository we're developing the next generation components for Corporate UI. We're improving a lot of our findings that we've done implementing the current production version of the library: https://github.com/scania/corporate-ui

**Demo page**

[Simple HTML ↗](https://codepen.io/corporate-ui/pen/OYmqpr) | [Angular ↗](https://github.com/scania/corporate-ui-angular) | [React ↗](https://github.com/scania/corporate-ui-react) | [Vue ↗](https://github.com/scania/corporate-ui-vue)


## Wiki

[Github wiki](https://github.com/scania/corporate-ui-dev/wiki) includes: 
- [Developing components](https://github.com/scania/corporate-ui-dev/wiki/Developing-components)
- [Project focus and structure](https://github.com/scania/corporate-ui-dev/wiki/Project-focus-and-structure)
- [Upgrade from version 3 to 4](https://github.com/scania/corporate-ui-dev/wiki/Upgrade-from-version-3.x-to-4.x)
- [Components status](https://github.com/scania/corporate-ui-dev/wiki/Component-status)
- [Browser support](https://github.com/scania/corporate-ui-dev/wiki/Browser-Support)
- and more. 


## Quick start

Several options to add corporate-ui in the project: 
<details open>
<summary><strong>NPM</strong></summary>
   <br/>
   
   Install corporate-ui via NPM package by running the command below.
   
   ```
   npm i corporate-ui-dev
   ```

   Import component as a module with `defineCustomElements` function.
   
   ```js
   import { defineCustomElements } from 'corporate-ui-dev';

   defineCustomElements();
   ```
</details>
  
<details>
<summary><strong>CDN</strong></summary>
   <br/>
   
   Add link to the script by adding the following to the head
   
   **SUBJECT TO CHANGE!**
   
   ```
   <script src="https://static.scania.com/build/global/4.x/corporate-ui/corporate-ui.js"></script>
   ```
   Replace `x` with [available releases](https://github.com/scania/corporate-ui-dev/releases).
</details>   

See all available components in the [components library](https://scania.github.io/corporate-ui-site/).
   

## Styling

To apply the styling, you need to add a theme package and use c-theme component. Check out [Scania theme repository](https://github.com/scania/scania-theme/) for detail documentation.

<details open>
   <summary>
      <strong>NPM</strong>
   </summary>
   <br/>
   
   Install scania-theme package by running the command below.
   
   ```shell
   npm i scania-theme
   ```
   
   Import theme in the project and use it with `addTheme` function from corporate-ui.
   
   ```js
   import { defineCustomElements, addTheme } from 'corporate-ui-dev'; 
   import { theme as scania } from 'scania-theme'; 

   defineCustomElements(); 
   addTheme(scania);
   ```
   
</details>

<details>
   <summary>
      <strong>CDN</strong>
   </summary>
   <br/>
   
   Make sure to include scania-theme script BEFORE the corporate-ui script.
   
   ```html
   <script src="https://static.scania.com/build/global/themes/scania/1.x/scania-theme.js"></script>
   <script src="https://static.scania.com/build/global/4.x/corporate-ui/corporate-ui.js"></script>
   ```
   
</details>

**Add theme to project**

   Initialize the theme with the `c-theme` component. Set `global` attribute to true in order to enable bootstrap styling.
   
   ```html
   <c-theme name="scania" global="true"></c-theme>
   ```

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
