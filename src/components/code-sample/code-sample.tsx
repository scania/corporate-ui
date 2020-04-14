import {
  Component, h, Prop, State, Element,
} from '@stencil/core';

// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/highlight';
import js from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

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
    const parsed = this.el.innerHTML
      .replace(/"/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/<!---->/g, "");

    if (!document.head.attachShadow) {
      hljs.configure({
        classPrefix: 'sc-c-code-sample hljs-',
        useBR: true,
      });
    }

    hljs.registerLanguage('js', js);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('css', css);

    this.code = hljs.highlight(this.type, parsed, false).value;
  }

  render() {
    return [
      <slot />,
      <pre>
        <code class={this.type} { ... { innerHTML: this.code } }></code>
      </pre>
    ];
  }
}
