## The Arrow Box element

The `arrow-box` custom element is a type of input element that lets the user cycle between available options.

Changing between values can be done in three ways:
- by clicking the buttons on either side
- by using the arrow keys when the element is in focus
- by scrolling the mouse wheel over the element

### Syntax

Choices are provided using `<option>` elements, either inside of the element or in a `<datalist>`.

```html
Choose a name : 
<arrow-box [value="..." type="..." editable vertical]>

   <option [value="..."]> ...label... </option>
   ...other <option> elements...

</arrow-box>
```

### Option attributes

| Attribute | Use | Accepted
|:------------:|:------------:|:------------:|
| `value` | The option's value, if none is supplied its text content will be used. | Anything
| `disabled` | This `<option>` will not be selected as a choice. | Boolean attribute
| `selected` | This `<option>` will be chosen as a default value. | Boolean attribute

### Arrow Box attributes

| Attribute | Use | Accepted
|:------------:|:------------:|:------------:|
| `value` | Initial value, does not need to match an existing `<option>`.| Anything
| `editable` | Lets users type anything in the center view. | Boolean attribute
| `vertical` | Orients the element in the vertical direction. | Boolean attribute

The `type` attribute decides if selected values should be coerced, they remain strings by default. Supported values are :
- `string` : default
- `number` : the value is parsed in a number or `NaN`
- `JSON` : `JSON.parse()` is used on the value
- `eval` : `eval()` is used on the value. **Do not use in a production environment!**

If a given value throws an exception (eg. JSON string that could not be parsed) the value is set to `null` instead.

### Behavior

When a value is selected the element triggers a `change` event. Interfacing with this event works in a way that is consistent with other input elements:
- `event.target` returns the original `<arrow-box>` 
- `event.target.value` returns the value as it was set

Similarly, binding an `onchange` listener works as expected : `<arrow-box onchange="console.log(this.value)">`.

### Examples

```html
Choose a preset name or type your own:
<arrow-box editable>
   <option>John</option>
   <option>Josh</option>
   <option>Jodie</option>
   <option>Joachim</option>
</arrow-box>

Using a datalist:
<arrow-box list="player-names" editable></arrow-box>

<datalist id="player-names">
   <option>John</option>
   <option>Josh</option>
   <option>Jodie</option>
   <option>Joachim</option>
</datalist>

```

