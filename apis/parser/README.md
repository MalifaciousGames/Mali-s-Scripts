## The Parser API

This API is a configurable parser which turns a text input into an HTML output.

### Steps

- characters preceded by a `\\` are escaped
- pre-processing : `pre` type profiles are run on the input text
- parsing : `parse` type profiles are run on the input text
- HTML rendering : the text is printed as HTML to a buffer element
- post-processing : `post` type profiles are run on the elements they match in the buffer element

`Parser.parse( text )` returns an array of child nodes from the buffer, `Parser.parseTo(text, targetElement)` appends those nodes to the supplied element.

### Parser profiles

Parsed profiles are registered using the `Parser.addProfile( definition )` method. Profile definitions are plain objects following this pattern:
```js
{
   name : 'profile name', // enables fetching of a profile by name, optional
   token : 'token', // a token character used by the profile, optional
   type : 'pre' | 'parse' | 'post', // profile type, set to 'parse' by default
   priority : number, // this number decides on the profile's precedence, 1 by default 
   match : /regex/g | 'string' | 'CSS selector (post profiles only)' | [ ... ], // a regular expression, string or CSS selector, or an array containing those
   handler( /* match results or queried element (post profiles only) */ ) {
      // this => profile
      // returns the modified text or manipulate the element
   }
}
```

### Functions

- `Parser.parse( text )` : Processes text into an array of HTML nodes.
- `Parser.parseTo( text , targetElement)` : Processes text and appends the resulting nodes to `targetElement`.
- `Parser.addProfile( definition )` : Registers a new parser profile from the `definition` object.
- `Parser.getProfile( name )` : Returns the parser profile that bears the supplied `name`, or `undefined` if none is found.
- `Parser.runProfile( target , profile )` : Selectively runs a profiles on the `target`. `pre|parse` profiles need to run on a string, `post` profiles need to run on an element.
- `Parser.escapeSpecial( text )` : Escapes a selection of special characters (`<`, `>`, `&`, `-`, `\\`) by turning them into HTML entities.
- `Parser.escape( text )` : Turns the first character in `text` into an HTML entity.

### Parsing MarkDown

Alongside the [parser API](./parser.js) is a file containing custom [MarkDown profiles](./markdown-profiles.js). These are provided as a proof of concept and example of how the APi can be used.
They use a slightly [custom syntax](./custom-MD-spec.md), feel free to use or edit them.