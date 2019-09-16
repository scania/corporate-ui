export default {
  title: 'Fullpage Example',
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
    <a href='/about' class="parent active" slot='primary-items'>about</a>
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

        <h2>Some table and content </h2>
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Mark</td>
              <td>Lorem ipsum dolor sit amet</td>
            </tr>
            <tr>
              <th>2</th>
              <td>June</td>
              <td>Consectetur adipiscing elit</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Augusta</td>
              <td>Sed do eiusmod tempor incididunt</td>
            </tr>
          </tbody>
        </table>
        <h2>Some articles</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Vestibulum rhoncus est pellentesque elit ullamcorper. Sed tempus urna et pharetra. Tristique magna sit amet purus gravida quis blandit turpis. Facilisi cras fermentum odio eu. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Ridiculus mus mauris vitae ultricies leo integer. Lacus luctus accumsan tortor posuere ac ut. Justo eget magna fermentum iaculis eu non. Vel facilisis volutpat est velit egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Urna cursus eget nunc scelerisque viverra mauris in.
          </p>
          <p>
            Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Orci a scelerisque purus semper eget duis at tellus at. Ornare suspendisse sed nisi lacus sed viverra. Urna et pharetra pharetra massa massa ultricies mi. Aliquet sagittis id consectetur purus. Sed turpis tincidunt id aliquet risus feugiat. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Sagittis orci a scelerisque purus semper eget duis at tellus. Egestas diam in arcu cursus. Et netus et malesuada fames ac. Sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          </p>
          <p>
            Placerat vestibulum lectus mauris ultrices eros. Et tortor consequat id porta. Volutpat odio facilisis mauris sit amet massa. Nam aliquam sem et tortor. Placerat orci nulla pellentesque dignissim enim sit amet. Sem fringilla ut morbi tincidunt. Cras ornare arcu dui vivamus arcu felis bibendum ut. Arcu bibendum at varius vel pharetra vel. Libero nunc consequat interdum varius sit. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Pulvinar mattis nunc sed blandit libero volutpat sed. Congue quisque egestas diam in arcu. At erat pellentesque adipiscing commodo elit at imperdiet. Ut faucibus pulvinar elementum integer enim. Dignissim suspendisse in est ante in nibh mauris cursus mattis.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Vestibulum rhoncus est pellentesque elit ullamcorper. Sed tempus urna et pharetra. Tristique magna sit amet purus gravida quis blandit turpis. Facilisi cras fermentum odio eu. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Ridiculus mus mauris vitae ultricies leo integer. Lacus luctus accumsan tortor posuere ac ut. Justo eget magna fermentum iaculis eu non. Vel facilisis volutpat est velit egestas. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Urna cursus eget nunc scelerisque viverra mauris in.
          </p>
          <p>
            Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Orci a scelerisque purus semper eget duis at tellus at. Ornare suspendisse sed nisi lacus sed viverra. Urna et pharetra pharetra massa massa ultricies mi. Aliquet sagittis id consectetur purus. Sed turpis tincidunt id aliquet risus feugiat. Dictum varius duis at consectetur lorem donec massa sapien faucibus. Sagittis orci a scelerisque purus semper eget duis at tellus. Egestas diam in arcu cursus. Et netus et malesuada fames ac. Sit amet nisl suscipit adipiscing bibendum est ultricies integer.
          </p>
        
    </section>
  </c-content>
  <c-footer>
    <a href="/" slot="social-items">
      <c-icon name="youtube" />
    </a>
    <a href="/" slot="social-items">
      <c-icon name="twitter" />
    </a>
    <a href="/" target="_blank" slot="social-items">
      <c-icon name="linkedin" />
    </a>

    <a href="/" slot="items">global</a>
    <a href="/" slot="items">scania</a>
  </c-footer>
  `,
};
