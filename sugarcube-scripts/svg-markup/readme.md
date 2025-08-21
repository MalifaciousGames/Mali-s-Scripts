## SVG markup

This script allows you to define `<svg>` images in dedicated `twine.svg`-tagged passages and to use them:
- in passages with a custom markup 
- as background images in CSS

### Defining SVGs

Simply create a new passage, tag it with `twine.svg` and put the code inside of it. The passage's name will be used to fetch its contents as `[svg[passageName]]`.

In Twee notation (pattern from [MDN's example code](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/svg)):
```xml
:: circles [twine.svg]
<svg
  viewBox="0 0 300 100"
  xmlns="http://www.w3.org/2000/svg"
  stroke="red"
  fill="grey">
  <circle cx="50" cy="50" r="40" />
  <circle cx="150" cy="50" r="4" />

  <svg viewBox="0 0 10 10" x="200" width="100">
    <circle cx="5" cy="5" r="4" />
  </svg>
</svg>
```

### Using SVGs

In passage, simply use `[svg[circles]]` to insert the `<svg>` element to the page, it will be wrapped in a `<span class="svg-markup">`.

In CSS, that same syntax can be used to populate the `background-image` property : `div.circle-bg { background-image: [svg[circle]] }`.

There is nothing stopping you from adding arbitrary HTML or text content inside `twine.svg`-tagged passages, such content will likely break the CSS functionality however.