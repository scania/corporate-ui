export default {
  title: 'Colors',
  preview: '<c-icon name="rocket"></c-icon>',
  items: [
    {
      title: 'Buttons',
      content: `
<button type="button" class="btn btn-lg btn-primary">Primary</button>
<button type="button" class="btn btn-lg btn-secondary">Secondary</button>
<button type="button" class="btn btn-lg btn-success">Success</button>
<button type="button" class="btn btn-lg btn-danger">Danger</button>
<button type="button" class="btn btn-lg btn-warning">Warning</button>
<button type="button" class="btn btn-lg btn-info">Info</button>
<button type="button" class="btn btn-lg btn-light">Light</button>
<button type="button" class="btn btn-lg btn-dark">Dark</button>

<button type="button" class="btn btn-lg btn-link">Link</button>
      `,
    },
    {
      title: 'Buttons outline',
      content: `
<div class="mb-4 p-4 bg-dark">
  <button type="button" class="btn btn-lg btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-lg btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-lg btn-outline-success">Success</button>
  <button type="button" class="btn btn-lg btn-outline-danger">Danger</button>
  <button type="button" class="btn btn-lg btn-outline-warning">Warning</button>
  <button type="button" class="btn btn-lg btn-outline-info">Info</button>
  <button type="button" class="btn btn-lg btn-outline-light">Light</button>
  <button type="button" class="btn btn-lg btn-outline-dark">Dark</button>
</div>
      `,
    },
    {
      title: 'Backgrounds',
      content: `
<div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
<div class="p-3 mb-2 bg-secondary">.bg-secondary</div>
<div class="p-3 mb-2 bg-success text-white">.bg-success</div>
<div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
<div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
<div class="p-3 mb-2 bg-info text-white">.bg-info</div>
<div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
<div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
<div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
      `,
    },
    {
      title: 'Texts',
      content: `
<p class="text-primary">.text-primary</p>
<p class="text-secondary bg-dark">.text-secondary</p>
<p class="text-success">.text-success</p>
<p class="text-danger">.text-danger</p>
<p class="text-warning">.text-warning</p>
<p class="text-info">.text-info</p>
<p class="text-light bg-dark">.text-light</p>
<p class="text-dark">.text-dark</p>
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-white bg-dark">.text-white</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
      `,
    },
  ],
};
