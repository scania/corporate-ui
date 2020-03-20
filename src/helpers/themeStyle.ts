export function themeStyle(currentTheme, tagName, styleThis, el) {
  const css = currentTheme ? currentTheme.components[tagName] : '';
  let style;

  if(!styleThis) return;

  // This is used by browsers with support for shadowdom
  if(el.shadowRoot.adoptedStyleSheets) {
    style = new CSSStyleSheet();
    style.replaceSync(css);
    // TODO: We should not take first index we should all except the previous style
    el.shadowRoot.adoptedStyleSheets = [ el.shadowRoot.adoptedStyleSheets[0], style ];
  } else {
    const node = el.shadowRoot || el;
    style = el.querySelector('#themeStyle') || document.createElement('style');
    // style.appendChild(document.createTextNode(css));
    // style.innerHTML = css;
    style.id = 'themeStyle';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    if(!node.querySelector('#themeStyle')) {
      node.insertBefore(style, node.firstChild.nextSibling);
    }
  }
}