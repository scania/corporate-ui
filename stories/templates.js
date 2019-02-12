import { storiesOf } from '@storybook/html';

['Mail', 'Charts', 'Forms', 'Tables'].map(template => (
  storiesOf('Templates', module)
    .addParameters({ options: { addonPanelInRight: true } })
    .add(
      template,
      () => `
        <section>
          <header>
            <h2>${template}</h2>
          </header>
          <div>
            <p>Templates will be shown here.</p>
          </div>
        </section>`
      )
))