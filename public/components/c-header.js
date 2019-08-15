export default {
  title: 'Header',
  description: [
    'A header display a logotype, site name, short-name, item links, and a symbol. The site name will be displayed on the right hand side of the logotype on desktop mode. Short name will be placed at the top centered in mobile mode. You can add one or several link items to the header that will be displayed at the right side of the header. This location is also used for language selectors and user menus.',
    'There are two ways to populate link items, by adding JSON objects to item attribute, or by having it in slot="items". See examples below to understand different ways of displaying header component.',
    'To include navigation component in the header as a main navigation, you need to define the slot name such as slot = "navigation". The navigation is a responsive component. If you make your browser window narrower you will see how the navigation changes its appearance on mobile view.',
  ],
  preview: '<c-header></c-header>',
  items: [
    {
      title: 'Items as data',
      content: `
<c-header
  site-name='Application'
  short-name='App'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'></c-header>
      `,
    },
    {
      title: 'Items in slot',
      content: `
<c-header
  site-name='Name'>
  <a href="/" slot="items">global</a>
  <a href="/" slot="items">scania</a>
</c-header>
      `,
    },
    {
      title: 'With navigation and items as data',
      description: 'This header setup shows the usage of a navigation inside the header.',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'>
</c-header>
<c-navigation
    sticky="false"
    primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'
    secondary-items='[{ "text": "user", "href": "/user" }, { "text": "more", "href": "/more" }]'></c-navigation>
      `,
    },
    {
      title: 'With navigation and items in slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'>
</c-header>
<c-navigation sticky="false">
  <a href="/" slot="primary-items" active>home</a>
  <a href="/about" slot="primary-items">about</a>
  <a href="/user" slot="secondary-items">user</a>
  <a href="/more" slot="secondary-items">more</a>
</c-navigation>
      `,
    },
    {
      title: 'Items in slot plus navigation and items in slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-header
  site-name='Name'>
  <a href="/" slot="items">global</a>
  <a href="/" slot="items">scania</a>
</c-header>
<c-navigation sticky="false">
  <a href="/" slot="primary-items" active>home</a>
  <a href="/about" slot="primary-items">about</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
    {
      title: 'Items in slot and with multiple levels of nested slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items 
                    as well as sub level in the navigation.`,
      content: `
<c-header
  site-name='Application'
  short-name='App'>
  <a href="/" slot="items">global</a>
  <a href="/" slot="items">scania</a>
</c-header>

<c-navigation sticky="false">
  <a href='/home' slot='primary-items'>home</a>
  <a href='/about' slot='primary-items' active=''>about</a>
  <a href='/more' slot='secondary-items'>more</a>

  <c-navigation slot='sub' target='/about' active=''>
    <a href='/about' slot='primary-items' active=''>About 1</a>
    <a href='/about2' slot='primary-items'>About 2</a>
    <a href='/about3' slot='secondary-items'>About 3</a>
  </c-navigation>
</c-navigation>
      `,
    },
  ],
};
