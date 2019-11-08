import { store } from '../../store';
import { applyTheme } from '../../unittest';
import { DealerHeader } from './dealer-header';

const component = new DealerHeader();

describe('dealer-header', (function () {
  this.ContextStore = store;
  this.componentWillLoad();
  this.componentDidLoad();

  it('is initiated', () => {
    expect(this).toBeTruthy();
  });

  applyTheme(DealerHeader);
}).bind(component));
