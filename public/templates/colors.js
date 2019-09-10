/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import 'document-register-element';

// We use this component for data binding purposes
class Colors extends React.Component {
  getColors(type) {
    const allColors = this.props.store.getState().color.items;
    const filteredColors = Object.entries(allColors).filter(([name, item]) => item.type === type);
    const colors = filteredColors.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

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
  ],
};
/* eslint-enable no-unused-vars */
