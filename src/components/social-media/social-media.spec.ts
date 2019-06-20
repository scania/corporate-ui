import { SocialMedia } from './social-media';
import { applyTheme } from '../../unittest';

const component = new SocialMedia();

describe('social media', (function () {
  it('is initiated', () => {
    expect(this).toBeTruthy();
  });

  applyTheme(SocialMedia);
}).bind(component));
