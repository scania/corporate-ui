import {
  Component, h, Prop, State, Host, Element, Watch
} from '@stencil/core';

import BsModal from 'bootstrap/js/src/modal';

@Component({
  tag: 'c-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {
  @Prop({ context: 'store' }) ContextStore: any;

  /** Per default, this will inherit the value from c-theme name property */
  @Prop({ mutable: true }) theme: string;

  @Prop() config;

  @Prop() event;

  @Prop() open;

  @State() store: any;

  @State() tagName: string;

  @State() currentTheme = { components: [] };

  @State() items: Array<any> = [];

  @State() modal;

  @State() dialog;

  @State() all = false;

  @Element() el;

  @Watch('theme')
  setTheme(name = undefined) {
    this.theme = name || this.store.getState().theme.current;
    this.currentTheme = this.store.getState().theme.items[this.theme];
  }

  @Watch('open')
  openDialog(state) {
    if(state) {
      this.modal.show(this.dialog);
    } else {
      this.modal.hide();
    }

    // We need to manually do this here because of no access to 'transitionComplete()'
    this.modal._isTransitioning = false;
  }

  appendStyle(state) {
    if(state !== false) return;

    const css = `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1040;
        width: 100vw;
        height: 100vh;
        background-color: #000;
      }
      .modal-backdrop.fade { opacity: 0; }
      .modal-backdrop.show { opacity: 0.5; }`;
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
  }

  componentWillLoad() {
    this.store = this.ContextStore || (window as any).CorporateUi.store;

    this.setTheme(this.theme);

    this.store.subscribe(() => this.setTheme());

    if (!(this.el && this.el.nodeName)) return;

    this.tagName = this.el.nodeName.toLowerCase();

    this.modal = new BsModal(this.el, this.config);

    this.appendStyle(this.store.getState().theme.global);
  }

  componentDidLoad() {
    this.openDialog(this.open);
  }

  render() {
    return (
      <Host class="fade" tabindex="-1" role="dialog" aria-modal="true">
        { this.currentTheme ? <style>{ this.currentTheme.components[this.tagName] }</style> : '' }

        <div class="modal-dialog modal-dialog-centered" role="document" ref={el => this.dialog = el}>
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header" />
              { this.config.backdrop !== 'static' ?
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              : '' }
            </div>
            <div class="modal-body">
              <slot />
            </div>
            <div class="modal-footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
