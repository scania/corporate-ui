import { cCard } from './c-card';
describe('app', () => {
    it('builds', () => {
        expect(new cCard()).toBeTruthy();
    });
});
