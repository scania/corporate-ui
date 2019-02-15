import { newE2EPage } from '@stencil/core/testing';
describe('cui-card', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<c-card></c-card>');
        const element = await page.find('cui-card');
        expect(element).toHaveClass('hydrated');
    });
});
