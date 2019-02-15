import { newE2EPage } from '@stencil/core/testing';

const componentName = 'cui-footer';
let page;
beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<c-footer></c-footer>');
});

const getByTestId = async dataTestId => await page.find(`${componentName} >>> [data-test-id="${dataTestId}"]`);

describe('cui-footer', () => {
    it('renders', async () => {
        const footer = await getByTestId('cui-footer');
        expect(footer).not.toBeNull();
        const copyright = await getByTestId('cui-footer-copyright');
        expect(copyright.textContent).toContain('Copyright');
        const logo = await getByTestId('cui-footer-logo');
        expect(logo).not.toBeNull();
    });
});
