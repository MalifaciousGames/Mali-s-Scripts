## Extra markup

This script expands on the link markup's capabilities by letting the user decide where and how the linked passage is displayed.

`[command-keyword[[standard link markup]]`

Available commands are:
- `dialog` : Display the dialog in a `Dialog` element.
- `after` : Add the contents of the passage to the bottom of the page.
- `before` : Add the contents of the passage to the top of the page.
- `replace` : Replaces the page with the contents of the passage.

Keywords are:
- `once` : Link with this keyword will be deleted after being clicked.
- `self` : Changes where new content is placed.
-- `after/before-self` places the content after/before the link.
-- `replace-self` only replaces the link with the content.
- `t8n` : Indicates whether the inserted content receives a transition effect.

The standard part of the markup is processed as expected including the setter part.

### Examples

**Linkreplace equivalent :**
```html

<<linkreplace 'View contents'>>
   <<include [[contentsPassage]]>>
<</linkreplace>>

[replace-self[[View contents|contentsPassage]]
```

**Inventory dialog :**
```html
[dialog[[Check inventory|Inventory]]
```

**Add contents to the existing passage :**
```html
[after-once[[Continue|Continue passage]]
```