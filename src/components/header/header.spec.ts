import { Header } from './header';
import { applyTheme } from '../../unittest';

const component = new Header();

component.componentWillLoad();

describe('header', () => {
  it('is initiated', () => {
    expect(component).toBeTruthy();
  });

  it('should generate top links', () => {
    const items = [{text: 'global'}];

    expect(component.items).not.toBeNull();
    expect( Array.isArray(component._items) ).toBeTruthy();
    expect(component._items).toEqual([]);

    component.setItems(items);

    expect(component._items).toEqual(items);
  });

  it('should toggle navigation', () => {
    expect(component.navigationOpen).toBeUndefined();

    component.toggleNavigation(true);
      
    expect(component.navigationOpen).toBe(true);

    component.toggleNavigation(false);
      
    expect(component.navigationOpen).toBe(false);
  });
});

describe('header', () => applyTheme(Header));
