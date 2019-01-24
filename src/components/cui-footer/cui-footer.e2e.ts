import { newE2EPage } from '@stencil/core/testing';
describe('cui-footer', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<cui-footer></cui-footer>');
        const element = await page.find('cui-footer');
        expect(element).toHaveClass('hydrated');
    });
});
