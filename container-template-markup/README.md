## The container template syntax

This syntax extends Sugarcube's default [templates](https://www.motoslave.net/sugarcube/2/docs/#template-api) and enables them to accept arbitrary text.

### Syntax

In passage :
```html
?(player: I don't think that's a good idea...)
?(npc: Don't worry about it, it'll be fine! )
```

Defining container templates : 
```js
//Using a callback, the first arguement is the supplied text
TemplateContainer.add('player', t => `<p class='player'>${State.variables.playerName} : ${t}</p>`);
//If the definition is an array, an entry is chosen at random when the template is printed
//(the following example is, admittedly, a bit stupid)
TemplateContainer.add('randColor',
    [
        t => `<p class='red'>${t}</p>`,
        t => `<span class='green'>${t}</span>`,
        t => `<div class='yellow'>${t}</div>`
    ]
);
```

### Using default templates as containers

When the engine encounters the container template markup (`$(name: contents )`), it will try to find a container template registered under `name`. If none is found, it will default to a standard template of the same name and use it instead.

Any text passed to the markup will the appended to the template's output, either to the first child element, or as raw text if there is none.

```js
Template.add('player', `<span class='player'>${State.variables.playerName}</span>`);
```

In passage :
```html
<<set $playerName = 'Gwen'>>

Hey ?player ! How are you doing?
HTML output : Hey <span class='player'>Gwen</span> ! How are you doing?

?(player: - Could be better...)
HTML output : <span class='player'>Gwen - Could be better...</span>
```
