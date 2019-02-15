import { newE2EPage } from '@stencil/core/testing';
describe('c-column', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<c-column></c-column>');
        const element = await page.find('c-column');
        expect(element).toHaveClass('hydrated');
    });
});
