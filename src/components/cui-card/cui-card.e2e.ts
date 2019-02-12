import { newE2EPage } from '@stencil/core/testing';
describe('cui-card', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-card></cui-card>');
        const element = await page.find('cui-card');
        expect(element).toHaveClass('hydrated');
    });
});
