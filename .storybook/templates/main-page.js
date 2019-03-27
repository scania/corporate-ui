export default {
  title: 'Main page',
  preview: '<c-icon name="cake"></c-icon>',
  items: [
    {
      title: 'Main page',
      content: `
<c-header
  site-name="Corporate UI Page"
  top-items='[{"text":"global", "location": "/"}, {"text":"about", "location": "/"}]'
  primary-items='[{"text":"home", "location": "/" }, {"text":"contact", "location": "/"}]'
  secondary-items='[{"text":"user", "location": "/" }]'
></c-header>

<c-content>
  <style>
    .banner {
      overflow: hidden;
      margin-top: -40px;
      margin-bottom: -40px;
    }
    .banner img {
      width: 100%;
      margin: -260px 0 -100px;
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

      <c-row>
        <c-column sm='{"size":3,"offset":2}''>
          <a href="/demo/angular/">
            <c-card>
              <strong slot="card-header">Angular demo</strong>
              <p slot="card-body">
                Click here to test the Angular demo page using custom
                elements.
              </p>
            </c-card>
          </a>
        </c-column>
        <c-column sm='{"size":3,"offset":1}''>
          <a href="/demo/react/">
            <c-card>
              <strong slot="card-header">React demo</strong>
              <p slot="card-body">
                Click here to test the React demo page using custom
                elements.
              </p>
            </c-card>
          </a>
        </c-column>
      </c-row>

      <h3>
        <c-icon name="angle-right"></c-icon>
        List
      </h3>
      <c-list items='[{"text":"item 1"},{"text":"item 2"}]'></c-list>

      <h3>
        <c-icon name="angle-right"></c-icon>
        Awinny´s repos
      </h3>
      <user-repos user-id="awinny"></user-repos>
    </div>
  </section>
</c-content>

<c-footer></c-footer>
      `
    }
  ]
};
