## Media-validation script

This script checks every media URL in a Twine story to see if the asset can be loaded.

Failed load are logged to the console and optionally exported as a text file, these logs include:
- the faulty URL
- the passage(s) where this URL can be found
- the URL's index in its passage

Like so :
```html
ERROR : 
Failed to load img with url "folder/image.png". In :
- passage "passage1" : chraracter 686/2300.
- passage "passage2" : chraracter 22/1466, chraracter 1322/1466.
```

#### How to use

Paste the code in the story's JS tab.

Launch the story, open the console and call `testMedia()`.

The function takes two optional arguments, both true by default : `testMedia(getTextReport, hotlinkWarning)`.
- `getTextReport` : Generates a text file containing the error report
- `hotlinkWarning` : URLs starting with `http` return a warning.

#### Limitations

The script does not account for :
- computed URLs
- content that would be commented out, inaccessible or hidden

The should only be used when launching the game locally as most hosting services have protection against loading too many media elements at once.