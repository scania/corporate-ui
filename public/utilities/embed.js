export default {
  title: 'Embed',
  preview: '<c-icon name="youtube"></c-icon>',
  items: [
    {
      title: 'Basic use',
      content: `
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wm0cfevdPRA?rel=0" allowfullscreen></iframe>
</div>`,
    },
    {
      title: 'Aspect ratio 21:9',
      content: `
<!-- 21:9 aspect ratio -->
<div class="embed-responsive embed-responsive-21by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wm0cfevdPRA?rel=0"></iframe>
</div>`,
    },
    {
      title: 'Aspect ratio 16:9',
      content: `
<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wm0cfevdPRA?rel=0"></iframe>
</div>`,
    },
    {
      title: 'Aspect ratio 4:3',
      content: `
<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wm0cfevdPRA?rel=0"></iframe>
</div>`,
    },
    {
      title: 'Aspect ratio 1:1',
      content: `
<!-- 1:1 aspect ratio -->
<div class="embed-responsive embed-responsive-1by1">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/wm0cfevdPRA?rel=0"></iframe>
</div>`,
    },
  ],
};
