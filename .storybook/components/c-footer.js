export default {
  title: 'Footer',
  description: 'Some informative text regarding the component can be placed here. To show how and where to use the current component.',
  preview: '<c-footer></c-footer>',
  items: [
    {
      title: 'Data items',
      content: `
<c-footer
  items='[{ "text": "cookies", "location": "/cookies" }, { "text": "contact us", "location": "/contact-us" }]'></c-footer>
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
      title: 'Slot Social items',
      content: `
<c-footer
  items='[{"text": "About", "href": "/about"}]'
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
  <a href="/contact-us" slot="items">Contact us</a>
</c-footer>
      `
    }
  ]
}
