import readme from './readme.md';

export default {
  title: 'Patterns/Footer',
  parameters: {
    notes: readme,
  },
};

export const Default = () => `
<c-theme name="scania"></c-theme>

<c-footer>
  <a href='/' slot='social-items'>
    <c-icon name='scania-youtube'></c-icon>
  </a>
  <a href='/' slot='social-items'>
    <c-icon name='scania-twitter'></c-icon>
  </a>
  <a href='/' target='_blank' slot='social-items'>
    <c-icon name='scania-linkedin'></c-icon>
  </a>

  <a href='/cookies' slot='items'>Cookies</a>
  <a href='/contact-us' target='_blank' slot='items'>Contact us</a>
</c-footer>
`;