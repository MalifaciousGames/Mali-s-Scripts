## Sticky note element

This element look like a sticky note, clicking its top part causes it to fall off with a melancholy sway.

**Syntax**

```html
<sticky-note>Contents</sticky-note>
```

**Colors**

The [CSS](sticky-notes.css) code comes with a few color classes:
- yellow (default)
- red
- pink
- blue
- green

```html
<sticky-note class="red">Red note</sticky-note>
```

**Randomizing**

Sticky note elements have a `.randomize()` method which takes two arguments, both `true` by default:
- color
- angle

```js
const note = document.createElement('sticky-note');
note.randomize();
note.innerHTML = 'Random-looking note.';
```