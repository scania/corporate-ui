import { Component } from '@angular/core';

// import { defineCustomElement } from 'new-cui-demo/dist/esm/es5/new-cui-demo.core';
// import { CuiAlert } from 'new-cui-demo/dist/esm/es5/new-cui-demo.components';

import { defineCustomElement } from '../../../../dist/esm/es5/corporate-ui.core';
import { CuiTheme, CuiHeader, CuiFooter, CuiContent, CuiNavigation, ContextConsumer } from '../../../../dist/esm/es5/corporate-ui.components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Andreas legendary app';
  items:any = [];
  primaryItems:any = [];

  constructor() {
    this.items = [
      { text: 'global', location: 'https://scania.com/ux-library' },
      { text: 'about', location: 'https://scania.github.io/corporate-ui-docs/developer/' }
    ];

    this.primaryItems = [
      { text: 'home', location: '/' },
      { text: 'contact', location: '/contact' }
    ];

    defineCustomElement(window, [CuiTheme, CuiHeader, CuiFooter, CuiContent, CuiNavigation, ContextConsumer]);
  }
}
