<h1>The Corporate UI Framework</h1>

<p>In this repository you'll find all components described in <a href="https://github.scania.com/pages/Scania/ux-library/developer/">the UX Library</a>.</p>
<p>The repository is a place for all Front End Developers to join the UI Developement at Scania. It is us togheter that develop and maintain this repository as well as <a href="https://github.scania.com/pages/Scania/ux-library/">the documentation</a>.</p>
<ul>
	<li>Something broken in a existing component? Help fixing it!</li>
	<li>Found a component that needs to be extended? Get on and improve it!</li>
	<li>Missing out on a component? Develop it!</li>
</ul>

## Quick start

Several quick start options are available:

- [Download the latest release.](https://github.scania.com/Scania/corporate-ui/archive/2.4.1.zip)
- Clone the repo: `git clone https://github.scania.com/Scania/corporate-ui.git`
- Install with [npm](https://www.npmjs.com/): `npm install corporate-ui`
- Install with [yarn](https://yarnpkg.com/): `yarn add corporate-ui`

Use the bundles included in the package or individual components according to your needs

+ `corporate-ui.html` a bundle of all Corporate UI components
+ `base-components.html` a set of basic Corporate UI
+ All individual components are located under html/component directory


## CorporateUI-CDN

Use our CDN to deliver cached version of CorporateUI's compiled CSS and JS to your project.

        <script src="https://static.scania.com/build/global/2.4.1/js/corporate-ui.js"></script>

The CDN will inject all dependencies needed to use Corporate UI components.


## CorporateUI-npm

        <link rel="stylesheet" href="node_modules/corporate-ui/dist/css/corporate-ui.css">
        <link rel="import" href="node_modules/corporate-ui/dist/html/`corporate-ui-base.html` OR `corporate-ui-full.html`">
        <script src="node_modules/corporate-ui/dist/js/corporate-ui-light.js"></script>

Don't forget to include jQuery, webcomponents.js, bootstrap and polymer  npm modules before it

        <script src="node_modules/query/query.min.js"></script>
        <script src="node_modules/webcomponents.js/webcomponents-lite.min.js"></script>
        <link rel="import" href="node_modules/polymer-1.4.0/polymer.html" data-concat="false">
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <script src="node_modules/bootstrap/dist/js/bootstrap.min.js"></script>


<h2>The Corporate UI Development Process</h2>
<p>There are many stakeholders that has interest in this library. Normally, new needs and improvements are filtered from business and end users via UX designers and product owners.</p>
<ul>
	<li>Once project requirements are defined: Is there any component that we can re-use?</li>
	<li>If not, is there any component that we can extend? Is there anyone else who's made a pull request for this kind of component?</li>
	<li>Otherwise, create a pull request and start develop the component.</li>
	<li>Push your code for review and then enjoy the limelight once your component is merged and released!</li>
</ul>

<p>Do you want to have an introduction to Web Component development at Scania? Please throw an e-mail at <a href="mailto:corporate-ui@scania.com">the Corporate UI Librarians</a>.</p>

<p>Full Corporate UI documentation <a href="https://github.scania.com/pages/Scania/ux-library/">available here</a>.</p>

<h2>Set up your local server</h2>
<ul>
<li>Clone the Corporate UI repo</li>
<li>Download and install node.js: https://nodejs.org/en/</li>
<li>CONFIGURE SCANIA PROXY: In environment variables (on computer) as well as in Git config. PROXY IS: http://PROXYSESO.SCANIA.COM:8080
<li>INSTALL GULP (from command line): <b>npm install gulp-cli -g</b></li>
<li>INSTALLING DEPENDENCIES (from command line): <b>npm install</b> from the corporate-ui folder.</li>
<li>Start Gulp (from command line, as administrator on windows): <b>gulp</b></li>
<li>Open your browser and go to http://localhost:1337</li>
</ul>
<h2>Starter Kit</h2>
<p>The starter kit might be the fastest way to understand Corporate UI and the use and development of web components.
<br>
<a href="https://github.scania.com/Scania/corporate-ui/tree/master/demo/starter-kit">Learn more...</a>



<h2>License</h2>
<p>The Scania brand identity and the interaction patterns found in this repository are not available on an open source basis. Although we have great freedom to make improvements and new components, some changes to interaction patterns and use of colours etc may not be approved.</p>
