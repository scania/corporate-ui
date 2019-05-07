import { SocialMedia } from './social-media';
import { applyTheme } from '../../unittest';

const component = new SocialMedia();

describe('social media', () => {
  
    it('is initiated', () => {
    expect(component).toBeTruthy();
  });


});

describe('social media', () => applyTheme(SocialMedia));
