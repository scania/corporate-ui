export function renderMain(page) {
  return `
    <div class="container-fluid ${titleToClass(page.kind)} ${titleToClass(page.title)}-wrapper">
      <header>
        <h4>${page.title}</h4>
      </header>

      ${page.content}
    </div>
  `;
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

export function renderOverview(page) {
  const description = typeof page.description === 'string' ? [page.description] : page.description;

  return renderMain({
    ...page,
    content: `
      <section class="overview">
        ${description ? description.map(paragraph => `
          <p>${paragraph}</p>
        `).join('') : ''}

        ${page.items ? page.items.map(item => `
          <c-card
            data-sb-kind="${page.kind}"
            data-sb-story="${item.title}"
            class="component">
            <div slot="card-body" class="component">${item.preview}</div>
            <strong slot="card-footer">${item.title}</strong>
          </c-card>
        `).join('') : ''}
      </section>
    `,
  });
}

export function renderItem(page) {
  const description = typeof page.description === 'string' ? [page.description] : page.description;

  return renderMain({
    ...page,
    content: `
      <section class="template">
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
        <section>
          ${description.map(paragraph => `
            <p>${paragraph}</p>
          `).join('')}
        </section>
      ` : ''}

      ${page.items ? page.items.map(item => `
        <section class="component">
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

      <section>
        ${page.doc ? renderProperties(page.doc.props) : ''}
      </section>
    `,
  });
}

export function importAll(req, cache) {
  return req.keys().forEach(key => cache[key] = req(key));
}

function titleToClass(name) {
  return name ? name.toLowerCase().split(' ').join('-') : '';
}
