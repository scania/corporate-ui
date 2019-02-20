import { newE2EPage } from '@stencil/core/testing';
describe('c-navigation', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-navigation></c-navigation>');
    const element = await page.find('c-navigation');
    expect(element).toHaveClass('hydrated');
  });
});
