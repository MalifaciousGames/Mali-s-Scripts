## Easy keys

This script allows users to bind key combinations to DOM elements by using the `data-key` attribute.

The attached [CSS file](./easy-keys.css) is optional, if included it displays the attached shortcut next to the element.

**Syntax**
```html
On a clickable element:
<a data-key="g" onclick="console.log('Something.')">Do something (g)</a>

On a wrapper element:
<span data-key="shift + b">
   <button onclick="console.log('Something else.')">Do something else (shift + b)</button>
</span>

```

### Key expressions

Key expressions are **always written in lowercase**. They accept `ctrl + `, `shift + ` and `alt + ` as prefixes.

- digit keys and numpad keys output their associated number
- the space bar outputs `space`
- the control key alone outputs `control`

Do keep in mind that some keys combinations are browser or system shortcuts and cannot be used as bindings, please do your research!