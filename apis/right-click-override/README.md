## The Context Menu Override API

The Context Menu Override (CMO) API lets you create customizable context menus displayed on right click (or long press on touch devices).

### Defining menu items

Menu items are instances of the `CMO.Item` class which follows the following syntax:
```js
new CMO.Item({
   html, // a HTML string, a collection of Elements/nodes or a function which returns one of those
   selector, // a CSS selector, if the right click target matches it, the item is displayed
   condition(event) {
      // returns whether the item should appear in generated the menu or not
   },
   handler(event) {
      // a function that runs when the item is clicked
   }
});
```

### Adding/removing menu items

Menu items are added by running the `<CMO.Item>.attach()` function and removed with `<CMO.Item>.detach()`.

```js
const statsButton = new CMO.Item({
   html : '<button>Player stats</button>',
   handler() {
      // show a pop up with player stats...
   }
});

statsButton.attach();
```

### Conditionals

There are two ways of deciding if an item is displayed on right click:

- the `selector` property is useful if you want to display items based on which element was right-clicked:
```js
// elements with a data-size attribute with show its value when right-clicked
new CMO.Item({
   html: e => `Size : ${e.target.getAttribute('data-size')}`,
   selector: '[data-size]'
}).attach();
```

- the `condition` property has broader uses as it takes a function:
```js
let money = 80;

new CMO.Item({
   html: '<button>Spend 20$</button>',
   condition: () => money > 1,
   handler() {
      money -= 20;
      if (money < 1) this.remove(); 
   }
}).attach();
```