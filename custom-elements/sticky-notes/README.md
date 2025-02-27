## Sticky note element

This element look like a sticky note, clicking its top part causes it to fall off with a melancholy sway.

### Syntax

```html
<sticky-note>Contents</sticky-note>
```

### Colors

The [CSS](sticky-notes.css) code comes with a few color classes:
- yellow (default)
- red
- pink
- blue
- green

```html
<sticky-note class="red">Red note</sticky-note>
```

### Angle

The `angle` attribute changes the note's rotation:
```html
<sticky-note angle="15deg">Slightly rotated to the right.</sticky-note>
<sticky-note angle="-15deg">Slightly rotated to the right.</sticky-note>
```

### Randomizing

Sticky notes can be randomized in both angle and color, either by using the `randomize` property or calling their `.randomize()` method.

**HTML property**
```html
<sticky-note randomize>Random color and angle.</sticky-note>

<sticky-note randomize="all">Random color and angle.</sticky-note>

<sticky-note randomize="angle">Random angle.</sticky-note>

<sticky-note randomize="color">Random color.</sticky-note>
```

**Instance method**
The `.randomize()` method takes two arguments, both `true` by default:
- color
- angle

```js
const note = document.createElement('sticky-note');
note.randomize();
note.innerHTML = 'Random color and angle.';
```