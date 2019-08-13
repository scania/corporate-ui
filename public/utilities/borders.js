export default {
  title: 'Border',
  preview: `
  <span class="border border-success"></span>
  <span class="border border-danger"></span>
  <span class="border border-warning"></span>
  <span class="border border-info"></span>
  `,
  items: [
    {
      title: 'Additive',
      content: `
      <span class="border"></span>
      <span class="border-top"></span>
      <span class="border-right"></span>
      <span class="border-bottom"></span>
      <span class="border-left"></span>
      `,
    },
    {
      title: 'Substractive',
      content: `
      <span class="border border-0"></span>
      <span class="border border-top-0"></span>
      <span class="border border-right-0"></span>
      <span class="border border-bottom-0"></span>
      <span class="border border-left-0"></span>
      `,
    },
    {
      title: 'Border color',
      content: `
      <span class="border border-primary"></span>
      <span class="border border-secondary"></span>
      <span class="border border-success"></span>
      <span class="border border-danger"></span>
      <span class="border border-warning"></span>
      <span class="border border-info"></span>
      <span class="border border-light"></span>
      <span class="border border-dark"></span>
      <span class="border border-white"></span>
      `,
    },
    {
      title: 'Border radius',
      content: `
      <svg class="rounded" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-top" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-right" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-bottom" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-left" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-circle" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-pill" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <svg class="rounded-0" width="75" height="75">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      `,
    },
  ],
};
