import { cHeader } from './cui-header';
describe('app', () => {
    it('builds', () => {
        expect(new cHeader()).toBeTruthy();
    });
});
