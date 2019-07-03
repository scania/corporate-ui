import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { renderItem } from '../helpers';

export default {
  title: 'Icons page',
  description: `The following icons are provided as part of the icon component and can be used
                like in the example but with chosen icon name.`,
  preview: '<c-icon name="car"></c-icon>',
  method: renderItem,
  content: `
    <style>
      .sample {
        margin-bottom: 50px;
      }
      .icon {
        max-width: 16.666667%;
        margin-bottom: 30px;
        text-align: center;
      }
      c-icon {
        font-size: 3rem;
        color: #041e42;
        width: 100%;
      }
    </style>

    <div class="sample">
      <c-code-sample>
        <c-icon name="truck"></c-icon>
      </c-code-sample>
    </div>

    <h2>Solid icons</h2>

    ${Object.values(fas).map(renderIcon).join('')}

    <h2>Brand icons</h2>

    ${Object.values(fab).map(renderIcon).join('')}
  `,
};

function renderIcon(icon) {
  return `
    <div class="icon">
      <c-icon name="${icon.iconName}"></c-icon>
      ${icon.iconName}
    </div>
  `;
}
