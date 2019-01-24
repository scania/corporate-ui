import { newE2EPage } from '@stencil/core/testing';
describe('cui-content', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('cui-content');
        expect(element).toHaveClass('hydrated');
    });
});
