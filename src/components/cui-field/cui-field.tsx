import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-field',
  styleUrl: 'c-field.scss',
  shadow: true
})
export class CuiField {
  @Prop() type = 'text';
  @Prop() value = '';

  render() {
    if (this.type === 'text' || this.type === 'password') {
      return (
        <input type={this.type} value={this.value} />
      );
    } else {
      <textarea>{ this.value }</textarea>;
    }
  }
}
