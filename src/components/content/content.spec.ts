import { Content } from './content';
import { applyTheme } from '../../unittest';

const component = new Content();

(function () {
  describe('content', () => {
    it('is initiated', () => {
      expect(this).toBeTruthy();
    });

    applyTheme(Content);
  });
}).call(component);
