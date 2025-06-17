## HTML inputs for Harlowe

This API lets you integrate any HTML input into Harlowe games.

### How to use

Binding an input element to a variable is done via the `data-setter` attribute: `<input data-setter="thing">` will set the `$thing` variable. Multiple variables can be bound to a single input by supplying multiple names: `data-setter="thing1 thing2 thing3"`.

**Live updating**

By default, changing an input's value updates associated variables on the page. This behavior can be disabled in the API's config in which case you can use the `data-update` attribute to selectively enable it.

```html
   (set: $text to "Some text")
   <input data-setter="text">
   $text

   (set: $range to 5)
   <input type="range" data-setter="range">
   $range
```

**Passage navigation**

The `data-goto` attribute lets you forward players to a given passage after interacting with the input. Use sparingly, this may feel jarring or frustrating and does not remove the need for input validation.

**Type coercion**

HTML input elements always have strings as values yet most authors would expect `<input type="number">` to return a number. The API enforces basic type coercion:
- `number` and `range` inputs return numbers
- `checkbox` inputs return booleans
- all other types return strings

Alternatively, you can supply an override type via the `data-coerce` attribute which accepts `number`, `string` or `boolean`:
```html
   <input type="text" data-setter="bool" data-coerce="boolean">

   The input above ALWAYS sets $bool to a boolean, no matter what is typed:
   "false" : false
   "true" : true
   "non-empty string" : true
   "" : false
```

Disclaimer : Using `data-coerce="number"` on a type-in input can cause variables to be set to `NaN` which is majorly problematic in Harlowe. Use with caution and expect players to type *anything* in any given field!

**Other uses**

This API will work on any element that:
- uses a `value` property
- triggers a `change` event

This includes HTML `<select>` elements as well as any custom element that implements input-like behaviors such as my own [`<arrow-box>`](https://github.com/MalifaciousGames/Mali-s-Scripts/tree/main/custom-elements/arrow-box).

**Styling**

Input types that are not build into Harlowe (such as radio buttons) may look weird. You can find a pre-built styling scheme [here](https://github.com/MalifaciousGames/Mali-s-Scripts/tree/main/twine-scripts/input-styles).

### Examples

Password input.
```html
   <input type="password" data-setter="password" placeholder="Password">
```

Radio buttons.
```html
   (set: $pet = '...')

   Choose a pet:
   Cat : <input type="radio" data-setter="$pet" name="pet" value="cat">
   Dog : <input type="radio" data-setter="$pet" name="pet" value="dog">
   Turtle : <input type="radio" data-setter="$pet" name="pet" value="turtle">

   You own a $pet.
```

Age range.
```html
   (set: $age = 20)

   <input type="range" data-setter="age" min="18" max="65">
   You are $age years old.
```