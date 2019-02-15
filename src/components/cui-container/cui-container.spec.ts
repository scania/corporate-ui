import { cContainer } from './cui-container';
describe('app', () => {
    it('builds', () => {
        expect(new cContainer()).toBeTruthy();
    });
});
