export default {
  title: 'Buttons',
  preview: `
  <button type="button" class="btn btn-primary">Primary</button>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <button type="button" class="btn btn-primary">Primary</button>
      <button type="button" class="btn btn-secondary">Secondary</button>
      <button type="button" class="btn btn-success">Success</button>
      <button type="button" class="btn btn-danger">Danger</button>
      <button type="button" class="btn btn-warning">Warning</button>
      <button type="button" class="btn btn-info">Info</button>
      <button type="button" class="btn btn-light">Light</button>
      <button type="button" class="btn btn-dark">Dark</button>

      <button type="button" class="btn btn-link">Link</button>
      `,
    },
    {
      title: 'Button tags',
      content: `
      <a class="btn btn-primary" href="#" role="button">Link</a>
      <button class="btn btn-primary" type="submit">Button</button>
      <input class="btn btn-primary" type="button" value="Input">
      <input class="btn btn-primary" type="submit" value="Submit">
      <input class="btn btn-primary" type="reset" value="Reset">
      `,
    },
    {
      title: 'Outline buttons',
      content: `
      <button type="button" class="btn btn-outline-primary">Primary</button>
      <button type="button" class="btn btn-outline-secondary">Secondary</button>
      <button type="button" class="btn btn-outline-success">Success</button>
      <button type="button" class="btn btn-outline-danger">Danger</button>
      <button type="button" class="btn btn-outline-warning">Warning</button>
      <button type="button" class="btn btn-outline-info">Info</button>
      <button type="button" class="btn btn-outline-light">Light</button>
      <button type="button" class="btn btn-outline-dark">Dark</button>
      `,
    },
    {
      title: 'Sizes',
      content: `
      <button type="button" class="btn btn-primary btn-lg">Large button</button>
      <button type="button" class="btn btn-secondary btn-lg">Large button</button>
      <button type="button" class="btn btn-primary btn-sm">Small button</button>
      <button type="button" class="btn btn-secondary btn-sm">Small button</button>
      <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
      <button type="button" class="btn btn-secondary btn-lg btn-block">Block level button</button>
      `,
    },
    {
      title: 'Active state',
      content: `
      <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link</a>
      <a href="#" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Link</a>
      `,
    },
    {
      title: 'Disabled state',
      content: `
      <button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
      <button type="button" class="btn btn-secondary btn-lg" disabled>Button</button>
      <a href="#" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
      <a href="#" class="btn btn-secondary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Link</a>
      `,
    },
  ],
};
