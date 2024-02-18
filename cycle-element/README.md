## Custom cycling element

The element automatically cycles between the characters or elements it contains. The `delay` attribute determines the cycling speed in milliseconds, if non is supplied or the attribute isn't a number, it defaults to `500`.

### Syntax

```html
Cycling symbols :
<cycle-elem delay='100'>⬒⬔◨◪⬓⬕◧◩</cycle-elem>

Cycling full words :
<cycle-elem delay='1500'>
   <span>One</span>
   <span>Two</span>
   <span>Three</span>
</cycle-elem>
```

### Story time

A while back, for the Bare-Bones Jam, I tried to make a game in Harlowe.

The rules of the jam forbade using CSS to change the format's default appearance (which makes for a very fun challenge), still I wanted some kind of spinning loading screen. Unicode symbols are fun, and surprisingly versatile. Just needed a way to make them cycle.

Needless to say I know nothing about Harlowe's macros, so I went and made a cycling element. In many ways, I feel custom elements are the best way to overcome Harlowe's closed and opaque environment.

The jam went nowhere, most of the story was lost, together with my power supply, motherboard and SSD... except for the cycling element which had been inadvertently saved to my website.