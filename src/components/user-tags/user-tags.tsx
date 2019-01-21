import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'user-tags',
  styleUrl: 'user-tags.scss',
  shadow: true
})
export class UserTags {
  @Prop() userId: string;

  @State() tags: any = [];

  componentWillLoad() {
    fetch('https://connect.scania.com/user/teamroom/' + this.userId, {
      credentials: 'include'
    })
      .then((response: Response) => response.json())
      .then(response => {
        this.tags = response['tags'].map((tag) => {
          return { text: tag }
        });
      });
  }

  render() {
    return (
      <cui-list items={this.tags}></cui-list>
    )
  }
}
