import { newE2EPage } from '@stencil/core/testing';
describe('c-card', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<c-card></c-card>');
        const element = await page.find('c-card');
        expect(element).toHaveClass('hydrated');
    });
});
