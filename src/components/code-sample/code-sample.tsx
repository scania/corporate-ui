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

  componentDidLoad() {
    const elem = this.el.shadowRoot.querySelector('slot');

    if (elem) {
      elem.addEventListener('slotchange', event => this.renderExample(event.target));
      this.renderExample(elem);
    }
  }

  renderExample = node => {
    // Filter empty lines
    const code = node.assignedNodes().reduce((lines, line) => {
      if (line && line.nodeType === 1) {
        lines.push(line.outerHTML);
      }
      return lines;
    }, []);
    // TODO: We should not need all these, maybe we could solve this in a more dynamic way
    const parsed = code.join('\n')
      .replace(/"/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/ class='hydrated'/g, '')
      .replace(/ class='parent'/g, '')
      .replace(/ open='.*?'/g, '')
      .replace(/active=''/g, 'active');

    this.code = hljs.highlight(this.type, parsed, false).value;
  };

  // This solution might cause a security problems.

  render() {
    return [
      <slot />,
      <pre>
        <code class={this.type} { ... { innerHTML: this.code } }></code>
      </pre>,
    ];
  }
}
