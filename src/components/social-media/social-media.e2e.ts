import { newE2EPage } from '@stencil/core/testing';

let page;

beforeEach(async () => {
  page = await newE2EPage();
});

describe('social media', () => {
  it('is rendered', async () => {
    await page.setContent('<c-social-media icon=\'youtube\' href=\'/youtube\'></c-social-media>');

    // ensure social media component is rendered
    const component = await page.find('c-social-media');
    expect(component).toHaveClass('hydrated');

    // ensure component renders link & icon
    const icon = await page.find('c-social-media >>> a');
    expect(icon).toEqualHtml(`
      <a href="/youtube"><c-icon class="hydrated"></c-icon></a>
    `);
  });
});
