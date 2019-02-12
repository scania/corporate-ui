import { newE2EPage } from '@stencil/core/testing';
describe('cui-container', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-container></cui-container>');
        const element = await page.find('cui-container');
        expect(element).toHaveClass('hydrated');
    });
});
