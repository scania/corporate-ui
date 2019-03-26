export default {
  title: 'Footer',
  description: 'Some informative text regarding the component can be placed here. To show how and where to use the current component.',
  preview: '<c-footer></c-footer>',
  items: [
    {
      title: 'Data items',
      content: `
<c-footer
  items='[{ "text": "cookies", "href": "/cookies" }, { "text": "contact us", "href": "/contact-us" }]'></c-footer>
      `
    },
    {
      title: 'Slot items',
      content: `
<c-footer>
  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" slot="items">Contact us</a>
</c-footer>
      `
    },
    {
      title: 'Both data and slot items',
      content: `
<c-footer
  items='[{ "text": "external2", "href": "http://google.com", "target": "_blank" }]''>
  <a href="http://google.com" target="_blank" slot="items">external</a>
</c-footer>
      `
    }
  ]
}
