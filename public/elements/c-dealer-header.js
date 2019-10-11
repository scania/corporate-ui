export default {
  title: 'c-dealer-header',
  preview: '<c-dealer-header></c-dealer-header>',
  items: [
    {
      title: 'Basic use',
      content: `
<c-dealer-header
dealer-name="Bilmetro" short-name="Bilmetro"  dealer-url="/" >
  <a href="/" slot="items">Configurator</a>
</c-dealer-header>
      `,
    },
    {
      title: 'With dealer logo',
      content: `
<c-dealer-header
dealer-name="Bilmetro" short-name="Bilmetro"  dealer-url="/" dealer-logo="https://scania.github.io/corporate-ui-docs/images/bilmetro-logo.png">
  <a href="/" slot="items">Configurator</a>
</c-dealer-header>
      `,
    },
  ],
};
