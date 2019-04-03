export default {
  title: 'Content',
  description: 'The content component styles the page to push the footer down. It is important to wrap your content inside this component to ensure the footer never slides up the page if the content is not long enough. Check out the full page example in the templates section.',
  items: [
    {
      title: 'Content with section',
      content: `
    <c-content>
        <section>
            <h3>A Title of the page</h3>
            <!-- ... -->
            <!-- Your application content goes here -->
        </section>
    </c-content>
        `,
    },
  ],
};
