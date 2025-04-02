## Custom MarkDown specs

To disable a given markup you can escape it using `\\` : `\* not italic *` will be printed as raw text.

### Text types

#### Titles

```html
# H1
## H2
### H3
#### H4
##### H5
###### H6

<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<h4>H4</h4>
<h5>H5</h5>
<h6>H6</h6>
```

#### Comments

```html
/* comment */

<!-- comment -->
```

#### Italic

```html
*Italic*

<em>Italic</em>
```

#### Bold

```html
**Bold**

<strong>Bold</strong>
```

#### Strikethrough

Requires empty spaces or line ends at both ends.

```html
-Strikethrough-

<s>Strikethrough</s>
```

#### Highlight

```html
!very important!

<mark>very important</mark>
```

#### Superscript

```html
^super^

<sup>super</sup>
```

#### Subscript

```html
~sub~

<sub>sub</sub>
```

#### Code

```html
`Code` or ``Code``

<code>Code</code>
```

#### Paragraphs

Lines that start with a letter character (as per Unicode specification), a dot, quotation marks or a HTML entity are wrapped in paragraphs.

```html
Paragraph

<p>Paragraph</p>
```

### Wrappers

#### Span

```html
_Span_

<span>Span</span>
```

#### Div

```html
__Div__

<div>Div</div>
```

#### Tables

The top row of the table is always treated as the head.

```html
| Head |
| Cell |

<table>
   <thead>
      <tr>
         <th> Head </th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td> Cell </td>
      </tr>
   </tbody>
</table>
```

#### Unordered list

```html
- A
- B
-- C
-- D

<ul>
   <li>A</li>
   <li>B</li>
   <ul>
      <li>C</li>
      <li>D</li>
   </ul>
</ul>
```

#### Ordered list

```html
+ A
+ B
++ C
++ D

<ol>
   <li>A</li>
   <li>B</li>
   <ol>
      <li>C</li>
      <li>D</li>
   </ol>
</ol>
```

#### Code block

```html

```lang
   Code
```

<div data-language="lang"><code>Code</code><div>
```

### Thingies

#### Horizontal rule

```html
--- or ***

<hr>
```

#### Checkbox

```html
[ ]
[x]
[v]

<input type="checkbox" disabled>
<input type="checkbox" disabled checked>
<input type="checkbox" disabled checked>
```

#### Emdash

```html
Em--dash

Em—dash
```

#### Links

```html
[Link text](url.com)

<a href="url.com" target="_blank">Link text</a>
```