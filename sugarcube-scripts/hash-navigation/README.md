## Hash navigation

The script lets players start a game or navigate to a passage by changing the URL's hash value.

**What's a URL's hash value?**

The `#` character in a URL is used to introduce a fragment identifier. In typical webpages (e.g. not Twine games) it is used to link to parts of the document. 

With this script, this fragment identifier is used to play a given story passage, either on game start or when it is modified.

`https://hostingSite.org/myGame#forest` => The story will start at the `forest` passage.

This can be used as a debugging tool or as a way to link directly to a relevant passage.

## Config

The `HashNavigation` object contains two config options:
- `hashStart` : The story starts at the passage that corresponds to the link's hash value.
- `hashChangeNavigation` : Modifying the URL's hash value will cause navigation to the corresponding passage.

Do keep in mind that while `hashChangeNavigation` lets players navigate at will they can still do so with `hashStart` alone by changing the value and refreshing the page.

**A version of this script exists for Harlowe and can be found [here](https://github.com/MalifaciousGames/Mali-s-Scripts/tree/main/harlowe-scripts/hash-navigation).**