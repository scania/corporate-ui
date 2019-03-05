import { newE2EPage } from '@stencil/core/testing';

describe('router-navigation', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<router-navigation></router-navigation>');
        const element = await page.find('router-navigation');
        expect(element).toHaveClass('hydrated');
    });
});
