import { newE2EPage } from '@stencil/core/testing';
describe('c-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-list></c-list>');
    const element = await page.find('c-list');
    expect(element).toHaveClass('hydrated');
  });
});
