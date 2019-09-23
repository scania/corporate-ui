export default {
  title: 'Typography',
  preview: `
  <h1>Headline 1</h1>
  <p>Paragraph</p>
  `,
  items: [
    {
      title: 'Headings',
      content: `
      <h1>h1. Bootstrap heading</h1>
      <h2>h2. Bootstrap heading</h2>
      <h3>h3. Bootstrap heading</h3>
      <h4>h4. Bootstrap heading</h4>
      <h5>h5. Bootstrap heading</h5>
      <h6>h6. Bootstrap heading</h6>
      `,
    },
    {
      title: 'Inline text elements',
      content: `
      <p>You can use the mark tag to <mark>highlight</mark> text.</p>
      <p><del>This line of text is meant to be treated as deleted text.</del></p>
      <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
      <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
      <p><u>This line of text will render as underlined</u></p>
      <p><small>This line of text is meant to be treated as fine print.</small></p>
      <p><strong>This line rendered as bold text.</strong></p>
      <p><em>This line rendered as italicized text.</em></p>
      `,
    },
    {
      title: 'Customizing headings',
      content: `
      <h3>
        Fancy display heading
        <small class="text-muted">With faded secondary text</small>
      </h3>
      `,
    },
    {
      title: 'Lead',
      content: `
      <p class="lead">
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
      </p>
      `,
    },
  ],
};
