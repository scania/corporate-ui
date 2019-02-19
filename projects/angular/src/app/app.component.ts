import { Component } from '@angular/core';

// import { defineCustomElement } from 'new-c-demo/dist/esm/es5/new-c-demo.core';
// import { cAlert } from 'new-c-demo/dist/esm/es5/new-c-demo.components';

import { defineCustomElement } from '../../../../dist/esm/es5/corporate-ui.core';
import { cTheme, cHeader, cFooter, cContent, cNavigation } from '../../../../dist/esm/es5/corporate-ui.components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Andreas legendary app';
  items: any = [];
  primaryItems: any = [];

  constructor() {
    this.items = [
      { text: 'global', location: 'https://scania.com/ux-library' },
      { text: 'about', location: 'https://scania.github.io/corporate-ui-docs/developer/' }
    ];

    this.primaryItems = [
      { text: 'home', location: '/' },
      { text: 'contact', location: '/contact' }
    ];

    defineCustomElement(window, [cTheme, cHeader, cFooter, cContent, cNavigation]);
  }
}
