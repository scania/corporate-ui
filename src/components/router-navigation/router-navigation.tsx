import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'router-navigation',
  styleUrl: 'router-navigation.scss',
  shadow: true
})
export class RouterNavigation {
  @Prop() primaryItems: any = [];

  _primaryItems: object[] = [];

  componentWillLoad() {
    this._primaryItems = Array.isArray(this.primaryItems) ? this.primaryItems : JSON.parse(this.primaryItems);
  }

  componentWillUpdate() {
    this._primaryItems = Array.isArray(this.primaryItems) ? this.primaryItems : JSON.parse(this.primaryItems);
  }

  render() {
    return (
      <c-navigation>
        {this._primaryItems.map(item =>
          <stencil-route-link url={ item['location'] } slot='primary-items'>
            { item['text'] }
          </stencil-route-link>
        )}
      </c-navigation>
    );
  }
}
