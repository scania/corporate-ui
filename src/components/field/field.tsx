import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-field',
  styleUrl: 'field.scss',
  shadow: true,
})
export class Field {
  @Prop() type = 'text';

  @Prop() value = '';

  render() {
    if (this.type === 'text' || this.type === 'password') {
      return <input type={this.type} value={this.value} />;
    }
      <textarea>{this.value}</textarea>;
  }
}
