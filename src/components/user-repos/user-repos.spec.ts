import { UserRepos } from './user-repos';
describe('app', () => {
    it('builds', () => {
        expect(new UserRepos()).toBeTruthy();
    });
});
