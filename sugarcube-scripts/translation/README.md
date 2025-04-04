## The Translations API

This API provides authors with a way to add togglable translations inside a single game file.

Translated passages are created by duplicating existing ones with a language suffix: `forest` => `forest-fr`. This script fetches the contents of the suffixed passage and displays it instead of the default, the player would still visit the `forest` passage even if they see `forest-fr`.

This behavior also works for UI passages (`StoryCaption` => `StoryCaption-fr`) and included ones.

### Defining language presets

Language profiles are added with the `Translations.addProfile()` function following this syntax:
```js
Translations.addProfile(
   'German', // language name
   'de', // language suffix => passage-de
   { savesTitle: 'Speicherstände' }, // an object containing localization strings, optional
   (profile) => { ... } // onChange function called when the profile is applied, optional
);
```

The localization object is used to populate SugarCube's default UI elements, proper key names can be found [here](https://github.com/tmedwards/sugarcube-2/blob/develop/src/l10n/strings.js).

Due to the way SugarCube's loading works profiles must be added before calling `Translations.init();`, before game start : [see file](translations.js#L115).

### Changing language

The active language is managed by a SugarCube setting called `Language` (default). It is available in the settings dialog or can be modified manually by calling:
- `Setting.setValue('Language', 'language name')`
- `setup.Translations.change('language name')`

### API access

The `Translations` object is available via `setup.Translations`. Keep in mind that profiles and the associated setting cannot be changed after startup.

## Examples

Translated passages:
```html
:: intro

Down the narrow dirt path, is an abandoned church. The slate roof has collapsed long ago, yet its bell tower still looms over the crumbling buttresses and ancient flagstone walls, tall and proud. 

Its dark wooden door lies [[invitingly ajar|porch]], just as you remember.

:: intro-fr

Au bout de l'étroit chemin de terre se dresse un église abandonnée. S'il y a longtemps que le toit d'ardoises s'est effondré le clocher se dresse toujours fièrement, en surplomb des contreforts moussus et des antiques murets.

Entrouverte, la porte de bois sombre invite le promeneur à [[entrer dans la nef|porch]]. Comme à l'époque...

```

If the active language is English but `intro-en` cannot be found `intro` will be rendered instead.