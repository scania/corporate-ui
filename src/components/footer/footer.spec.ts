import { Footer } from './footer';
import { applyTheme } from '../../unittest';

const component = new Footer();


describe('footer', () => {
  it('is initiated', () => {
    expect(component).toBeTruthy();
  });

  it('should have copyright text', () => {
    expect(component.text).toBeTruthy();
  });

  it('should generate footer links', () => {
    const items = [{text: 'contact us'}];
    const socialMedia = [{icon: 'youtube'}];

    testItems(items, '_items');
    testItems(socialMedia, '_socialMediaItems');
  });

});

describe('footer', () => applyTheme(Footer));

const testItems = (items, type) => {
  // check if property exist
  expect(component[type]).toBeTruthy();

  // check if property is an array
  expect( Array.isArray(component[type]) ).toBeTruthy();

  // check if initial property is empty
  expect(component[type]).toEqual([]);

  // check if functionality to generate link items work
  component.setItems(items,type);
  expect(component[type]).toEqual(items);
}
