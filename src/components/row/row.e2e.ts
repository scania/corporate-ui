import { newE2EPage } from '@stencil/core/testing';
describe('c-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-row></c-row>');
    const element = await page.find('c-row');
    expect(element).toHaveClass('hydrated');
  });
});
