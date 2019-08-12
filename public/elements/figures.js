export default {
  title: 'Figures',
  preview: `
  <figure class="figure">
    <svg class="card-img-top">
      <rect width="200px" height="200px" fill="#868e96"></rect>
    </svg>
    <figcaption class="figure-caption">A caption for the above image.</figcaption>
  </figure>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <figure class="figure">
        <svg class="card-img-top">
          <rect width="200px" height="200px" fill="#868e96"></rect>
        </svg>
        <figcaption class="figure-caption">A caption for the above image.</figcaption>
      </figure>
      `,
    },
    {
      title: 'Text position',
      content: `
      <figure class="figure">
        <svg class="card-img-top">
          <rect width="200px" height="200px" fill="#868e96"></rect>
        </svg>
        <figcaption class="figure-caption text-right">A caption for the above image.</figcaption>
      </figure>
      `,
    },
  ],
};
