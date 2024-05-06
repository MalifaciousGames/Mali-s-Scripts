## The pip bar custom element

This custom element displays stat bars created from a set of supplied tokens.

**This script works in Chapbook, Harlowe and SugarCube**

---

### Syntax

```html
<pip-bar value='2' max='5'>Your health : </pip-bar>
```

| Attribute | Use | Accepted
|:------------:|:------------:|:------------:|
| `value` | Number of filled pips | Number, variable or any evaluable expression
| `max` | Total number of pips | Number, variable or any evaluable expression
| `preset` | Sets the bar preset | The name of an existing preset or a token string
| `tokens` | Comma-separated pip tokens | String : `full,empty`
| `full-token` and `empty-token` | Full and empty pip tokens | String
| `full-class` and `empty-class` | The classe(s) applied to the full or empty part of the bar | String
| `full-style` and `empty-style` | Inline style applied to the full or empty part of the bar | String(css)

Changing any of these attributes will cause the bar to update in order to reflect these changes.

---

### Output

`<pip-bar value='2' max='5' tokens='★,☆'>Stars : </pip-bar>` will generate :
```html
<pip-bar value='2' max='5' tokens='★,☆' aria-live='polite' aria-label='2 out of 5'>
   Stars : 
   <span class='pip-bar'>
      <span class='full-bar'>
         ★★
      </span>
      <span class='empty-bar'>
         ☆☆☆
      </span>
   </span>
</pip-bar>
```

---

### Updating

Any bar that receives a variable or expression as `value` or `max` is considered live. It will update its contents whenever :
- a click happens
- the `Enter` key is pressed
- the global `PipBar.updateAll` function is called

---

### Variable parsing

| Format | Parsed variables |
|:------------:|:------------:|
| SugarCube | State (`$`) and temporary (`_`) |
| Harlowe | State (`$`) |
| Chapbook| All variable names |

This script needs to be in the story's JS tab to properly access variables (in SugarCube and Harlowe at least).

About Snowman : Out of the 4 main story formats, Snowman is not currently supported, a bug in the rendering process makes it so custom elements are not parsed properly.

---

### Presets

| Name | Token | Effects
|:------------:|:------------:|:------------:|
| `default` | '◼,◻' | None
| `round` | '◉,◎' | None
| `hexa` | '⬢,⬡' | None
| `hexalong` | '⬣,⎔' | None
| `penta` | '⬟,⬠' | None
| `pentalong` | '⭓,⭔' | None
| `diamond` | '◈,◇' | None
| `bar` | '𝅛,𝅚' | None
| `xcom` | '▰,▱' | None
| `stars` | '★,☆' | None
| `stars4` | '⯌,⯎' | None
| `ascii` | 'l,l' | Single token, the empty part is .5 opacity 
| `hearts` | '♡,♡' | Single token, the empty part is .5 opacity 
