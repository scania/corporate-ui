import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'c-hello-world',
  styleUrl: 'hello-world.scss',
  shadow: true
})
export class helloworld {

  @Prop() PropHelloWorld: String = "hello-World";

  render() {
    return (
      <div><h2>{this.PropHelloWorld}</h2></div>
    );
  }
}
