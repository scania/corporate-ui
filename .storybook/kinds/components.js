// import addonAPI from '@storybook/addons';
import marked from 'marked';
import { highlight } from 'highlight.js';
import { parse } from 'node-html-parser';
import { load } from 'cheerio';

import { renderKinds } from '../helpers';

import categories from '../../data/categories.json';
import components from '../../data/components.json';
import contents from '../../data/contents.json';
import docs from '../../data/docs.json';

import '../style/components.scss';

import 'highlight.js/styles/default.css';
import 'highlight.js/styles/github-gist.css';

// Here we filer out components that might cause rendering issues or are unnessesary at this time around
let filteredComponents = components.filter(item => ['c-column', 'c-container', 'c-content', 'c-row', 'c-field', 'c-list', 'user-repos'].indexOf(item.name) === -1);

[{ name: 'All' }, ...categories].map(category =>
  renderKinds(category, filteredComponents, 'Components', renderContent)
);

function renderContent(item) {
  let content = contents.find(doc => doc.id === item.content);
  let name = item.name.replace(/^c-/, '');
  let doc = docs.components.find(dpc => dpc.tag === item.name);
  let template;
  let docContent;
  let examples;

  try {
    template = require(`../stories/${item.name}.html`);
  } catch (err) {
    template = `<figure><${item.name}></${item.name}></figure>`;
  }
 
  // We use parse to get the correct non parsed html output
  let figures = parse(template).querySelectorAll('figure');
  let codes = [];
  for(var i=0; i<figures.length; i++) {
    codes.push(figures[i].innerHTML);
  }

  let $ = load(template);
  $('figure').each(function(key) {
    // We use code from parse plugin because cherrio parsing the html making the single qoutes getting replaced
    var code = highlight('html', codes[key]).value;
    $(this).after('<details><summary>Toggle code example</summary><pre><code class="html">' + code + '</code></pre></details>');
  });

  // template = html.innerHTML;
  template = $.html();

  docContent = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${doc.props.map(prop => `
          <tr>
            <td>${prop.name}</td>
            <td>${prop.type}</td>
            <td>${prop.default}</td>
          </tr>
        `).join('')}
      </body>
    </table>
  `;

  return `
    ${content ? '<section>' + marked(content.content) + '</section>' : ''}
    ${template ? '<section><h2>Example</h2>' + template + '</section>' : ''}
    ${docs ? '<section><h2>Properties</h2>' + docContent + '</section>' : ''}
  `;
}
