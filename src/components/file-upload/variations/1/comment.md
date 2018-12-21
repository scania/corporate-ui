### File upload input

This is a component for uploading single or multiple files with drag and drop support.

To use this component, put a tag `<c-file-upload></c-file-upload>` in a page.

#### Properties

Change the value of the following properties to have different options.

- `name` : String
  - This property will set the name of the upload file input component.
- `multiple` : Boolean
  - Add `multiple` property to enable multiple files selection.
- `max-file-size` : Number (in KB)
  - This property will set maximum file size. The value should be any number in Kilobytes.
- `accept` : String
  - Set the accepted MIME type or file extension to limit acceptable file types. If this property is not set, the file upload will receive any file types.

On the example below, the component will have capabilities to select multiple files, only files with .jpg and .pdf extension are accepted, and the maximum file size is 1000KB.

`<c-file-upload name="uxlib-file-input" multiple max-file-size=1000 accept=".jpg, .pdf"></c-file-upload>`

On the example below, the component will have capabilities to select only one file, only image file is accepted, and the maximum file size is 1000KB.

`<c-file-upload name="uxlib-file-input" max-file-size=1000 accept="image/*, application/pdf"></c-file-upload>`

#### Event

- `uploadFiles` : CustomEvent. Fired when upload button inside the component is pressed.

#### Method

- `setProgressBarValue(file, progress)` . Triggers visual cues for upload progress such as progress bar and loading spinner.

### Developer tutorial

You need to call the API to upload the files to your own server.

There are 2 things you need to do in your application.

- Add event listener to the `uploadFiles` event to have upload function works in your application setting.
Example:
`document.addEventListener('uploadFiles',Upload, false);`
Then you can write your own upload function inside 'Upload'

```javascript
function Upload(event){
  var files = event.detail.files;
  // put your own upload function
}
```

- To make the progress bar works, retrieve the file upload component object via `document.querySelector`.

Then set the progress bar value for each file inside with `setProgressBarValue(file, progress)` function.
Set the progress value with the percentage that you get from the server response. [See example here](https://www.sitepoint.com/tracking-upload-progress-with-php-and-javascript/)

Example:

```javascript
var fileUploadComp = document.querySelector('c-file-upload');
document.addEventListener('uploadFiles',Upload, false);

function Upload(event){
  var files = event.detail.files;
  for(var i=0; i<files.length; i++){
    uploadSingleFile(files[i]);
  }
}

function uploadSingleFile(file){
  // ...

  fileUploadComp.setProgressBarValue(file,progress);

  // ...
}

```
