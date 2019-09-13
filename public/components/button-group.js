export default {
  title: 'Button group',
  preview: `
  <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-secondary">Left</button>
    <button type="button" class="btn btn-secondary">Middle</button>
    <button type="button" class="btn btn-secondary">Right</button>
  </div>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
      `,
    },
    {
      title: 'Button toolbar',
      content: `
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary">1</button>
          <button type="button" class="btn btn-secondary">2</button>
          <button type="button" class="btn btn-secondary">3</button>
          <button type="button" class="btn btn-secondary">4</button>
        </div>
        <div class="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" class="btn btn-secondary">5</button>
          <button type="button" class="btn btn-secondary">6</button>
          <button type="button" class="btn btn-secondary">7</button>
        </div>
        <div class="btn-group" role="group" aria-label="Third group">
          <button type="button" class="btn btn-secondary">8</button>
        </div>
      </div>
      `,
    },
    {
      title: 'Sizing',
      content: `
      <div class="btn-group btn-group-lg" role="group" aria-label="Large">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
      <div class="btn-group btn-group-sm" role="group" aria-label="...">
        <button type="button" class="btn btn-secondary">Left</button>
        <button type="button" class="btn btn-secondary">Middle</button>
        <button type="button" class="btn btn-secondary">Right</button>
      </div>
      `,
    },
    {
      title: 'Nesting',
      content: `
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" class="btn btn-secondary">1</button>
        <button type="button" class="btn btn-secondary">2</button>

        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item" href="#">Dropdown link</a>
            <a class="dropdown-item" href="#">Dropdown link</a>
          </div>
        </div>
      </div>
      `,
    },
    {
      title: 'Vertical variation',
      content: `
      <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
        <button type="button" class="btn btn-secondary">Button</button>
        <button type="button" class="btn btn-secondary">Button</button>
        <button type="button" class="btn btn-secondary">Button</button>
        <button type="button" class="btn btn-secondary">Button</button>
        <button type="button" class="btn btn-secondary">Button</button>
        <button type="button" class="btn btn-secondary">Button</button>
      </div>
      `,
    },
  ],
};
