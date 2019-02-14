import { newE2EPage } from '@stencil/core/testing';
describe('cui-icon', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('cui-icon');
        expect(element).toHaveClass('hydrated');
    });
});
