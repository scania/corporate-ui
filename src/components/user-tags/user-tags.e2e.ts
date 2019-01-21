import { newE2EPage } from '@stencil/core/testing';
describe('user-tags', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('user-tags');
        expect(element).toHaveClass('hydrated');
    });
});
