import { Component, Prop } from '@stencil/core';
import Tunnel from '../data/theme';

@Component({
  tag: 'cui-theme',
  styleUrl: 'cui-theme.scss'
})
export class CuiTheme {
  @Prop() name: string;

  render() {
    const tunnelState = {
      theme: this.name
    };
    return ([
      <Tunnel.Provider state={tunnelState}></Tunnel.Provider>,
      <link rel="stylesheet" href={'../../themes/' + this.name + '/'+ this.name+'.css'} />
    ])
  }
}
