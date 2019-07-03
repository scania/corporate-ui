import {
  Component, Prop, State, Watch,
} from '@stencil/core';

import { library, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, fab);

@Component({
  tag: 'c-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
  @Prop() name = 'circle';

  @State() icon: any;

  @Watch('name')
  setIcon(name) {
    let iconObject = findIconDefinition({ prefix: 'fas', iconName: name });
    iconObject = iconObject || findIconDefinition({ prefix: 'fab', iconName: name });
    iconObject = iconObject || findIconDefinition({ prefix: 'fas', iconName: 'question' });
    if (iconObject) {
      this.icon = icon(iconObject).html;
    }
  }

  componentWillLoad() {
    this.setIcon(this.name);
  }

  hostData() {
    return {
      innerHTML: this.icon,
    };
  }

  render() {
    return <slot />;
  }
}
