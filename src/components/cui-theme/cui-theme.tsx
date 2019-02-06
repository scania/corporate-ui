import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-theme',
  styleUrl: 'cui-theme.scss'
})
export class CuiTheme {
  @Prop() name: string;

  render() {
    return (
      <link rel="stylesheet" href={'../../themes/' + this.name + '/'+ this.name+'.css'} />
    )
  }
}
