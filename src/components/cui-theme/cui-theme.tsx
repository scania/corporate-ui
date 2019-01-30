import { Component, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import { appSetTheme } from '../../actions/setTheme';

@Component({
  tag: 'cui-theme',
  styleUrl: 'cui-theme.scss'
})
export class CuiTheme {
  @Prop({ context: 'store' }) store: Store;
  @Prop() name: string;

  appSetTheme: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, (state) => {
      const {
        app: { name }
      } = state;

      return {
        name
      }
    });

    this.store.mapDispatchToProps(this, {
      appSetTheme
    });
    this.appSetTheme(this.name)
  }

  render() {
    return (
      <link rel="stylesheet" href={'../../themes/' + this.name + '/'+ this.name+'.css'} />
    )
  }
}
