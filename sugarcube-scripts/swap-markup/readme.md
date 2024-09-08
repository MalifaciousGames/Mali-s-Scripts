## The swap markup ##

This extremely simple markup outputs random content with an optional weight parameter.

### Syntax ###

By default, items are equally likely to appear:

```html
A (small|large|scrawny) dog stand in front of you.
```

A weight can be specified using `<number>:` before an entry. Entries without a bespoke weight default to `1`.

```html
The pearl is (5:small|2:medium|.5:large|.1:enormous).
```