import { cContainer } from './c-container';
describe('app', () => {
    it('builds', () => {
        expect(new cContainer()).toBeTruthy();
    });
});
