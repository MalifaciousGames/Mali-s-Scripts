## Import and export functions

The `importFile` and `exportFile` let users import and export arbitrary data as files.

This script works in every story format.

### Syntax

**exportFile**
```js
exportFile(data, fileName, type, fileExtension)
```
- data : any data, non-primitives are run through `JSON.stringify`.
- fileName : the name of the resulting file.
- type (optional) : the file MIME type, `text/plain` by default.
- fileExtension (optional) : the file's extension, `txt` by default.

**importFile**
```js
importFile(callbacks... , attrObject)
```
- callbacks : any number of callbacks that will be called on the imported data.
- attrObject (optional) : a plain object containing html attributes to apply to the `<input type='file'>` element. Only useful to supply `accept` and `multiple` attributes ([read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)).

For each imported file, the supplied callbacks are called with the following arguments:
- data : the resulting data, either a string or an object if `JSON.parse` was successful.
- index : the file's index in its FileList.
- file : the file as it was passed to the input element.