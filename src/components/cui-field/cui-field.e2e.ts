import { newE2EPage } from '@stencil/core/testing';
describe('cui-field', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-field></cui-field>');
        const element = await page.find('cui-field');
        expect(element).toHaveClass('hydrated');
    });
});
