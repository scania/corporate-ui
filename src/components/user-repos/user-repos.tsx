import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'user-repos',
  styleUrl: 'user-repos.scss',
  shadow: true,
})
export class UserRepos {
  @Prop() userId: string;

  @State() repos: any = [];

  componentWillLoad() {
    // fetch('https://api.github.com/users/' + this.userId + '/repos')
    //   .then((response: Response) => response.json())
    //   .then(response => {
    //     this.repos = response.map((repo) => {
    //       return { text: repo.name }
    //     });
    //   });
  }

  render() {
    return <c-list items={this.repos} />;
  }
}
