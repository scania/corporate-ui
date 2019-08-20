export default {
  title: 'Display',
  preview: `
  <div class="d-inline p-2 bg-primary text-white">d-inline</div>
  <div class="d-inline p-2 bg-dark text-white">d-inline</div>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
<div class="d-inline p-2 bg-primary text-white">d-inline</div>
<div class="d-inline p-2 bg-dark text-white">d-inline</div>
      `,
    },
    {
      title: '',
      content: `
<span class="d-block p-2 bg-primary text-white">d-block</span>
<span class="d-block p-2 bg-dark text-white">d-block</span>
      `,
    },
    {
      title: 'Hiding elements',
      content: `
<div class="d-lg-none">hide on screens wider than lg</div>
<div class="d-none d-lg-block">hide on screens smaller than lg</div>
      `,
    },
    {
      title: 'Display on print',
      content: `
<div class="d-print-none">Screen Only (Hide on print only)</div>
<div class="d-none d-print-block">Print Only (Hide on screen only)</div>
<div class="d-none d-lg-block d-print-block">Hide up to large on screen, but always show on print</div>
      `,
    },
  ],
};
