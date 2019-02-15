import { cContent } from './c-content';
describe('app-root', () => {
    it('builds', () => {
        expect(new cContent()).toBeTruthy();
    });
});
