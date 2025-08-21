## Setter attributes

This simple script makes it so any HTML element that triggers a `change` event (input, select) can set SugarCube variables and settings accordingly.

### Variables

The `data-variable` attribute accepts one or multiple variables names:
```html
<input data-variable="$playerName" placeholder="Your name is...">

<<linkreplace 'Confirm.'>>
   Welcome $playerName.
   [[Proceed.|nextPassage]]
<</linkreplace>>
```

The variables can be of any type, `data-variable="$story _temporary setup.static"` will all be set by this method.

### Settings

The `data-setting` attribute changes its attached setting(s).

Setting definition:
```js
{
   const fontChanger = () => {
      $('body').css('font-size', settings.fontSize + 'px');
   };

   Setting.addRange('fontSize', {
      label: 'Font size.',
      min: 6,
      max: 18,
      step: 1,
      default: 10,
      onInit: fontChanger,
      onChange: fontChanger
   });
}
```

In passage:
```html
<input type="range" max="18" min="6" @value="settings.fontSize" data-setting="fontSize">
```
