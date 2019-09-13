export function renderMain(page) {
  return `
    <header>
      <h4>${page.title}</h4>
    </header>

    <div class="container-fluid ${titleToClass(page.kind)} ${titleToClass(page.title)}-wrapper">
      ${page.content}
    </div>
  `;
}

export function renderOverview(page) {
  const description = typeof page.description === 'string' ? [page.description] : page.description;

  return renderMain({
    ...page,
    content: `
      <section class="overview">
        ${description ? description.map(paragraph => `
          <p>${paragraph}</p>
        `).join('') : ''}

        <div class="row">
          ${page.items ? page.items.map(item => `
            <div class="col-sm-3">
              <div
                class="card"
                data-sb-kind="${page.kind}"
                data-sb-story="${item.title}">
                <div class="card-body component">${item.preview}</div>
                <div class="card-footer">
                  <strong slot="card-footer">${item.title}</strong>
                </div>
              </div>
            </div>
          `).join('') : ''}
        </div>
      </section>
    `,
  });
}

export function renderItem(page) {
  const description = typeof page.description === 'string' ? [page.description] : page.description;

  return renderMain({
    ...page,
    content: `
      <section class="container template">
        <h4>${page.title}</h4>

        ${description ? description.map(paragraph => `
          <p>${paragraph}</p>
        `).join('') : ''}

        ${page.content}
      </section>
    `,
  });
}

export function renderItems(page) {
  const description = typeof page.description === 'string' ? [page.description] : page.description;

  return renderMain({
    ...page,
    content: `
      ${description ? `
        <section class="container">
          ${description.map(paragraph => `
            <p>${paragraph}</p>
          `).join('')}
        </section>
      ` : ''}

      ${page.items ? page.items.map(item => `
        <section class="container component">
          <h4>${item.title}</h4>

          ${item.description ? `
          <div class="description">${item.description}</div>
          ` : ''}

          ${item.content ? `
          <div>
            <figure>${item.content}</figure>

            <details>
              <summary>Toggle code example</summary>
              <c-code-sample>${item.content}</c-code-sample>
            </details>
          </div>
          ` : ''}
          
        </section>
      `).join('') : ''}

      <section class="container">
        ${page.doc ? renderProperties(page.doc.props) : ''}
      </section>
    `,
  });
}

export function renderProperties(props) {
  return ` 
    <h4>Properties</h4>
    <div>
      <table class="properties-info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${props.map(prop => `
            <tr>
              <td>${prop.name}</td>
              <td>${prop.docs}</td>
              <td>${prop.type}</td>
              <td>${prop.default}</td>
            </tr>
          `).join('')}
        </body>
      </table>
    </div>
  `;
}

export function importAll(req, cache) {
  return req.keys().forEach(key => cache[key] = req(key));
}

function titleToClass(name) {
  return name ? name.toLowerCase().split(' ').join('-') : '';
}
