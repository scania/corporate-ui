import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'cui-column',
  styleUrl: 'cui-column.scss',
  shadow: true
})
export class CuiColumn {

  @Prop() sm: any;
  @Prop() md: any;
  @Prop() lg: any;
  @Prop() xl: any;

  hostData() {
    const data = { class: { col: true } };

    ['sm', 'md', 'lg', 'xl'].map(size => {
      let item = this[size];

      // Stop here if size is not defined
      if (!item) return;

      // Parse prop as it could contain either a number or a object
      try {
        item = JSON.parse(item);
      } catch {
        item = item;
      }

      if (typeof item === 'number') {
        data.class['col-' + size + (item ? '-' + item : '')] = item;
      } else {
        Object.keys(item).map(prop => {
          const prefix = prop === 'size' ? 'col' : prop;
          data.class[prefix + '-' + size + '-' + item[prop]] = prop;
        });
      }
    });

    return data;
  }

  render() {
    return <slot></slot>;
  }
}
