Unlike Twine 1, Twine 2 doesn't have dedicated tags for JS or CSS passages. These two pieces of code aim to correct that.

## How to use? ##

Just paste the code in the story's `JavaScript` tab. The one for styles can go pretty much anywhere, however you should consider that `script` passages can only access what has loaded before them.

**These work in every story format.**

## Script passages ##

As far as Javascript is concerned, loading order might be an issue, that's why `script` passages are sorted alphabetically, then loaded.

## Style passages ##

Style passages are processed as template literals (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), meaning you can use the `${...}` syntax to insert Javascript variables as CSS values.
Each passage is converted into a `<style>` elment of the same name, this is done so that invalid CSS only breaks some of the styles, making the error easier to pinpoint.

Because each story format stores state variables in a different way, this script does not evaluate Twinescript.

Loading Sugarcube settings (example from my game):
```css
:root {
  --orange: ${settings.mainColor ?? 'DarkOrange'};
  --hp: ${settings.HPcolor ?? 'Teal'};
}
```
