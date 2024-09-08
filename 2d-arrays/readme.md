## The Array2D class

This utility class is used to easily create two dimensional arrays.

### Syntax

The pattern-based syntax takes a string as first argument like so: `new Array2D(pattern, [value], [row separator], [character separator])`.
```js
new Array2D(pattern, [value], [row separator], [character separator])

new Array2D(
   `.....
    .o.o.
    .....`
);
//output
[
   ['.','.','.','.','.'],
   ['.','o','.','o','.'],
   ['.','.','.','.','.'],
]
```