export default {
  title: 'Header',
  description: [
    'Some informative text regarding the component can be placed here. To show how and where to use the current component.',
    'Its possible to have multiple paragraphs by providing the text as strings inside an array instead of a simple string.'
  ],
  preview: '<c-header></c-header>',
  items: [
    {
      title: 'Items as data',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'></c-header>
      `
    },
    {
      title: 'Items in slot',
      content: `
<c-header
  site-name='Name'>
  <a href="/" slot="items">global</a>
  <a href="/" slot="items">scania</a>
</c-header>
      `
    },
    {
      title: 'With navigation',
      description: 'This header setup shows the usage of a nested navigation inside the header.',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'
  primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'></c-header>
      `
    },
    {
      title: 'With navigation in slot',
      description: 'This header setup shows the usage of a navigation inside the header.',
      content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'>

  <c-navigation
    slot="navigation"
    primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'
    secondary-items='[{ "text": "user", "href": "/user" }, { "text": "more", "href": "/more" }]'></c-navigation>
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
  items='[{ "text": "global", "href": "/" }, { "text": "scania", "href": "/" }]'>

  <c-navigation slot="navigation">
    <a href="/" slot="primary-items" active>home</a>
    <a href="/about" slot="primary-items">about</a>
    <a href="/user" slot="secondary-items">user</a>
    <a href="/more" slot="secondary-items">more</a>
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
  <a href="/" slot="items">scania</a>

  <c-navigation slot="navigation">
    <a href="/" slot="primary-items" active>home</a>
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
  <a href="/" slot="items">scania</a>

  <c-navigation slot="navigation">
    <a href="/" slot="primary-items">home</a>
    <a href="/about" slot="primary-items" active>about</a>
    <a href="/user" slot="secondary-items">user</a>

    <c-navigation slot="sub-navigation">
      <a href="/" slot="primary-items">info</a>
      <a href="/" slot="primary-items">profile</a>
      <a href="/" slot="secondary-items">settings</a>
    </c-navigation>
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
  <a href="/" slot="items">scania</a>

  <c-navigation slot="navigation">
    <a href="/" slot="primary-items">home</a>

    <div slot="primary-items">
      <a href="/about" active>about</a>

      <c-navigation slot="sub-navigation">
        <a href="/" slot="primary-items">info</a>
        <a href="/" slot="primary-items">profile</a>
        <a href="/" slot="secondary-items">settings</a>
      </c-navigation>
    </div>

    <a href="/user" slot="secondary-items">user</a>
  </c-navigation>
</c-header>
      `
    }
  ]
}
