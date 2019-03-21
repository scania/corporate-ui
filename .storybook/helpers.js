import docs from '../data/docs.json';

export function renderMain(page) {
  return `
    <main>
      <header>
        <h4>${page.title}</h4>
      </header>

      ${page.content}
    </main>
  `
}

export function renderProperties(props) {
  return `
    <h4>Properties</h4>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          ${props.map(prop => `
            <tr>
              <td>${prop.name}</td>
              <td>${prop.type}</td>
              <td>${prop.default}</td>
            </tr>
          `).join('')}
        </body>
      </table>
    </div>
  `
}

export function renderOverview(page) {
  return renderMain({
    ...page,
    content: `
      <section class="overview">
        ${page.description ? `<p>${page.description}</p>` : ''}

        ${page.items.map(item => `
          <c-card
            data-sb-kind="${page.kind}"
            data-sb-story="${item.title}"
            class="component">
            <div slot="card-body">${item.preview}</div>
            <strong slot="card-footer">${item.title}</strong>
          </c-card>
        `).join('')}
      </section>
    `
  })
}

export function renderItem(page) {
  return renderMain({
    ...page,
    content: `
      <section class="template">
        <h4>${page.title}</h4>
        ${ page.description ? `<p>${page.description}</p>` : '' }

        ${page.content}
      </section>
    `
  })
}

export function renderItems(page) {
  let doc = docs.components.find(doc => doc.tag === page.name);

  return renderMain({
    ...page,
    content: `
      ${page.items.map(item => `
        <section class="component">
          <h4>${item.title}</h4>
          <div>
            <figure>${item.content}</figure>

            <details>
              <summary>Toggle code example</summary>
              <c-code-sample>${item.content}</c-code-sample>
            </details>
          </div>
        </section>
      `).join('')}
      <section>
        ${doc ? renderProperties(doc.props) : ''}
      </section>
    `
  })
}

export function importAll(req, cache) {
  return req.keys().forEach(key => cache[key] = req(key));
}
