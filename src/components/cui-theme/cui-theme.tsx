import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';

import { configureStore } from '../../store/index';
import { setTheme } from '../../actions/index';

@Component({
  tag: 'cui-theme',
  styleUrl: 'cui-theme.scss'
})
export class CuiTheme {
  @Prop() name: string;
  @Prop({ context: 'store' }) store: Store;

  @State() theme: string;

  setTheme: Action;

  componentWillLoad() {
    this.store.setStore(configureStore({}));

    this.store.mapStateToProps(this, (state) => {
      const {
        themeReducer: { theme }
      } = state;
      return {
        theme
      }
    });

    this.store.mapDispatchToProps(this, {
      setTheme
    })

    this.setTheme(this.name);
  }

  componentDidLoad(){
    console.log(this.theme);
  }

  render() {
    return (
      <link rel="stylesheet" href={'../../themes/' + this.name + '/'+ this.name+'.css'} />
    )
  }
}
