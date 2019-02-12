import { newE2EPage } from '@stencil/core/testing';
describe('cui-row', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-row></cui-row>');
        const element = await page.find('cui-row');
        expect(element).toHaveClass('hydrated');
    });
});
