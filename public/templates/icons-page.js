/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import 'document-register-element';

import { renderItem } from '../helpers';

// We use this component for data binding purposes
class Icons extends React.Component {
  constructor() {
    super();

    this.state = { icons: {} };
  }

  setItems() {
    const icons = this.props.store.getState().icon.items;
    if (this.state.icons !== icons) {
      this.setState({ icons });
    }
  }

  componentWillMount() {
    this.setItems();

    this.props.store.subscribe(() => this.setItems());
  }

  render() {
    return Object.keys(this.state.icons).map(icon => (
      <div className="icon" key={icon}>
        <c-icon name={icon} />
        {icon}
      </div>
    ));
  }
}

class IconList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.renderTemplate();

    if (window.CorporateUi && CorporateUi.storeReady) {
      return this.renderItems(window.CorporateUi);
    }

    document.addEventListener('storeReady', event => this.renderItems(event.detail));
  }

  renderItems(data) {
    ReactDOM.render(<Icons { ...data } />, this.querySelector('.icons'));
  }

  renderTemplate() {
    return `
      <style>
        .icons {
          display: flex;
          flex-wrap: wrap;
        }
        .icon {
          max-width: 16.666667%;
          margin-bottom: 30px;
          text-align: center;
          width: 100%;
        }
        c-icon {
          font-size: 3rem;
          color: #041e42;
          width: 100%;
        }
      </style>

      <div class="icons"></div>
    `;
  }
}

customElements.define('icon-list', IconList);

export default {
  title: 'Icons page',
  description: `The following icons are provided as part of the icon component and can be used
                like in the example but with chosen icon name.`,
  preview: '<c-icon name="car"></c-icon>',
  method: renderItem,
  content: `
    <style>
      .sample {
        margin-bottom: 50px;
      }
    </style>

    <div class="sample">
      <c-code-sample>
        <c-icon name="truck"></c-icon>
      </c-code-sample>
    </div>

    <h2>Icon list</h2>
    <icon-list />
  `,
};
/* eslint-enable no-unused-vars */
