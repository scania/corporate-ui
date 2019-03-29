export default {
  title: 'Footer',
  description: 'Some informative text regarding the component can be placed here. To show how and where to use the current component.',
  preview: '<c-footer></c-footer>',
  items: [
    {
      title: 'Custom text',
      content: `
<c-footer
  text='Some copyright related text can be set here.'></c-footer>
      `
    },
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
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `
    },
    {
      title: 'Data social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'
  social-media-items='[{"icon": "youtube", "href": "/", "target": "_blank" }]'>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `
    },
    {
      title: 'Slot social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'>
  <c-social-media
    icon="youtube"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="twitter"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="linkedin"
    href="/"
    target="_blank"
    slot="social-media-items"></c-social-media>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `
    },
    {
      title: 'Both data and slot social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'
  social-media-items='[{"icon": "youtube", "href": "/", "target": "_blank" }]'>
  <c-social-media
    icon="twitter"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="linkedin"
    href="/"
    slot="social-media-items"></c-social-media>
  <c-social-media
    icon="facebook"
    href="/"
    target="_blank"
    slot="social-media-items"></c-social-media>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `
    }
  ]
}
