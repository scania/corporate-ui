import { Content } from './content';
import { applyTheme } from '../../unittest';

const component = new Content();

describe('content', (function () {
  it('is initiated', () => {
    expect(this).toBeTruthy();
  });

  applyTheme(Content);
}).bind(component));
