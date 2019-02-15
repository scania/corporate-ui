import { newE2EPage } from '@stencil/core/testing';
describe('cui-list', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<c-list></c-list>');
        const element = await page.find('cui-list');
        expect(element).toHaveClass('hydrated');
    });
});
