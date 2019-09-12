/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import 'document-register-element';

// We use this component for data binding purposes
class Colors extends React.Component {
  getColors(type) {
    const allColors = this.props.store.getState().color.items;
    const filteredColors = Object.entries(allColors).filter(([name, item]) => item.type === type);
    const colors = this.fromEntries(filteredColors);

    return colors;
  }

  renderColor(name, hex) {
    const cssVar = `var(--${name})`;
    const supportCssVar = window.CSS && window.CSS.supports('background-color', cssVar);

    return supportCssVar ? cssVar : hex;
  }

  renderItems(type, classes = null) {
    const colors = this.getColors(type);

    return Object.entries(colors).map(([name, item]) => (
      <div className={classes} key={name}>
        <div className={`mb-5 color ${name}`} title={item.hex} style={{ backgroundColor: this.renderColor(name, item.hex) }}>
          <span>{name}</span>
        </div>

        {this.renderItems(name)}
      </div>
    ));
  }

  fromEntries(arr) {
    return arr.reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
  }

  render() {
    // TODO: Would be good to rework this without the need of classes here
    return this.renderItems(this.props.type, 'col-sm-6 col-md-4 col-lg-2');
  }
}

class ColorList extends HTMLElement {
  connectedCallback() {
    this.type = this.getAttribute('type');
    this.innerHTML = this.renderTemplate();

    if (window.CorporateUi && CorporateUi.storeReady) {
      return this.renderItems(window.CorporateUi);
    }

    document.addEventListener('storeReady', event => this.renderItems(event.detail));
  }

  renderItems(data) {
    data.type = this.type;
    ReactDOM.render(<Colors { ...data } />, this.querySelector('.colors'));
  }

  renderTemplate() {
    return `
      <style>
        .colors .color {
          width: 100%;
          height: 80px;
          text-align: right;
        }
        .colors .color span {
          background-color: #fff;
          padding: 5px 10px;
          display: inline-block;
          font-size: 12px;
          text-transform: capitalize;
        }
        .colors [class*="secondary"].color {
          border: 1px solid #c3c3c3;
        }
        .colors [class*="secondary"] span {
          margin-top: -2px;
          margin-right: -2px;
          border-style: inherit;
          border-color: inherit;
          border-width: 0 0 1px 1px;
        }
      </style>

      <div class="colors row"></div>
    `;
  }
}

customElements.define('color-list', ColorList);

export default {
  title: 'Colors',
  preview: '<color-list type="global" />',
  description: '',
  items: [
    {
      title: 'Global colors',
      description: `
      <color-list type="global" />`,
    },
    {
      title: 'Interaction colors',
      description: `
      <color-list type="interaction" />`,
    },
    {
      title: 'Extra colors',
      description: `
      <color-list type="extra" />`,
    },
    {
      title: 'Backgrounds',
      content: `
<div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
<div class="p-3 mb-2 bg-secondary">.bg-secondary</div>
<div class="p-3 mb-2 bg-success text-white">.bg-success</div>
<div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
<div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
<div class="p-3 mb-2 bg-info text-white">.bg-info</div>
<div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
<div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
<div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
      `,
    },
    {
      title: 'Texts',
      content: `
<p class="text-primary">.text-primary</p>
<p class="text-secondary bg-dark">.text-secondary</p>
<p class="text-success">.text-success</p>
<p class="text-danger">.text-danger</p>
<p class="text-warning">.text-warning</p>
<p class="text-info">.text-info</p>
<p class="text-light bg-dark">.text-light</p>
<p class="text-dark">.text-dark</p>
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-white bg-dark">.text-white</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
      `,
    },
    {
      title: 'Links',
      content: `
<p><a href="#" class="text-primary">Primary link</a></p>
<p><a href="#" class="text-secondary">Secondary link</a></p>
<p><a href="#" class="text-success">Success link</a></p>
<p><a href="#" class="text-danger">Danger link</a></p>
<p><a href="#" class="text-warning">Warning link</a></p>
<p><a href="#" class="text-info">Info link</a></p>
<p><a href="#" class="text-light bg-dark">Light link</a></p>
<p><a href="#" class="text-dark">Dark link</a></p>
<p><a href="#" class="text-muted">Muted link</a></p>
<p><a href="#" class="text-white bg-dark">White link</a></p>
      `,
    },
  ],
};
/* eslint-enable no-unused-vars */
