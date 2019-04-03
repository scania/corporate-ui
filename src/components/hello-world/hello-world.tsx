import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-hello-world',
  styleUrl: 'hello-world.scss',
  shadow: true,
})
export class HelloWorld {
  @Prop() text: string = 'hello-World';

  render() {
    return (
      <div>
        <h2>{this.text} component</h2>
      </div>
    );
  }
}
