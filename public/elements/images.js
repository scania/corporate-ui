export default {
  title: 'Images',
  preview: `
  <svg class="img-thumbnail" width="200" height="200">
    <rect width="100%" height="100%" fill="#868e96"></rect>
  </svg>
  `,
  items: [
    {
      title: 'Responsive image',
      description: 'Images are made responsive with .img-fluid. max-width: 100%; and height: auto; are applied to the image so that it scales with the parent element.',
      content: `
      <svg class="img-fluid" width="100%" height="250">
        <rect width="100%" height="100%" fill="#868e96"></rect>
        <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Responsive image</text>
      </svg>
      `,
    },
    {
      title: 'Thumbnails',
      content: `
      <svg class="img-thumbnail" width="200" height="200">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      `,
    },
    {
      title: 'Alignments',
      content: `
      <svg class="rounded float-left">
        <rect width="150" height="150" fill="#868e96"></rect>
      </svg>
      <svg class="rounded float-right">
        <rect width="150" height="150" fill="#868e96"></rect>
      </svg>
      `,
    },
    {
      title: 'Center alignment',
      content: `
      <div class="text-center">
        <svg class="rounded mx-auto d-block">
          <rect width="150" height="150" fill="#868e96"></rect>
        </svg>
      </div>
      `,
    },
  ],
};
