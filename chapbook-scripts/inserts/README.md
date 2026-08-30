## Custom Chapbook inserts

### The {set} insert

The `{set}` insert allows for setting variables outside of the vars section.

**Syntax and supported types**

The `{set}` insert used the following syntax : `{set variable : value}`.

It supports primitives and arrays :
```js
{set num : 3}
{set string : 'some text'}
{set bool : true}
{set myArray : ['a', 'b', 'c'] }
```

The variable side allows for setting object properties and using property accessors :
```js
{set myArray[1] : 'second element'}
{set myObject.key : 96}
```

Due to Chapbook's insert parsing setting objects requires a specific syntax:
```js
{set myObject : "obj{ key : 'value' }"}
```
Notice how the object is passed as a string and preceded by the `obj` prefix.

***

### The print insert

The print insert (`{= ...}`) is used to print expressions which would not work with standard variable printing. It can be used to show the results of math operations or a function's return value.

**Syntax**

The print insert as a single parameter which is the expression to print : `{= expression}`.

```js
{= a * b / c}
{= formatPlayerStats()}
```

It can also be used to set variables as part of its printing process : `{= num = 78}`.

***

These custom inserts come with built-in definitions for Stephen Granade's Twine-twee-language extension.