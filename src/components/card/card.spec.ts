import { Card } from './card';
describe('app', () => {
    it('builds', () => {
        expect(new Card()).toBeTruthy();
    });
});
