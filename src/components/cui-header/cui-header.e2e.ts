import { newE2EPage } from '@stencil/core/testing';
describe('cui-header', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-header></cui-header>');
        const element = await page.find('cui-header');
        expect(element).toHaveClass('hydrated');
    });
});
