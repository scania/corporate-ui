import { store } from './store';
import { Theme } from './components/theme/theme';

export const applyTheme = (Component) => {
  const component = new Component();
  const theme = 'scania';
  const newTheme = 'man';

  const themeComponent = new Theme();
  themeComponent.name = theme;
  themeComponent.store = store;
  themeComponent.componentWillLoad();

  // store.dispatch({ type: actions.SET_THEME, name: theme });

  (function () {
    this.store = store;
    this.setTheme(theme);
    // this.theme = theme;

    it('should support theming', () => {
      expect(store.getState().theme.name).toBe(theme);
      expect(this.theme).toBe(theme);

      this.setTheme(newTheme);

      expect(this.theme).toBe(newTheme);
      expect(store.getState().theme.name).not.toBe(newTheme);
    });
  }).call(component);
};
