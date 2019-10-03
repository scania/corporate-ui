export default {
  title: 'Loading',
  preview: `
  <table class="table loading">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>1</th>
        <td>Mark</td>
        <td>Lorem ipsum dolor sit amet</td>
      </tr>
      <tr>
        <th>2</th>
        <td>June</td>
        <td>Consectetur adipiscing elit</td>
      </tr>
      <tr>
        <th>3</th>
        <td>Augusta</td>
        <td>Sed do eiusmod tempor incididunt</td>
      </tr>
    </tbody>
  </table>
  `,
  items: [
    {
      title: 'Loading class on button',
      content: `
<button type="button" class="btn btn-primary loading">Primary</button>
<button type="button" class="btn btn-secondary loading">Secondary</button>
<a href="/" class="btn btn-success loading">Success</a>
      `,
    },
    {
      title: 'Loading class on table',
      content: `
<table class="table loading">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>Mark</td>
      <td>Lorem ipsum dolor sit amet</td>
    </tr>
    <tr>
      <th>2</th>
      <td>June</td>
      <td>Consectetur adipiscing elit</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Augusta</td>
      <td>Sed do eiusmod tempor incididunt</td>
    </tr>
  </tbody>
</table>
      `,
    },
  ],
};
