import { newE2EPage } from '@stencil/core/testing';
describe('cui-column', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-column></cui-column>');
        const element = await page.find('cui-column');
        expect(element).toHaveClass('hydrated');
    });
});
