[![Build Status](https://travis-ci.com/scania/corporate-ui-dev.svg?branch=master)](https://travis-ci.com/scania/corporate-ui-dev)
[![Join Slack](https://img.shields.io/badge/slack-join-%23dd3072.svg)](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![](https://img.shields.io/github/license/scania/corporate-ui-dev.svg?style=flat)

# Corporate UI Development Repository

In this repository we're developing the next generation components for Corporate UI. We're improving a lot of our findings that we've done implementing the current production version of the library: https://github.com/scania/corporate-ui

## Development Stage

Currently Corporate UI are in pre-alpha, and we're just preparing to move to alpha. We'll start of the tests with a group of 20 developers and expanding it shortly thereafter.

## Focus Area

Focus is right now set on getting a solid architecture in place. Any of the basic components that you'll be able to view in this repository is not finalized when it comes to design and CSS values.

## Purpose

Corporate UI is a library for using and building web components as custom elements. Custom elements enables developers to in a really easy way apply branding guidelines and apply interaction patterns without having to build them all from scratch. 

## About Stencil JS

The main change in the technology stack is that we've changing from Google Polymer to Stencil JS for creating Custom Elements.

Stencil is a compiler for building fast web apps using Custom Elements (aka Web Components).

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components work in any major framework or with no framework at all.

## Coding Standard

We're contributing, and are following, the coding standards available at [https://github.com/scania/coding-conventions](https://github.com/scania/coding-conventions).

## Local environment
<ul>
<li>Clone the Corporate UI Dev repo</li>
<li>Download and install node.js: https://nodejs.org/en/</li>
<li>If you're behind a firewall, CONFIGURE THE PROXY
<li>INSTALLING DEPENDENCIES (from command line): <b>npm i</b> from the corporate-ui-dev folder.</li>
<li>Start the local setup by running <b>npm start</b></li>
<li>Open your browser and go to http://localhost:1337</li>
</ul>

## Testing
Testing the components is done using the Stencil testing setup that includes unit test and End-to-End test. Both tests use Jest as the JavaScript testing solution. The browser environment for end-to-end testing is done using Puppeteer. 

To test locally:

`npm test`


## Node version

Use 8.15 or newer stable version of node.

## Tech Stack

Corporate UI outputs browser native code such as JavaScript, CSS and HTML. Although, behind the scenes a variety of tools are used. The technical infrastructure currently includes; Bootstrap, Sass, StencilJS, Redux, TSX, Travis, NPM, Gulp, esLint, Prettier, Jest, Puppeteer, Webpack and Storybook. 


## Wiki

**Read more** about the project in the github [wiki](https://github.com/scania/corporate-ui-dev/wiki)

## Join us on Slack

[Corporate-ui Slack](https://join.slack.com/t/corporate-ui/shared_invite/enQtNTI4NzMzOTQ3NTg4LTI1OGNhZGE2OTY0NzUwYzExMTJmMTQ2NjcxOTdkMjc0NDhlM2JlYTEyODY2ODJjYzUxNmYxNzhhMTQ5MDhmOWQ)

<h2>License</h2>
<p>All CSS, HTML and JS code are available under the MIT license. The Scania brand identity, logos and photographs found in this repository are copyrighted Scania CV AB and are not available on an open source basis or to be used as examples or in any other way, if not specifically ordered by Scania CV AB.</p>
