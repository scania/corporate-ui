import { newE2EPage } from '@stencil/core/testing';
describe('c-content', () => {
  it('renders', async () => {
    const page = await newE2EPage({ url: '/' });
    const element = await page.find('c-content');
    expect(element).toHaveClass('hydrated');
  });
});
