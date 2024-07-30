## Automated link sounds

This script lets you play sound whenever a link is clicked.

### Syntax

Tracks are defined by calling the `setLinkSound()` function with the track URLs. If multiple URLs are supplied, the sound will be randomized on each click.

```js
// whenever a link is clicked, on of the following tracks will play:
setLinkSound('sound1.mp3','sound2.mp3','sound3.mp3');
```