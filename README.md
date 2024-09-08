# APIs

Various JS APIs.

<details>
<summary>Import/Export API</summary>

Save or load arbitrary data as files.
[Import/Export API](apis/import-export)

</details>

***

# Custom elements

A selection of HTML custom elements, usable in any story format.

<details>
<summary>The Cycle element</summary>

[An element which automatically cycles between its children.](custom-elements/cycle-element)

</details>


<details>
<summary>The Pip Bar</summary>

[Customizable stat bars, meant for ASCII displays.](custom-elements/pip-bar)

</details>

<details>
<summary>The Ring Menu</summary>

[An element which adjusts its children into a ring.](custom-elements/ring-menu)

</details>

***

# Twine scripts

Format-agnostic scripts for Twine games.

<details>
<summary>Media tester</summary>

A script to test asset availability in Twine games.
[Media tester](twine-scripts/media-tester)

</details>

<details>
<summary>Special passage tags</summary>

Enable `script` and `style` passages in Twine 2.
[Special tags](twine-scripts/special-passage-tags)

</details>

<details>
<summary>URL fixer</summary>

Properly localize URLs when using Twine's `Play/Test` feature to launch the game.
[URL fixer](twine-scripts/url-fixer)

</details>

***

# Harlowe scripts

Scripts written for the Harlowe story format.

<details>
<summary>Keyboard navigation</summary>

Automatically binds shortcuts to interactive elements, enabling keyboard-only navigation.
[Keyboard navigation](harlowe-scripts/key-nav)

</details>

<details>
<summary>Link sound</summary>

Define a sound effect for every link in a story.
[Link sound](harlowe-scripts/link-sound)

</details>

***

# Sugarcube scripts

Scripts written for the Sugarcube story format that aren't macros.

<details>
<summary>Container templates</summary>

A variation on Sugarcube templates that supports user-supplied contents: `?(templateName: ...contents...)`.
[Container templates](sugarcube-scripts/container-template-markup)

</details>

<details>
<summary>`<<type>>` skip for mobile</summary>

A way to skip the `<<type>>` animation on mobile devices.
[Type skip](sugarcube-scripts/mobile-type-skip)

</details>

<details>
<summary>Swap markup</summary>

An easy way to output random content with minimal markup: `(a|b|c|d)`.
[Swap markup](sugarcube-scripts/swap-markup)

</details>

<details>
<summary>Update markup</summary>

Print a variable and automatically update the displayed value when it changes using `{{$myVariable}}`.
[Update markup](sugarcube-scripts/update-markup)

</details>