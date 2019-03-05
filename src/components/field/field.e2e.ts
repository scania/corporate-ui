import { newE2EPage } from '@stencil/core/testing';

describe('c-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-field></c-field>');
    const element = await page.find('c-field');
    expect(element).toHaveClass('hydrated');
  });
});
