import { storiesOf } from '@storybook/html'
import { withOptions } from '@storybook/addon-options'
import marked from 'marked'

import docs from '../../readme.md'

storiesOf('Info', module)
  .addParameters({ options: { showAddonPanel: false } })
  .add('Corporate UI', () => marked(docs))
