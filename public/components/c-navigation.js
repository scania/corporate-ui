export default {
  title: 'Navigation',
  description: [
    'The navigation has a desktop mode and a mobile mode where the break point is at 992px viewport width. Check out the header component to see the changes in mobile view. The navigation is highly customizable as it can host both primary and secondary items. You can also set the orientation to horisontal or vertical. If not set, the default is horisontal.',
    'You can populate navigation links in two ways: JSON objects or providing it in a slot. See examples below to see how it works with different ways of populating navigation links.',
  ],
  preview: `
    <c-navigation sticky="false">
      <a href="/" slot="primary-items" active>home</a>
      <a href="/about" slot="primary-items">about</a>
      <a href="/user" slot="secondary-items">user</a>
    </c-navigation>
  `,
  items: [
    {
      title: 'Items as data',
      content: `
<c-navigation
  sticky="false"
  theme="scania"
  primary-items='[{ "text": "home", "href": "/home", "class": "active" }, { "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "user", "href": "/user" }, { "text": "more", "href": "/more" }]'></c-navigation>
      `,
    },
    {
      title: 'Items in slots',
      content: `
<c-navigation sticky="false">
  <a href="/" slot="primary-items" active>home</a>
  <a href="/about" slot="primary-items">about</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
    {
      title: 'Items both as data and in slots displayed in vertical orientation',
      description: 'This navigation setup shows the usage of orientation vertical',
      content: `
<c-navigation
  sticky="false"
  orientation="vertical"
  primary-items='[{ "text": "about", "href": "/about" }]'
  secondary-items='[{ "text": "more", "href": "/more" }]'>
  <a href="/" slot="primary-items" active>home</a>
  <a href="/user" slot="secondary-items">user</a>
</c-navigation>
      `,
    },
    {
      title: 'Items in slots with a dropdown item',
      description: 'This navigation setup shows the usage of a toggable dropdown',
      content: `
<c-navigation sticky="false">
  <a href="/" slot="primary-items" active>home</a>

  <div class="dropdown" slot="secondary-items">
    <a href class="dropdown-toggle nav-item" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">user</a>

    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>
</c-navigation>
      `,
    },
    {
      title: 'Subnavigation',
      description: `This navigation setup shows the usage of a navigation inside the header with nested items in the navigation. 
                    Notice that in this example we provide a link element and no global style for a link is available.
                    But providing that makes it possible to style, like we do in this example`,
      content: `
<c-navigation sticky="false">
  <a href="/home" slot="primary-items">home</a>
  <a href="/about" slot="primary-items" active>about</a>
  <a href="/profile" slot="primary-items">profile</a>
  <a href="/abc" slot="primary-items">abc</a>
  <a href="/xyz" slot="primary-items">xyz</a>
  <a href="/more" slot="secondary-items">more</a>

  <c-navigation slot="sub" caption="About" target="/about" active>
    <a href="/about" slot="primary-items" active>About 1</a>
    <a href="/about2" slot="primary-items">About 2</a>
    <a href="/about3" slot="secondary-items">About 3</a>
  </c-navigation>

  <c-navigation slot="sub" target="/profile">
    <a href="/profile" slot="primary-items">Profile 1</a>
    <a href="/profile2" slot="primary-items">Profile 2</a>
    <a href="/profile3" slot="secondary-items">Profile 3</a>
  </c-navigation>

  <c-navigation slot="sub" target="/abc">
    <a href="/abc" slot="primary-items">abc 1</a>
    <a href="/abc2" slot="primary-items">abc 2</a>
    <a href="/abc3" slot="secondary-items">abc 3</a>
  </c-navigation>

  <c-navigation slot="sub" target="/xyz">
    <a href="/xyz" slot="primary-items">xyz 1</a>
    <a href="/xyz2" slot="primary-items">xyz 2</a>
    <a href="/xyz3" slot="secondary-items">xyz 3</a>
  </c-navigation>
</c-navigation>
      `,
    },
  ],
};
