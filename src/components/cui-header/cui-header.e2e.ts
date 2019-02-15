import { newE2EPage } from '@stencil/core/testing';
describe('cui-header', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<c-header></c-header>');
        const element = await page.find('cui-header');
        expect(element).toHaveClass('hydrated');
    });
});
