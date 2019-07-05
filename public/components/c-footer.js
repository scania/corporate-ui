export default {
  title: 'Footer',
  description: 'By default, the footer element renders with a copyright text and a wordmark. You can add several few item links and social media icons to the footer. There are two ways to generate links and social media icons. Either by using the attributes or slot. To have your links as the footer links, set the slot attribute to slot="items". And for social media, set the slot attribute to slot="social-media-items". See examples and properties below for more information.',
  preview: '<c-footer></c-footer>',
  items: [
    {
      title: 'Custom text',
      content: `
<c-footer
  text='Some copyright related text can be set here.'></c-footer>
      `,
    },
    {
      title: 'Data items',
      content: `
<c-footer
  items='[{ "text": "cookies", "href": "/cookies" }, { "text": "contact us", "href": "/contact-us" }]'></c-footer>
      `,
    },
    {
      title: 'Slot items',
      content: `
<c-footer>
  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" slot="items">Contact us</a>
</c-footer>
      `,
    },
    {
      title: 'Both data and slot items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `,
    },
    {
      title: 'Data social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'
  social-items='[{"icon": "youtube", "href": "/", "target": "_blank" }]'>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `,
    },
    {
      title: 'Slot social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'>
  <a href="/" slot="social-items">
    <c-icon name="youtube" />
  </a>
  <a href="/" slot="social-items">
    <c-icon name="twitter" />
  </a>
  <a href="/" target="_blank" slot="social-items">
    <c-icon name="linkedin" />
  </a>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `,
    },
    {
      title: 'Both data and slot social media items',
      content: `
<c-footer
  items='[{ "text": "About", "href": "/about", "target": "_blank" }]'
  social-items='[{"icon": "youtube", "href": "/", "target": "_blank" }]'>
  <a href="/" slot="social-items">
    <c-icon name="twitter" />
  </a>
  <a href="/" slot="social-items">
    <c-icon name="linkedin" />
  </a>
  <a href="/" target="_blank" slot="social-items">
    <c-icon name="facebook" />
  </a>

  <a href="/cookies" slot="items">Cookies</a>
  <a href="/contact-us" target="_blank" slot="items">Contact us</a>
</c-footer>
      `,
    },
  ],
};
