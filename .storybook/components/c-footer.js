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
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'
  social-media-items='[{"icon": "truck", "href": "/" }]'>
  <c-social-media
    icon="car"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="alicorn"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="apple-alt"
    href="/"
    slot="social-media-items"></c-social-media>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `
    }
  ]
}
