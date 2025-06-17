## Attribute directives for Harlowe

This script lets you use Harlowe variables inside HTML attributes by using one of two prefixes:
- `sub:` does simple substitution and replaces the variables with their values
- `eval:` computes a new value from a given expression

### Substitution

The substitution is the simplest and most straightforward mode.

```html
(set: $col = 'red')
<span sub:class="speech $col"></span> results in <span class="speech red"></span>.
```

```html
(set: $h = "50px")
<div sub:style="height : $h"></div> results in <div style="height : 50px"></div>.
```

### Eval

The eval mode is more complex but also more powerful, it lets authors do math, call functions or access keys/indices inside complex data structures. 
Expressions passed to `eval:` attributes must use JavaScript syntax instead of Harlowe's built-in one, for sanity reasons.

```html
(set: $min = 5)
<input type="range" eval:min="$min" eval:max="$min * 10" eval:value="$min * 2">
results in
<input type="range" min="5" max="50" value="10">
```

Working with non-primitives:
```html
(set: $char to (a:"John","Jake","Joseph","Jill"))

<div eval:data-character="$char[1]"></div> results in <div data-character="Jake"></div>.
```

String concatenation is not as easy however.
```html
(set: $h = "50px")

<div eval:style="height : $h"></div> does not work as expected.
<div eval:style="`height : ${$h}`"></div> this should be used.
```