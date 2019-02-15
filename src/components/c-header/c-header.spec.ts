import { cHeader } from './c-header';
describe('app', () => {
    it('builds', () => {
        expect(new cHeader()).toBeTruthy();
    });
});
