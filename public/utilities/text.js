export default {
  title: 'Text',
  preview: '<p class="text-monospace">This is in monospace</p>',
  items: [
    {
      title: 'Text alignment',
      content: `
<p class="text-left">Left aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-right">Right aligned text on all viewport sizes.</p>

<p class="text-sm-left">Left aligned text on viewports sized SM (small) or wider.</p>
<p class="text-md-left">Left aligned text on viewports sized MD (medium) or wider.</p>
<p class="text-lg-left">Left aligned text on viewports sized LG (large) or wider.</p>
<p class="text-xl-left">Left aligned text on viewports sized XL (extra-large) or wider.</p>
      `,
    },
    {
      title: 'Text wrapping and overflow',
      content: `
<div class="text-nowrap bd-highlight" style="width: 8rem;">
  This text should overflow the parent.
</div>

<!-- Block level -->
<div class="row">
  <div class="col-2 text-truncate">
    Praeterea iter est quasdam res quas ex communi.
  </div>
</div>

<!-- Inline level -->
<span class="d-inline-block text-truncate" style="max-width: 150px;">
  Praeterea iter est quasdam res quas ex communi.
</span>
      `,
    },
    {
      title: 'Text transform',
      content: `
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">CapiTaliZed text.</p>
      `,
    },
    {
      title: 'Font weight and italics',
      content: `
<p class="font-weight-bold">Bold text.</p>
<p class="font-weight-normal">Normal weight text.</p>
<p class="font-weight-light">Light weight text.</p>
<p class="font-italic">Italic text.</p>
      `,
    },
    {
      title: 'Monospace',
      content: `
<p class="text-monospace">This is in monospace</p>
      `,
    },
  ],
};
