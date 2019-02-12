import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-field',
  styleUrl: 'cui-field.scss',
  shadow: true
})
export class CuiField {
  @Prop() type: string = 'text';
  @Prop() value: string = '';

  render() {
    if (this.type === 'text' || this.type === 'password') {
      return (
        <input type={this.type} value={this.value} />
      )
    } else {
      <textarea>{this.value}</textarea>
    }
  }
}
