import { CuiContainer } from './cui-container';
describe('app', () => {
    it('builds', () => {
        expect(new CuiContainer()).toBeTruthy();
    });
});
