import { Component, Prop } from '@stencil/core';
import { fontawesome } from './icons';
// import {} from '@fortawesome/fontawesome-pro/sprites/light.svg';

@Component({
  tag: 'cui-icon',
  styleUrl: 'cui-icon.scss',
  shadow: true
})
export class CuiIcon {
  @Prop() name: string;
  @Prop() color: string = 'black';

  componentWillLoad(){
    let style = document.getElementById('FontAwesomeIcon');

    if(style===null) {
      let css = fontawesome,
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');
      style.id = 'FontAwesomeIcon';
      style.type = 'text/css';
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }

  }

  render() {
    return [
      <i class={'fa fa-'+this.name}></i>
    ];
  }
}
