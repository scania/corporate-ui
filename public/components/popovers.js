export default {
  title: 'Popovers',
  preview: `
  <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
      `,
    },
    {
      title: 'Four directions',
      content: `
      <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        Popover on top
      </button>

      <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        Popover on right
      </button>

      <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="Vivamus
      sagittis lacus vel augue laoreet rutrum faucibus.">
        Popover on bottom
      </button>

      <button type="button" class="btn btn-secondary" data-container="body" data-toggle="popover" data-placement="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        Popover on left
      </button>
      `,
    },
    {
      title: 'Disabled elements',
      content: `
      <span class="d-inline-block" data-toggle="popover" data-content="Disabled popover">
        <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Disabled button</button>
      </span>
      `,
    },
  ],
};
