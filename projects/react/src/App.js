import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { defineCustomElement } from '../../../dist/esm/es5/corporate-ui.core';
import {
  CuiTheme,
  CuiHeader,
  CuiFooter,
  CuiContent,
  CuiNavigation
} from '../../../dist/esm/es5/corporate-ui.components';

class App extends Component {
  constructor(props) {
    super(props);

    this.title = 'A react app';

    this.items = [
      { text: 'global', location: 'https://scania.com/ux-library' },
      {
        text: 'about',
        location: 'https://scania.github.io/corporate-ui-docs/developer/'
      }
    ];

    this.primaryItems = [
      { text: 'home', location: '/' },
      { text: 'contact', location: '/contact' }
    ];

    defineCustomElement(window, [
      CuiTheme,
      CuiHeader,
      CuiFooter,
      CuiContent,
      CuiNavigation
    ]);
  }

  render() {
    return [
      <c-theme name="scania" />,
      <c-header site-name={this.title} items={JSON.stringify(this.items)} />,
      <c-content>
        ,<c-navigation primary-items={JSON.stringify(this.primaryItems)} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </c-content>,
      <c-footer />
    ];
  }
}

export default App;
