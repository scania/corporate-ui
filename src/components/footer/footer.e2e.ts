import { newE2EPage } from '@stencil/core/testing';

const componentName = 'c-footer';
let page;
beforeEach(async () => {
  page = await newE2EPage();
  await page.setContent('<c-footer></c-footer>');
});

const getByTestId = async dataTestId => page.find(`${componentName} >>> [data-test-id="${dataTestId}"]`);

describe('c-footer', () => {
  it('renders', async () => {
    const footer = await getByTestId('c-footer');
    expect(footer).not.toBeNull();
    const copyright = await getByTestId('c-footer-copyright');
    expect(copyright.textContent).toContain('Copyright');
    const logo = await getByTestId('c-footer-logo');
    expect(logo).not.toBeNull();
  });
});
