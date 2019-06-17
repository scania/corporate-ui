import { SocialMedia } from './social-media';
import { applyTheme } from '../../unittest';

const component = new SocialMedia();

(function () {
  describe('social media', () => {
    it('is initiated', () => {
      expect(this).toBeTruthy();
    });

    applyTheme(SocialMedia);
  });
}).call(component);
