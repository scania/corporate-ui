import {
  Component, h, Prop, State, Element, Watch
} from '@stencil/core';

import Tab from 'bootstrap/js/src/tab';

import Cookies from 'js-cookie';

@Component({
  tag: 'c-cookie',
  styleUrl: 'cookie.scss',
  shadow: true,
})
export class Cookie {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  @Prop() headline = 'Confidentiality agreement';

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme = { components: [] };

  @State() items: Array<any> = [];

  @State() tab;

  @State() form;

  @State() all = false;

  @State() text;

  @Element() el;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.current;
    this.currentTheme = this.store.getState().theme.items[this.theme];
  }

  @Watch('tab')
  initTabs(el) {
    // TODO: Maybe we can solve this in a better way later
    if(this.el.parentNode.nodeName !== 'C-CODE-SAMPLE') {
      const tab = new Tab(el);

      // We use a timeout here to make sure the dynamic tab-content have time to get added
      setTimeout(() => {
        const target = this.el.shadowRoot.querySelector(el.getAttribute('href'));

        el.onclick = (event) => {
          event.preventDefault();
          tab.show();

          // Due to bs methods having document hardcoded we need to do this
          tab._activate(target, target.parentNode, () => {});
        }
      });
    }
  }

  save(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    let object = {};

    if(this.all) {
      this.items.filter(item => item.toggable).forEach(value => object[value.id] = 'true');
    } else {
      formData.forEach((value, key) => object[key] = value);
    }

    // TODO: It would be better to change the items value and let
    // the interface rerender and then get the data from formData
    // but for some reason the template is not rerendered correctly
    // if(this.all) {
    //   this.items.forEach(item => item.attributes.checked = true);
    // }
    // formData.forEach((value, key) => object[key] = value);

    Cookies.set('ConfidentialityAgreement', JSON.stringify(object));
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme());

    if (!(this.el && this.el.nodeName)) return;

    this.tagName = this.el.nodeName.toLowerCase();
  }

  componentDidLoad() {
    // TODO: It would make sense to create a tab and tab-item component.
    // That can be used instead of this hacky way

    const slotted = this.el.shadowRoot.querySelector('slot[name="config"]');
    const items = slotted.assignedNodes().filter((node) => { return node.nodeName !== '#text'; });

    this.items = Array.from(items).map((item:any) => ({
      content: item.outerHTML,
      id: item.getAttribute('text').match(/[a-z]+/gi)
        .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join(''),
      type: item.getAttribute('type'),
      text: item.getAttribute('text'),
      toggable: item.getAttribute('toggable') !== 'false',
      attributes: {
        disabled: item.getAttribute('mandatory') === 'true',
        checked: item.getAttribute('checked') === 'true'
      }
    }));

    // TODO: If a cookie exists then read its value and use its values as preset
    // if(Cookies.get('ConfidentialityAgreement')) {}

    // TODO: Maybe we can solve this in a better way later
    if(this.el.parentNode.nodeName !== 'C-CODE-SAMPLE' && !Cookies.get('ConfidentialityAgreement')) {
      // this.openDialog(this.open);
    }
  }

  render() {
    return [
      this.currentTheme ? <style>{ this.currentTheme.components[this.tagName] }</style> : '',

      <c-modal>
        <slot name="config" />

        <h2 class="modal-title" slot="header">{this.headline}</h2>

        <div class="row h-100">
          <div class="col-3 h-100">
            <nav class="list-group" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {this.items.map((item, index) => (
                <a href={'#v-pills-' + index} class={'list-group-item list-group-item-action' + (index === 0 ? ' active' : '')} data-toggle="pill" ref={el => this.tab = el}>
                  {item.text}

                  {item.toggable ?
                    <div class="custom-control custom-switch" onClick={event => event.stopPropagation()}>
                      <input type="checkbox" name={item.type || item.id} id={item.type || item.id} value="true" class="custom-control-input" { ... { ...item.attributes } } />
                      <label class="custom-control-label" { ... { for: item.type || item.id } }></label>
                    </div>
                  : ''}

                  {item.toggable && item.attributes.disabled ?
                    <input type="checkbox" name={item.type || item.id} checked={item.attributes.checked} value="true" hidden />
                  : ''}
                </a>
              ))}

              <slot name="link" />
            </nav>
          </div>
          <div class="col-9 content">
            <div class="tab-content">
              {this.items.map((item, index) => (
                <div class={'tab-pane fade' + (index === 0 ? ' show active' : '')} id={'v-pills-' + index} role="tabpanel" aria-labelledby={'v-pills-' + index + '-tab'}>
                  <h3>{item.text}</h3>
                  <article innerHTML={item.content} />

                  {/* {item.toggable ?
                    <div class="custom-control custom-switch pt-4 pb-4">
                      <input type="checkbox" class="custom-control-input" { ... { ...item.attributes } } />
                      <label class="custom-control-label" onClick={() => {this.items[index].attributes.checked = false; console.log(this.items[index])}}></label>
                    </div>
                  : ''} */}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-sm btn-secondary" onClick={() => this.all = true} slot="footer">Approve all</button>
        <button type="submit" class="btn btn-sm btn-primary" slot="footer">Save preferences</button>
      </c-modal>,

      <footer>
        <slot name="main" />
      </footer>
    ]
  }
}
