## Cross-browser input styling

This CSS stylesheet aims to provide easy cross-browser styling for a few input elements:
- checkboxes
- radio buttons
- color picker

It also applies a generic style to any wrapped `<input>`.

### How to use

Simply wrap the input element in a `<span>` : `<span> <input type="checkbox"> </span>`. 
The styling only applies to inputs that are the only direct children of such a span in order not to interfere with existing styles.

### Compatibility

This stylesheet relies heavily on the `:has()` pseudo-class which is [broadly available since 2023](https://caniuse.com/?search=%3Ahas). 