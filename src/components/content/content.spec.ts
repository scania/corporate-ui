import { Content } from './content';
import { applyTheme } from '../../unittest';

const component = new Content();

describe('content', () => {
  
    it('is initiated', () => {
    expect(component).toBeTruthy();
  });


});

describe('content', () => applyTheme(Content));
