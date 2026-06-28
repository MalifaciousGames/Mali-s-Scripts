## Smart quotes for SugarCube

This parser profile automatically turns quoted text into smartly-quoted text, turning `"Text"` into `“Text”`.

This solution relies on CSS `::before` and `::after` pseudo-elements, it does not insert extra characters but wraps the selected text inside a `<span>` element.
