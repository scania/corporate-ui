import { Navigation } from './navigation';
import { applyTheme } from '../../unittest';

const component = new Navigation();

component.componentWillLoad();

describe('navigation', () => {
  it('is initiated', () => {
    expect(component).toBeTruthy();
  });

  it('should generate navigation links', () => {
    // arrange expected conditions
    const primaryItems = [{text: 'home'}];
    const secondaryItems = [{text: 'user'}];

    // act on setItems methods
    component.setItems(primaryItems, 'primaryItems');
    component.setItems(secondaryItems, 'secondaryItems');

    // assert expected results has been occured
    expect(component._primaryItems).toEqual(primaryItems);
    expect(component._secondaryItems).toEqual(secondaryItems);
  });

  it('should toggle navigation', () => {
    // ensure navigation fetch the open state from store
    expect(component.navigationOpen).not.toBeNull();

    // change open status
    component.toggleNavigation(true);
    
    // assert open status
    expect(component.navigationOpen).toBe(true);

    // change open status
    component.toggleNavigation(false);

    // assert open status
    expect(component.navigationOpen).toBe(false);
  });

  it('should toggle sub navigation', () => {
    // ensure sub navigation fetch the open state from store
    expect(component.navigationExpanded).not.toBeNull();

    // change expanded status
    component.toggleSubNavigation(true);
    
    // assert expanded status
    expect(component.navigationExpanded).toBe(true);

    // change expanded status
    component.toggleSubNavigation(false);

    // assert expanded status
    expect(component.navigationExpanded).toBe(false);
  });

});

describe('navigation', () => applyTheme(Navigation));