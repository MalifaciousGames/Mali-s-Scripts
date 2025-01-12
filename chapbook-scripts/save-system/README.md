## Save system for Chapbook

This scripts enables save to and load from files in Chapbook

### Inserts

`{save to file: 'Optional link text'}` creates a link which triggers the download of the current game save.

`{load save: 'Optional link text'}` creates a link which lets the player select a save file to load.

### Config options

A config object is available for authors to modify:
- `fileName` : The file's name, can be a string or a function which returns one.
- `extension` : The file's extension, `.tw-save` by default.
- `encoded` : A boolean indicating if the file should be encoded to base64 (not human-readable). `true` by default.
- `version` : The game's current version, can be a number, a string following semantic versioning, or anything else. See below for the updating guide.
- `metadata` : Arbitrary data to be included into the save object, can be anything.
- `engineUpdaters` : An array of callbacks meant to ensure compatibility across Chapbook versions.
- `gameUpdaters` : An array of callbacks meant to ensure compatibility across Chapbook versions.

### Save structure

The save object is structured as follows:
```js
{
   game : {
      ifid,
      version
   },
   chapbook : {
      version
   },
   state,
   metadata
}
```

### Save updating

This system comes with the ability to compare and update older saves as a way to maintain compatibility across game (and engine) versions.

If a save's version differs from the story's current version the functions in the corresponding array will be called with the following arguments:
- the save object whose `state` needs to be modified
- the save's version value
- the current version value

Example:
```js
const V5Updater = (save, saveVersion, currentVersion) => {

   // assuming versioning is done with a number
   if (saveVersion < 5) {

      // in version 5, the "vitality" variable has been renamed to "health"
      // copy its value to the new name, then delete it
      save.state.health = save.state.vitality;
      delete save.state.vitality;

      // the passage named "forest" has been renamed to "forest-path"
      // replace every "forest" occurrence in passage history with the new name
      save.state.trail = save.state.trail.map(passageName => passageName === "forest" ? "forest-path" : passageName);
   }
};

gameUpdaters.push(V5Updater);
```