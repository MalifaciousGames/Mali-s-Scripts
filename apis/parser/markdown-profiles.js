
// custom markdown profiles
{
   // remove leading white spaces
   Parser.addProfile({
      name: 'scrubSpaces',
      type: 'pre',
      match: /^( |\t)+/gm,
      handler() {
         return '';
      }
   });

   // comments
   Parser.addProfile({
      name: 'blockComment',
      type: 'pre',
      match: /\/\*(.+?)\*\//gs,
      handler(_, inner) {
         return `<!-- ${inner} -->`;
      }
   });

   // titles 
   Parser.addProfile({
      name: 'title',
      token: '#',
      match: /^(#{1,6})(.+)/gm,
      handler(_, t, inner) {
         return `<h${t.length}>${inner}</h${t.length}>`;
      }
   });

   // tables
   Parser.addProfile({
      name: 'table',
      token: '|',

      match: /(?:^\|.+\|(?:\n|$))+/gm,
      getEntries(m) {
         return m
            .split('\n')
            .filter(l => l.length)
            .map(
               l => l
                  .split('|')
                  .filter(c => c)
            );
      },

      wrapLine(line, t = 'td') {
         let out = '';
         for (const c of line) out += `<${t}>${c}</${t}>`;
         return `<tr>${out}</tr>`;
      },

      handler(m) {
         let out = '';

         const [head, ...body] = this.getEntries(m);

         // make head
         out += '<thead>' + this.wrapLine(head, 'th') + '</thead>';

         out += '<tbody>';
         for (const line of body) out += this.wrapLine(line);
         out += '</tbody>';

         return '<table>' + out + '</table>';
      }
   });

   // ul
   Parser.addProfile({
      name: 'ul',
      token: '-',

      match: /(^(-+) .+(?:\n|$))+/gm,
      entryMatch: /^(-+)(.+)/gm,

      getEntries(m) {
         return [
            ...m.matchAll(this.entryMatch)
         ].map(e => {
            return { depth: e[1].length, contents: e[2].trim() };
         });
      },

      handler(m) {

         let out = `<ul>`, i = 0, d = 1;

         const entries = this.getEntries(m);

         while (i < entries.length) {
            const cur = entries[i], prev = entries[i - 1];

            if (cur.depth < prev?.depth) {
               // close sublist
               out += '</ul>';
               d--;
            } else if (cur.depth > prev?.depth) {
               // open sublist
               out += '<ul>';
               d++;
            }

            out += `<li>${cur.contents}</li>`;
            i++;
         }

         // close any remaining sublists
         while (d--) out += '</ul>';

         return out;
      }
   });

   // horizontal rule
   Parser.addProfile({
      name: 'hr',
      token: '-',
      match: /(-|\*){3}/gs,
      handler() {
         return `<hr>`;
      }
   });

   // emdash
   Parser.addProfile({
      name: 'emdash',
      token: '-',
      match: /(?<=\b\s*)--(?=\s*\b)/g,
      handler() {
         return `—`;
      }
   });

   // strikethrough
   Parser.addProfile({
      name: 'strikethrough',
      token: '-',
      match: /(?<=\s|^)-(\S.*?)-(?=\s|$)/g,
      handler(_, inner) {
         return `<s>${inner}</s>`;
      }
   });

   // strong
   Parser.addProfile({
      name: 'strong',
      token: '*',
      match: /\*\*(\S.*?)\*\*/gs,
      handler(_, inner) {
         return `<strong>${inner}</strong>`;
      }
   });

   // italic
   Parser.addProfile({
      name: 'italic',
      token: '*',
      match: /\*(\S.*?)\*/gs,
      handler(_, inner) {
         return `<em>${inner}</em>`;
      }
   });

   // superscript
   Parser.addProfile({
      name: 'superscript',
      token: '^',
      match: /\^(\S.*?)\^/g,
      handler(_, inner) {
         return `<sup>${inner}</sup>`;
      }
   });

   // subscript
   Parser.addProfile({
      name: 'subscript',
      token: '~',
      match: /~(\S.*?)~/g,
      handler(_, inner) {
         return `<sub>${inner}</sub>`;
      }
   });

   // checkbox
   Parser.addProfile({
      name: 'checkbox',
      token: '[',
      match: /\[( |x|v)\]/gi,
      handler(_, inner) {
         if (inner !== ' ') inner = 'checked';
         return `<input type="checkbox" disabled ${inner}>`;
      }
   });

   // highlight
   Parser.addProfile({
      name: 'highlight',
      token: '!',
      match: /!(\S.*?)!/g,
      handler(_, inner) {
         return `<mark>${inner}</mark>`;
      }
   });

   // ol
   Parser.addProfile({
      name: 'ol',
      token: '+',

      match: /(^(\++) .+(?:\n|$))+/gm,
      entryMatch: /^(\++) (.+)/gm,

      getEntries(m) {
         return [
            ...m.matchAll(this.entryMatch)
         ].map(e => {
            return { depth: e[1].length, contents: e[2].trim() };
         });
      },

      handler(m) {

         let out = `<ol>`, i = 0, d = 1;

         const entries = this.getEntries(m);

         while (i < entries.length) {
            const cur = entries[i], prev = entries[i - 1];

            if (cur.depth < prev?.depth) {
               // close sublist
               out += '</ol>';
               d--;
            } else if (cur.depth > prev?.depth) {
               // open sublist
               out += '<ol>';
               d++;
            }

            out += `<li>${cur.contents}</li>`;
            i++;
         }

         // close any remaining sublists
         while (d--) out += '</ol>';

         return out;
      }
   });

   // quick div
   Parser.addProfile({
      name: 'div',
      token: '_',
      match: /__(.+?)__/gs,
      handler(_, inner) {
         return `<div>${inner}</div>`;
      }
   });

   // quick span
   Parser.addProfile({
      name: 'span',
      token: '_',
      match: /_(.+?)_/gs,
      handler(_, inner) {
         return `<span>${inner}</span>`;
      }
   });

   // code block
   Parser.addProfile({
      name: 'codeBlock',
      token: '`',

      match: /```(.+?)```/gs,
      langMatch: /^([a-z]+)/,

      handler(_, inner) {
         let lang = inner.match(this.langMatch);

         if (lang) {
            lang = lang[0];
            inner = inner.slice(lang.length);
         } else {
            lang = '';
         }

         return `<div data-language="${lang}"><code>${Parser.escapeSpecial(inner)}</code></div>`;
      }
   });

   // strong inline code
   Parser.addProfile({
      name: 'inlineCode',
      token: '`',
      match: [/``(.+?)``/g, /`(.+?)`/g],
      handler(_, inner) {
         return `<code>${Parser.escapeSpecial(inner)}</code>`;
      }
   });

   // paragraphs
   Parser.addProfile({
      name: 'p',
      match: /^[\p{Letter}&."'].+/gum,
      handler(m) {
         return `<p>${m}</p>`;
      }
   });

   // self-closing html tags
   Parser.addProfile({
      name: 'autoClose',
      token: '/',

      match: /<([\w-]+).*?\/>/g,
      voidElems: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'],

      handler(m, tag) {
         tag = tag.toLowerCase();
         console.log(m, tag);

         if (this.voidElems.includes(tag)) return m; // is void anyway

         return m.slice(0, -2) + `></${tag}>`;
      }
   });

   // links
   Parser.addProfile({
      name: 'urlLink',
      token: '[',
      match: /\[(.+?)\]\((.+?)\)/g,
      handler(_, txt, url) {
         return `<a href="${url}" target="_blank">${txt}</a>`;
      }
   });

}