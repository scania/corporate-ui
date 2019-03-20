import { storiesOf } from '@storybook/html';

import { renderItems } from '../helpers';

storiesOf('Components', module)
  .add(
    'Footer',
    () => renderItems({
      title: 'Footer',
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
        }
      ]
    })
  )
