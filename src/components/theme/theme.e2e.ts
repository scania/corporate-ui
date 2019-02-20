import { newE2EPage } from '@stencil/core/testing';
describe('c-theme', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/' });
    const element = await page.find('c-theme');
    expect(element).toHaveClass('hydrated');
  });
});
