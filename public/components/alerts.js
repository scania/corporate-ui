export default {
  title: 'Alert',
  preview: `
  <div class="alert alert-primary" role="alert">
    A simple primary alert—check it out!
  </div>
  `,
  description: 'Alerts available in different interaction states.',
  items: [
    {
      title: 'Basic alerts',
      content: `
      <div class="alert alert-success" role="alert">
        A simple success alert—check it out!
      </div>
      <div class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
      <div class="alert alert-warning" role="alert">
        A simple warning alert—check it out!
      </div>
      <div class="alert alert-info" role="alert">
        A simple info alert—check it out!
      </div>
      `,
    },
    {
      title: 'Alert heading',
      content: `
      <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Well done!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        <p>When you want to have a link if would look link <a href="#">this</a></p>
      </div>
      `,
    },
    {
      title: 'Alert dismissable',
      content: `
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `,
    },
  ],
};
