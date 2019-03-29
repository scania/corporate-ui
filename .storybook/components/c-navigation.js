export default {
  title: 'Navigation',
  description: [
    'Some informative text regarding the component can be placed here. To show how and where to use the current component.',
    'Its possible to have multiple paragraphs by providing the text as strings inside an array instead of a simple string.'
  ],
  preview: '<c-header></c-header>',
  items: [
    {
      title: 'Items as data',
      description: 'This header setup shows the usage of a navigation inside the header.',
      content: `
<c-navigation
  primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "user", "href": "/user" }, { "text": "more", "href": "/more" }]'></c-navigation>
      `
    },
    {
      title: 'Items in slots',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/about" slot="primary-items">about</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `
    },
    {
      title: 'Items both as data and in slots displayed in vertical orientation',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation
  primary-items='[{ "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "more", "href": "/more" }]'>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `
    },
    {
      title: 'Items both as data and in slots displayed in vertical orientation',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation
  orientation="vertical"
  primary-items='[{ "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "more", "href": "/more" }]'>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `
    }
  ]
}
