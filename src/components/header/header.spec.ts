import { store } from '../../store';
import { applyTheme } from '../../unittest';
import { Header } from './header';

const component = new Header();

describe('header', (function () {
  const items = [{ text: 'global' }];

  this.ContextStore = store;
  this.componentWillLoad();
  this.componentDidLoad();

  it('is initiated', () => {
    expect(this).toBeTruthy();
  });

  it('should generate top links', () => {
    expect(this.items).toEqual([]);

    this.setItems(items);

    expect(this.items).toEqual(items);
  });

  it('should toggle navigation', () => {
    expect(this.navigationOpen).toBe(false);

    this.toggleNavigation(true);

    expect(this.navigationOpen).toBe(true);
  });

  applyTheme(Header);
}).bind(component));
