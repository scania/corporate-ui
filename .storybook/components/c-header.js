export default {
  title: 'Header',
  preview: '<c-header></c-header',
  items: [
    {
      title: 'Items as data',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "location": "/" }]'></c-header>
      `
    },
    {
      title: 'Items in slot',
      content: `
<c-header
  site-name='Name'>
  <a href="/" slot="items">global</a>
</c-header>
      `
    },
    {
      title: 'With navigation',
      description: 'This header setup shows the usage of a nested navigation inside the header.',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "location": "/" }]'
  primary-items='[{ "text": "home", "location": "/home" }, { "text": "about", "location": "/about" }]'></c-header>
      `
    },
    {
      title: 'With navigation in slot',
      description: 'This header setup shows the usage of a navigation inside the header.',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "location": "/" }]'>
  <c-navigation slot="navigation" primary-items='[{ "text": "home", "location": "/home" }, { "text": "about", "location": "/about" }]'></c-navigation>
</c-header>
      `
    },
    {
      title: 'With nested slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "location": "/" }]'>
  <c-navigation slot="navigation">
    <a href="/" slot="primary-items">home</a>
    <a href="/about" slot="primary-items">about</a>
    <a href="/user" slot="secondary-items">user</a>
  </c-navigation>
</c-header>
      `
    },
    {
      title: 'Items in slot and with nested slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-header
  site-name='Name'>
  <a href="/" slot="items">global</a>
  <c-navigation slot="navigation">
    <a href="/" slot="primary-items">home</a>
    <a href="/about" slot="primary-items">about</a>
    <a href="/user" slot="secondary-items">user</a>
  </c-navigation>
</c-header>
      `
    }
  ]
}
