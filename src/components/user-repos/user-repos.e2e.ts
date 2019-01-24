import { newE2EPage } from '@stencil/core/testing';
describe('user-repos', () => {
    it('renders', async () => {
        const page = await newE2EPage({ url: '/' });
        const element = await page.find('user-repos');
        expect(element).toHaveClass('hydrated');
    });
});
