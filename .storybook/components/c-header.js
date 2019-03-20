import { storiesOf } from '@storybook/html';

import { renderItems } from '../helpers';

storiesOf('Components', module)
  .add(
    'Header',
    () => renderItems({
      title: 'Header',
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
          title: 'Width navigation',
          description: 'This header setup shows the usage of a nested navigation inside the header.',
          content: `
<c-header
  site-name='Name'
  items='[{ "text": "global", "location": "/" }]'
  primary-items='[{ "text": "home", "location": "/home" }, { "text": "about", "location": "/about" }]'></c-header>
          `
        },
        {
          title: 'Width navigation in slot',
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
          title: 'Width nested slots',
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
          title: 'Items in slot and width nested slots',
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
    })
  )
