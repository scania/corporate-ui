import { newE2EPage } from '@stencil/core/testing';
describe('c-icon', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('c-icon');
        expect(element).toHaveClass('hydrated');
    });
});
