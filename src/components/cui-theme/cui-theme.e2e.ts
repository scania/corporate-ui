import { newE2EPage } from '@stencil/core/testing';
describe('cui-theme', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('cui-theme');
        expect(element).toHaveClass('hydrated');
    });
});
