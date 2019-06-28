import {
  Component, Prop, State, Element,
} from '@stencil/core';

import hljs from 'highlight.js';

@Component({
  tag: 'c-code-sample',
  styleUrl: 'code-sample.scss',
  shadow: true,
})
export class Field {
  @Prop() type = 'html';

  @State() code;

  @Element() el: HTMLElement;

  componentWillLoad() {
    const parsed = this.el.innerHTML.replace(/"/g, "'")
      .replace(/&quot;/g, '"');

    if (!document.head.attachShadow) {
      hljs.configure({
        classPrefix: 'sc-c-code-sample hljs-',
        useBR: true,
      });
    }

    this.code = hljs.highlight(this.type, parsed, false).value;
  }

  render() {
    return [
      // need to keep render the slot to make it easy to hide it in IE
      <div class='slot'><slot/></div>,
      <pre>
        <code class={this.type} { ... { innerHTML: this.code } }>
        </code>
      </pre>,
    ];
  }
}
