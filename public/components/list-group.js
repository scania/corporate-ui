export default {
  title: 'List group',
  preview: `
  <ul class="list-group">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Morbi leo risus</li>
    <li class="list-group-item">Porta ac consectetur ac</li>
    <li class="list-group-item">Vestibulum at eros</li>
  </ul>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <ul class="list-group">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      `,
    },
    {
      title: 'Active items',
      content: `
      <ul class="list-group">
        <li class="list-group-item active">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      `,
    },
    {
      title: 'Disabled items',
      content: `
      <ul class="list-group">
        <li class="list-group-item disabled" aria-disabled="true">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      `,
    },
    {
      title: 'Links and buttons',
      content: `
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active">
          Cras justo odio
        </a>
        <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
        <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
        <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
        <a href="#" class="list-group-item list-group-item-action disabled" tabindex="-1" aria-disabled="true">Vestibulum at eros</a>
      </div>
      `,
    },
    {
      title: 'Flush',
      content: `
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      `,
    },
    {
      title: 'Horisontal',
      content: `
      <ul class="list-group list-group-horizontal">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
      </ul>
      `,
    },
    {
      title: 'Contextual',
      content: `
      <ul class="list-group">
        <li class="list-group-item">Dapibus ac facilisis in</li>

        
        <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
        <li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
        <li class="list-group-item list-group-item-success">A simple success list group item</li>
        <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
        <li class="list-group-item list-group-item-warning">A simple warning list group item</li>
        <li class="list-group-item list-group-item-info">A simple info list group item</li>
        <li class="list-group-item list-group-item-light">A simple light list group item</li>
        <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
      </ul>
      `,
    },
    {
      title: 'With badges',
      content: `
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Cras justo odio
          <span class="badge badge-primary badge-pill">14</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Dapibus ac facilisis in
          <span class="badge badge-primary badge-pill">2</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Morbi leo risus
          <span class="badge badge-primary badge-pill">1</span>
        </li>
      </ul>
      `,
    },
  ],
};
