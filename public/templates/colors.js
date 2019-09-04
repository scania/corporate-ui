const colors = {
  global: [
    'white',
    'black',
    'blue',
    // 'indigo',
    // 'purple',
    // 'pink',
    'red',
    'orange',
    // 'yellow',
    'green',
    // 'teal',
    // 'cyan',
  ],
  interaction: [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    // 'light',
    // 'dark',
  ],
  extra: [
    // 'primary',
    // 'secondary',
    // 'success',
    // 'info',
    // 'warning',
    // 'danger',
    'light',
    'dark',
  ],
};
const states = [
  'default',
  'background',
  'border',
  'text',
];

export default {
  title: 'Colors',
  preview: '<c-header></c-header>',
  description: '',
  items: [
    {
      title: 'Global colors',
      description: `
      <div class="colors">
        ${renderItems(colors.global)}
      </div>`,
    },
    {
      title: 'Global colors',
      description: `
      <div class="colors">
        ${states.map((state, key) => renderItems(colors.interaction, key)).join('')}
      </div>`,
    },
    {
      title: 'Extra colors',
      description: `
      <div class="colors">
        ${states.map((state, key) => renderItems(colors.extra, key)).join('')}
      </div>`,
    },
  ],
};

function renderItems(items, index) {
  return `
    <div class="colors">
      <div class="row">
        ${items.map(item => renderItem(item, index)).join('')}
      </div>
    </div>
  `;
}

function renderItem(item, index = '') {
  const name = `${item}${index ? `-0${index}` : ''}`;

  return `
    <div class="col-sm-6 col-md-4 col-lg-2 ${name}">
      <div class="mb-5 color" style="background-color: var(--${name});">
        <span>${name}</span>
      </div>
    </div>
  `;
}
