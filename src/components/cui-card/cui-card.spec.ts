import { cCard } from './cui-card';
describe('app', () => {
    it('builds', () => {
        expect(new cCard()).toBeTruthy();
    });
});
