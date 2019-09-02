export default {
  title: 'Header Showcase',
  preview: '<c-header></c-header>',
  method: () => `
  <c-header
    site-name='Application'
    short-name='App'
    site-url='/'>
    <a href="/" slot="items">global</a>
    <a href="/" slot="items">scania</a>
  </c-header>
  <c-navigation>
    <a href='/home' slot='primary-items'>home</a>
    <a href='/about' class="parent" slot='primary-items' active=''>about</a>
    <a href='/first' class="parent" slot='primary-items'>first</a>
    <a href='/second' slot='primary-items'>second</a>
    <a href='/third' slot='primary-items'>third</a>
    <a href='/four' slot='primary-items'>four</a>
    <a href='/about' slot='primary-items'>last</a>
    <a href='/more' slot='secondary-items'>more</a>

    <c-navigation slot='sub' target='/about' active=''>
      <a href='/about' slot='primary-items' active=''>About 1</a>
      <a href='/about2' slot='primary-items'>About 2</a>
      <a href='/about3' slot='secondary-items'>About 3</a>
    </c-navigation>

    <c-navigation slot='sub' target='/first'>
      <a href='/about' slot='primary-items' active=''>First 1</a>
      <a href='/about2' slot='primary-items'>First 2</a>
      <a href='/about3' slot='secondary-items'>First 3</a>
    </c-navigation>
  </c-navigation>
    <c-content>
        <section>
        <h1>How to use header and navigation</h1>
        <p>Header and navigation component can be rendered under <code>body</code> element, for example :</p>
        <p>
          <c-code-sample>
            <body>
              <c-header
                site-name='Application'
                short-name='App'>
                <a href="/" slot="items">global</a>
                <a href="/" slot="items">scania</a>
              </c-header>
              <c-navigation>
                <a href='/home' slot='primary-items'>home</a>
                <a href='/about' slot='primary-items' active=''>about</a>

                <c-navigation slot='sub' target='/about' active=''>
                  <a href='/about' slot='primary-items' active=''>About 1</a>
                  <a href='/about2' slot='primary-items'>About 2</a>
                </c-navigation>
              </c-navigation>

              <c-content>
              ....
              </c-content>

              <c-footer>
              ...
              </c-footer>

            </body>
          </c-code-sample>
        </p>
        
        </section>
    </c-content>
  `,
};
