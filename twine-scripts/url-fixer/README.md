## The URL-fixer script

When launching a game from the Twine interface (via the `Test` or `Play` buttons), assets with relative URLs aren't loaded properly. 

This short script aims to be a drop-in solution for games that use relative URLs (`<img src='myFolder/pic.png'>`). 

This script is designed to **only** work when launching from Twine (desktop application or web version), it does nothing if the game is distributed as a file or hosted online. As such, it is not necessary to remove it from the released version.

Keep in mind that leaving the file path in the published game may expose **personal informations** such as username or the hosting platform used.

**This code works for every story format.**

### How to use

The desired URL needs to be supplied at the bottom of the script, here :

```js
// SUPPLY YOUR OWN URL HERE !
// remember to turn '\' into '/' 
setPath('C:/Users/Maliface/Documents/fake/folder/media');
// SUPPLY YOUR OWN URL HERE !
```

**Local directory**

1. Open the file explorer and navigate to the folder
2. Copy the file path, example: `C:\Users\Name\Documents\firstgame\assets`
3. Change `\` characters to `/` characters (Windows only issue)
4. Paste it in the `setPath` function : `setPath('C:/Users/Name/Documents/firstgame/assets');`

**Online hosting**

Simply put the URL of the hosted folder : `setPath('https://myHostingSite.com/myAssets');`.

**Launching from twinery.org**

You must use online hosting when launching from the browser app as remote pages cannot access local files for security reasons.

### Limitations

- This solution might not work with synced folders (OneDrive, DropBox...)
- Most hosting websites have restrictions when it comes to hotlinking (loading remote ressources without visiting the website itself). Read the site's TOS.

Thank you to TheMadExile, Hituro and Raz for helping in the development and testing!
