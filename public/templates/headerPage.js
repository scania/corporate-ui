export default {
  title: 'Header Showcase',
  preview: '<c-header></c-header>',
  method: () => `
  <c-header
    site-name='Application'
    short-name='App'>
    <a href="/" slot="items">global</a>
    <a href="/" slot="items">scania</a>
  </c-header>
  <c-navigation>
    <a href='/home' slot='primary-items'>home</a>
    <a href='/about' slot='primary-items' active=''>about</a>
    <a href='/first' slot='primary-items'>first</a>
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
  </c-navigation>
    <c-content>
        <section>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Commodo ullamcorper a lacus vestibulum sed arcu non. Adipiscing bibendum est ultricies integer quis. Nunc eget lorem dolor sed viverra ipsum nunc. Nulla facilisi etiam dignissim diam quis enim. Accumsan tortor posuere ac ut consequat. Morbi quis commodo odio aenean sed adipiscing. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Et malesuada fames ac turpis egestas maecenas pharetra. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Nec nam aliquam sem et.

          Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Gravida quis blandit turpis cursus in hac habitasse platea. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Aliquam eleifend mi in nulla posuere. Quisque id diam vel quam elementum pulvinar etiam non quam. Tempor commodo ullamcorper a lacus vestibulum. Sed adipiscing diam donec adipiscing tristique risus nec. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Volutpat est velit egestas dui id ornare. Volutpat sed cras ornare arcu dui. Interdum consectetur libero id faucibus. Suspendisse in est ante in. Massa eget egestas purus viverra accumsan in. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Id aliquet risus feugiat in ante metus. Ornare arcu dui vivamus arcu felis bibendum. Porttitor lacus luctus accumsan tortor posuere ac ut. Mi proin sed libero enim sed.

          Nisl condimentum id venenatis a condimentum. Est ullamcorper eget nulla facilisi etiam dignissim. Sed felis eget velit aliquet sagittis. Non odio euismod lacinia at quis risus sed. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Lectus arcu bibendum at varius vel pharetra vel turpis. Proin nibh nisl condimentum id venenatis a condimentum vitae sapien. Aliquam sem fringilla ut morbi tincidunt augue interdum. Consequat ac felis donec et. Auctor augue mauris augue neque gravida in. Vulputate mi sit amet mauris commodo quis imperdiet massa. Tortor vitae purus faucibus ornare suspendisse sed. Eget dolor morbi non arcu risus quis varius quam quisque. A pellentesque sit amet porttitor eget dolor morbi. Urna duis convallis convallis tellus. Sit amet est placerat in egestas erat imperdiet sed euismod.

          Tristique magna sit amet purus gravida quis blandit turpis. Et tortor consequat id porta nibh venenatis cras. Eget nunc scelerisque viverra mauris in aliquam sem. A erat nam at lectus urna duis. Cursus mattis molestie a iaculis at. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. At tempor commodo ullamcorper a lacus. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Nibh cras pulvinar mattis nunc sed blandit libero. Quis hendrerit dolor magna eget est lorem ipsum. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Id porta nibh venenatis cras sed. Viverra mauris in aliquam sem. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Pretium aenean pharetra magna ac placerat vestibulum. Nisl condimentum id venenatis a condimentum vitae sapien. Id aliquet risus feugiat in ante.

          Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Velit euismod in pellentesque massa. Feugiat vivamus at augue eget arcu dictum varius duis at. Augue eget arcu dictum varius duis at consectetur. Enim sed faucibus turpis in eu mi bibendum neque egestas. Leo urna molestie at elementum eu facilisis. Mauris commodo quis imperdiet massa tincidunt nunc. Facilisis gravida neque convallis a cras semper auctor. Facilisis volutpat est velit egestas dui. Suspendisse interdum consectetur libero id. Ullamcorper malesuada proin libero nunc consequat. A pellentesque sit amet porttitor eget dolor.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec feugiat in fermentum posuere. Commodo ullamcorper a lacus vestibulum sed arcu non. Adipiscing bibendum est ultricies integer quis. Nunc eget lorem dolor sed viverra ipsum nunc. Nulla facilisi etiam dignissim diam quis enim. Accumsan tortor posuere ac ut consequat. Morbi quis commodo odio aenean sed adipiscing. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Et malesuada fames ac turpis egestas maecenas pharetra. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Nec nam aliquam sem et.

          Ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Gravida quis blandit turpis cursus in hac habitasse platea. Volutpat diam ut venenatis tellus in metus vulputate eu scelerisque. Aliquam eleifend mi in nulla posuere. Quisque id diam vel quam elementum pulvinar etiam non quam. Tempor commodo ullamcorper a lacus vestibulum. Sed adipiscing diam donec adipiscing tristique risus nec. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Volutpat est velit egestas dui id ornare. Volutpat sed cras ornare arcu dui. Interdum consectetur libero id faucibus. Suspendisse in est ante in. Massa eget egestas purus viverra accumsan in. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Id aliquet risus feugiat in ante metus. Ornare arcu dui vivamus arcu felis bibendum. Porttitor lacus luctus accumsan tortor posuere ac ut. Mi proin sed libero enim sed.

          Nisl condimentum id venenatis a condimentum. Est ullamcorper eget nulla facilisi etiam dignissim. Sed felis eget velit aliquet sagittis. Non odio euismod lacinia at quis risus sed. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Lectus arcu bibendum at varius vel pharetra vel turpis. Proin nibh nisl condimentum id venenatis a condimentum vitae sapien. Aliquam sem fringilla ut morbi tincidunt augue interdum. Consequat ac felis donec et. Auctor augue mauris augue neque gravida in. Vulputate mi sit amet mauris commodo quis imperdiet massa. Tortor vitae purus faucibus ornare suspendisse sed. Eget dolor morbi non arcu risus quis varius quam quisque. A pellentesque sit amet porttitor eget dolor morbi. Urna duis convallis convallis tellus. Sit amet est placerat in egestas erat imperdiet sed euismod.

          Tristique magna sit amet purus gravida quis blandit turpis. Et tortor consequat id porta nibh venenatis cras. Eget nunc scelerisque viverra mauris in aliquam sem. A erat nam at lectus urna duis. Cursus mattis molestie a iaculis at. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. At tempor commodo ullamcorper a lacus. Fusce ut placerat orci nulla pellentesque dignissim enim sit. Nibh cras pulvinar mattis nunc sed blandit libero. Quis hendrerit dolor magna eget est lorem ipsum. Pretium fusce id velit ut tortor pretium viverra suspendisse potenti. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Id porta nibh venenatis cras sed. Viverra mauris in aliquam sem. Volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim. Pretium aenean pharetra magna ac placerat vestibulum. Nisl condimentum id venenatis a condimentum vitae sapien. Id aliquet risus feugiat in ante.

          Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Velit euismod in pellentesque massa. Feugiat vivamus at augue eget arcu dictum varius duis at. Augue eget arcu dictum varius duis at consectetur. Enim sed faucibus turpis in eu mi bibendum neque egestas. Leo urna molestie at elementum eu facilisis. Mauris commodo quis imperdiet massa tincidunt nunc. Facilisis gravida neque convallis a cras semper auctor. Facilisis volutpat est velit egestas dui. Suspendisse interdum consectetur libero id. Ullamcorper malesuada proin libero nunc consequat. A pellentesque sit amet porttitor eget dolor.
          </p>
        </section>
    </c-content>
  `,
};
