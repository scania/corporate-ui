import store from './store';
import { Theme } from './components/theme/theme';

(<any>window).CorporateUi = {};

export function applyTheme() {
  beforeEach(() => {
    store.dispose();
    const themeComponent = new Theme();
    themeComponent.name = theme;
    themeComponent.componentWillLoad();
  });
  // const component = new Component();

  const theme = 'scania';
  const newTheme = 'man';

  describe('theme', () => {
    this.componentWillLoad();
    // component.componentDidLoad();
    // component.store = store;
    // component.setTheme(theme);
    // component.theme = theme;

    it('should support theming', () => {
      expect(store.state.theme.current).toBe(theme);
      expect(this.theme).toBe(theme);

      this.setTheme(newTheme);

      expect(this.theme).toBe(newTheme);
      expect(store.state.theme.current).not.toBe(newTheme);
    });
  });
};
