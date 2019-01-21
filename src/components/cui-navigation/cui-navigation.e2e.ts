import { newE2EPage } from '@stencil/core/testing';
describe('cui-navigation', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-navigation></cui-navigation>');
        const element = await page.find('cui-navigation');
        expect(element).toHaveClass('hydrated');
    });
});
