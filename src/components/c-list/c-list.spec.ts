import { cList } from './c-list';
describe('app', () => {
    it('builds', () => {
        expect(new cList()).toBeTruthy();
    });
});
