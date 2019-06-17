import { store } from '../../store';
import { applyTheme } from '../../unittest';
import { Header } from './header';

const component = new Header();

(function () {
  const items = [{ text: 'global' }];

  this.store = store;
  this.componentWillLoad();

  describe('header', () => {
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
  });
}).call(component);
