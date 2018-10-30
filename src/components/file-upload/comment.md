### File upload input

This is a component for uploading single or multiple files with drag and drop support. To use this component, put a tag `<c-file-upload></c-file-upload>` in a page.

#### Properties

The following properties are available for modification

- `name` : String
  - This properties will set the name of the upload file input component.
- `multiple` : Boolean
  - Add `multiple` property to enable multiple files selection.
- `max-file-size` : Number (in KB)
  - This property will set maximum file size. The value is read as number value in KB.
- `accept` : String
  - Insert MIME type or file extension to limit acceptable file types. If this property is not set, the file upload will receive any file types.

Example:

`<c-file-upload name="uxlib-file-input" multiple max-file-size=1000 accept=".jpg, .pdf"></c-file-upload>`

or

`<c-file-upload name="uxlib-file-input" max-file-size=1000 accept="image/*, application/pdf"></c-file-upload>`

### Event

- `uploadFiles` : CustomEvent. Fired when upload button inside the component is pressed.

### Method

- `setProgressBarValue(file, progress)` . Triggers visual cues for upload progress such as progress bar and loading spinner.

### Developer tutorial

You need to call the API to upload the files to your own server.

There are 2 steps you can produce.

1. Add event listener to the `uploadFiles` event to have upload function works in your application setting.
Example:
`document.addEventListener('uploadFiles',Upload, false);`
Then you can write your own upload function in `Upload`

2. To make the progress bar works, retrieve the file upload component object via `document.querySelector`.
Example:
`var fileUploadComp = document.querySelector('c-file-upload');`
Then set the progress bar value for each file inside with `setProgressBarValue(file, progress)` function.
Set the progress value with the percentage that you get from the server response. [See example here](https://www.sitepoint.com/tracking-upload-progress-with-php-and-javascript/)

Example:`fileUploadComp.setProgressBarValue(file,progress);`
