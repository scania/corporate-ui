export default {
  title: 'Code',
  preview: `
  <code>&lt;section&gt;</code>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
For example, <code>&lt;section&gt;</code> should be wrapped as inline.
      `,
    },
    {
      title: 'Code blocks',
      content: `
<pre>
  <code>&lt;p&gt;Sample text here...&lt;/p&gt;
  &lt;p&gt;And another line of sample text here...&lt;/p&gt;
  </code>
</pre>
      `,
    },
    {
      title: 'Variables',
      content: `
<var>y</var> = <var>m</var><var>x</var> + <var>b</var>
      `,
    },
    {
      title: 'User inputs',
      content: `
To switch directories, type <kbd>cd</kbd> followed by the name of the directory.<br>
To edit settings, press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd>
      `,
    },
    {
      title: 'Sample output',
      content: `
<samp>This text is meant to be treated as sample output from a computer program.</samp>
      `,
    },
  ],
};
