export default {
  title: 'Input group',
  preview: `
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">@</span>
    </div>
    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  </div>
  `,
  items: [
    {
      title: 'Basic use',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">@example.com</span>
        </div>
      </div>

      <label for="basic-url">Your vanity URL</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
        </div>
        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">With textarea</span>
        </div>
        <textarea class="form-control" aria-label="With textarea"></textarea>
      </div>
      `,
    },
    {
      title: 'Disable flex wrapping',
      content: `
      <div class="input-group flex-nowrap">
        <div class="input-group-prepend">
          <span class="input-group-text" id="addon-wrapping">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
      </div>
      `,
    },
    {
      title: 'Sizing',
      content: `
      <div class="input-group input-group-sm mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
        </div>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
        </div>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
      </div>

      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
        </div>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
      </div>
      `,
    },
    {
      title: 'Checkbox and radio',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="checkbox" aria-label="Checkbox for following text input">
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with checkbox">
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" aria-label="Radio button for following text input">
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with radio button">
      </div>
      `,
    },
    {
      title: 'Multiple inputs',
      content: `
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">First and last name</span>
        </div>
        <input type="text" aria-label="First name" class="form-control">
        <input type="text" aria-label="Last name" class="form-control">
      </div>
      `,
    },
    {
      title: 'Multiple addons',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
          <span class="input-group-text">0.00</span>
        </div>
        <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
      </div>

      <div class="input-group">
        <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
        <div class="input-group-append">
          <span class="input-group-text">$</span>
          <span class="input-group-text">0.00</span>
        </div>
      </div>
      `,
    },
    {
      title: 'Button addons',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
        </div>
        <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend" id="button-addon3">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons" aria-describedby="button-addon3">
      </div>

      <div class="input-group">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
        <div class="input-group-append" id="button-addon4">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>
      `,
    },
    {
      title: 'Buttons with dropdowns',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
      </div>

      <div class="input-group">
        <input type="text" class="form-control" aria-label="Text input with dropdown button">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
      </div>
      `,
    },
    {
      title: 'Segmented buttons',
      content: `
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button type="button" class="btn btn-outline-secondary">Action</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
      </div>

      <div class="input-group">
        <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
        <div class="input-group-append">
          <button type="button" class="btn btn-outline-secondary">Action</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
      </div>
      `,
    },
  ],
};
