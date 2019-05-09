import { newE2EPage } from '@stencil/core/testing';

let page;
const root = 'c-navigation >>>';

const checkSlot = (link, type) => {
  it(`should generate ${type} links with slot`, async () => {
    let template;
    let example;

    await page.setContent(`
      <c-navigation>
        <a href="/${link}" slot="${type}">${link}</a>
      </c-navigation>`);
    
    // find items slot
    template = await page.find(`${root} slot[name=${type}]`);
    expect(template).toBeTruthy();

    // ensure slot renders correct href and text
    example = await page.find(`c-navigation a[slot=${type}]`);
    expect(example).toBeTruthy();
    expect(example).toEqualHtml(`
      <a href="/${link}" slot="${type}">${link}</a>
    `);
  });
}

beforeEach(async () => {
  page = await newE2EPage();
});

describe('navigation', () => {
  it('is rendered', async () => {
    await page.setContent(`
      <c-navigation></c-navigation>`);
    
    const component = await page.find(`c-navigation`);
    expect(component).toHaveClass('hydrated');

    const navbar = await page.find(`${root} .navbar`);
    expect(navbar).not.toBeNull();

  });

  it('should generate links', async () => {
    await page.setContent(`
      <c-navigation 
        primary-items='[{ "text": "home", "href": "/home"}]'
        secondary-items='[{ "text": "more", "href": "/more"}]'>
      </c-navigation>`);

    const navbarNav = await page.findAll(`${root} .navbar-nav`)

    expect(navbarNav).toHaveLength(2); 
    
    // find a element for primary items
    const linkPrimary = await page.find(`${root} .navbar-nav a`);

    // ensure correct href and text is rendered for primary items
    expect(linkPrimary).toEqualHtml(`
      <a href="/home" class="nav-item nav-link">home</a>
    `);

    // ensure ml-auto class is rendered
    const linkSecondary = await page.find(`${root} .navbar-nav.ml-auto a`);
    
    // ensure correct href and text is rendered for secondary items
    expect(linkSecondary).toEqualHtml(`
      <a href="/more" class="nav-item nav-link">more</a>
    `);
  });

});

// test slot elements
describe('navigation', () => checkSlot('home','primary-items'));
describe('navigation', () => checkSlot('more','secondary-items'));
