export default {
  title: 'Header',
  description: [
    'To see how to structure header and navigation component in one page, click the button below.',
    `<a
    data-sb-kind="Templates"
    data-sb-story="Header Showcase" 
    class="btn btn-lg btn-primary"
    style="color:#fff;">Go to page with header and navigation</a>
    `,
    'A header display a logotype, site name, short-name, item links, and a symbol. The site name will be displayed on the right hand side of the logotype on desktop mode. Short name will be placed at the top centered in mobile mode. You can add one or several link items to the header that will be displayed at the right side of the header. This location is also used for language selectors and user menus.',
    'There are two ways to populate link items, by adding JSON objects to item attribute, or by having it in slot="items". See examples below to understand different ways of displaying header component.',
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
  ],
};
