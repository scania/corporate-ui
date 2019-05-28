export default {
  title: 'Main page',
  preview: '<c-icon name="cake"></c-icon>',
  items: [
    {
      title: 'Main page',
      content: `
      <c-header site-name='Corporate UI'>
          <a href="/info" slot="items">Info</a>
          <c-navigation slot='navigation'>
              <a href='/' slot='primary-items' active=''>home</a>
              <a href='/global' slot='primary-items' active=''>global</a>
              <a href='/user' slot='secondary-items' active=''>user</a>
          </c-navigation>
      </c-header>

<c-content>
  <style>
    .banner {
      overflow: hidden;
      margin-top: -40px;
      margin-bottom: -40px;
    }
    .banner img {
      width: 100%;
      margin: -40px 0 -40px;
    }
  </style>

  <section>
    <div class="banner">
      <img src="https://conmore.se/wp-content/uploads/2016/09/scania.jpg" />
    </div>
  </section>

  <section>
    <div class="container-fluid">
      <h1>headline</h1>

      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et augue vel orci semper iaculis. Nam non faucibus justo, congue laoreet lorem. Morbi tempor scelerisque enim quis fermentum. Nunc dictum metus quis commodo faucibus. Suspendisse facilisis dignissim fringilla. Suspendisse malesuada sapien felis, et rutrum sem commodo nec. Quisque blandit justo vitae nisl aliquam, a maximus nisi sollicitudin. Mauris mollis, augue interdum feugiat placerat, nisl velit interdum ligula, et vestibulum leo est et ex. Mauris gravida suscipit sapien sed sodales.

      Morbi cursus nunc non eros accumsan pretium. Ut quis massa ultrices, laoreet mauris sed, cursus quam. Aenean tempor commodo rutrum. Vestibulum ultricies est non mauris mattis, in mollis metus tempor. Donec ut ex in arcu rutrum euismod. Suspendisse potenti. Aenean venenatis ex a orci scelerisque commodo. Morbi feugiat, augue imperdiet ultricies ultrices, lacus leo tempus nisi, eget bibendum massa neque vitae diam. Suspendisse commodo eros mi, nec viverra eros gravida quis. Pellentesque eu lobortis risus, in fringilla erat. Nulla in tellus a urna pharetra pellentesque faucibus at libero. Suspendisse potenti. Aliquam erat volutpat. Aliquam eu tellus ut purus faucibus egestas dapibus vitae mi. Morbi condimentum libero eros, eu maximus tellus elementum in. Vivamus et risus nec justo pretium fringilla.

      Duis et tortor finibus nulla luctus porttitor nec sed ante. Nulla facilisi. Mauris a arcu eu risus cursus facilisis sit amet a tortor. Proin rhoncus elit quis leo egestas, eu ultrices sapien congue. Ut sit amet felis ut nulla ullamcorper bibendum quis cursus lectus. Aliquam risus diam, blandit vitae enim vitae, egestas feugiat eros. Vivamus ut lorem ac lacus tincidunt luctus ut a orci. Praesent pretium efficitur elit, a posuere erat scelerisque eget. Quisque commodo felis non lorem imperdiet eleifend.


      </p>

      <h3>
        <c-icon name="angle-right"></c-icon>
        List
      </h3>
      <c-list items='[{"text":"item 1"},{"text":"item 2"}]'></c-list>
    </div>
  </section>
</c-content>

<c-footer></c-footer>
      `,
    },
  ],
};
