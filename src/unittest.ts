import { store, actions } from './store';

export const applyTheme = (Component) => {
  it('should support theming', () => {
    let component;
    const theme = 'scania';
    const newTheme = 'man';

    store.dispatch({ type: actions.SET_THEME, name: theme });

    // We initiate header after the theme is set to make sure
    // that the component have the correct initial theme set
    component = new Component();

    expect(store.getState().theme.name).toBe(theme);
    expect(component.currentTheme).toBe(theme);

    component.updateTheme(newTheme);

    expect(component.currentTheme).toBe(newTheme);
    expect(store.getState().theme.name).not.toBe(newTheme);
  });
};
