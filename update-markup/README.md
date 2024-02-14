## The Update Markup ##

This script enables you to refresh displayed variables whenever they are modified. It is done by wrapping naked variables in two sets of curly brackets : `{{$myVar}}`.

<b>Thank you to [TME](https://github.com/tmedwards) for his invaluable code contribution!</b>

### Syntax ###

```html
{[element] [html attributes] {variable}}
```

```html
<<set $num = 0, $array = ['One','Two','Three','Four','Five']>>

Item at index {{$num}} is {{$array[$num]}} 

<<button 'Next item!'>>
  <<set $num++>>
<</button>>
```

### HTML output ###

By default, the `{{}}` macro creates a `<span role='update-wrapper'>`. You can modify the element's type and html attributes by supplying them before the inner set of brackets: `{div id='hp' {$hp}}` will result in `<div id='hp' role='update-wrapper'>`.

### Variable types ###

This syntax displays any variables that can be fetched by the `State.getVar()` function.
Consequently, namespaces and syntaxes that don't normally work with [sugarcube's naked variables markup](https://www.motoslave.net/sugarcube/2/docs/#markup-naked-variable) can be used. `{{$player.hp}}`,`{{setup.myObject['someKey']}}` or `{{window.globalVariable}}` are all valid.

### Input-less updating ###

The current script relies on `click` and `change` events to check for value changes. This handles most of the common means of variables modification (clicking a link, using an input element).
However, there may be situations in which you want variables to update without player input. In this case, you need to run the `setup.updateWrappers()` function.

```html
<<set $time = 0>>

Time passes, it is now {{$time}} .

<<silently>>
  <<repeat 2s>>
    <<set $time++, setup.updateWrappers()>>
  <</repeat>>
<</silently>>
```

