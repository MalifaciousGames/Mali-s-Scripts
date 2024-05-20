The script lets you import and export saves for the Harlowe story format.

`harloweSave.export()` creates a `.tw-save` file containing the game's saved data.

`harloweSave.import()` lets the user pick a `.tw-save` file to load into the game.

### Syntax

The `harloweSave.export(slot, encode)` function accepts two optional arguments:
- the name of an existing save slot to export
- a boolean specifying if the save data is encoded to Base64, `true` by default

The `harloweSave.import(toLocal, slotName, slotLabel)` function accepts three optional arguments:
- a boolean specifying if the imported save must be added to local storage (rather than simply loaded into game)
- the name of the target slot 
- the label of the target slot

To run these functions in Harlowe I suggest using either a `<script>` element or binding them to a link's `onclick` attribute:
```html
The macro way :
(link:'Import')[<script>harloweSave.import()</script>]
(link:'Export')[<script>harloweSave.export()</script>]

The onclick way :
<tw-link onclick='harloweSave.import()' tabindex='0'>Import</tw-link>
<tw-link onclick='harloweSave.export()' tabindex='0'>Export</tw-link>
```