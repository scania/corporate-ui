import { helloworld } from './hello-world';
describe('app', () => {
  it('builds', () => {
    expect(new helloworld()).toBeTruthy();
  });
});
