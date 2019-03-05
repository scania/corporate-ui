import { newE2EPage } from '@stencil/core/testing';

describe('c-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-container></c-container>');
    const element = await page.find('c-container');
    expect(element).toHaveClass('hydrated');
  });
});
