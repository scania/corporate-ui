import { Container } from './container';
describe('app', () => {
    it('builds', () => {
        expect(new Container()).toBeTruthy();
    });
});
