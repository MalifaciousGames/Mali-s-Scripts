/* Mali's extra markup */
; {

   const makeInsert = (passage, type, t8n) => {

      return $('<span>', {
         class: type + '-insert'
      })
         .wiki(Story.get(passage).processText())
         .hide()
         .fadeIn(t8n ? 400 : 0);

   };

   const callbacks = {

      dialog(passage) {

         Dialog
            .create()
            .wikiPassage(passage)
            .open();

      },

      after(passage, $link, t8n) {
         const insert = makeInsert(passage, 'after', t8n);

         if ($link) {
            $link.after(insert);
         } else {
            $('.passage').append(insert);
         }
      },

      before(passage, $link, t8n) {
         const insert = makeInsert(passage, 'before', t8n);

         if ($link) {
            $link.before(insert);
         } else {
            $('.passage').prepend(insert);
         }
      },

      replace(passage, $link, t8n) {

         if ($link) {
            $link.replaceWith(makeInsert(passage, 'replace', t8n));
         } else {
            $('.passage').empty().append(makeInsert(passage, 'replace', t8n));
         }

      }
   };

   Wikifier.Parser.add({
      name: 'extraMarkup',
      match: '\\[.+?\\[\\[.+?\\]\\]',
      profiles: ['core'],
      handler(w) {

         let [command, inner, ...setter] = w.matchText.match(/[^\[\]]+/g), text, passage;

         // the setter might contain brackets and thus be in pieces
         if (setter.length) {
            // ][ ... ]]
            setter = w.matchText.match(/(?<=\]\[).+(?=\]\])/)[0];
            // turn into shadowed callback
            setter = Wikifier.helpers.shadowHandler(Scripting.desugar(setter));
         } else {
            setter = false;
         }

         // command processing
         command = command.toLowerCase().split('-');

         const once = command.includes('once'),
            self = command.includes('self'),
            t8n = command.includes('t8n');

         command = command[0];

         // illegal command
         if (!callbacks[command]) return appendError(
            w.output,
            `"${command}" is not a valid command.`,
            w.matchText
         );

         // text and passage name processing
         if (inner.includes('|')) {
            ([text, passage] = inner.split('|'));
         } else if (inner.includes('->')) {
            ([text, passage] = inner.split('->'));
         } else if (inner.includes('<-')) {
            ([passage, text] = inner.split('<-'));
         } else {
            passage = text = inner;
         }

         passage = Wikifier.helpers.evalText(passage);

         if (!Story.has(passage)) return appendError(
            w.output,
            `"${passage}" passage does not exist.`,
            w.matchText
         );

         const $link = $('<a>', {
            class: 'link-internal markup-link markup-' + command
         }).wiki(text);

         const callback = function () {
            if (setter) setter.call(this);
            callbacks[command](passage, self ? $link : false, t8n);

            if (once && command !== 'replace') $link.remove();
         };

         $link.ariaClick(
            {
               role: 'link',
               one: !!once
            },
            callback
         );

         w.output.appendChild($link[0]);
      }
   });

   Wikifier.Parser.Profile.compile();
};
/* End of extra markup */