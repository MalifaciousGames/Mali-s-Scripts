// Mali's smart quotes for SugarCube

; {
   Wikifier.Parser.add({
      name: 'smartQuotes',
      profiles: ['core'],
      match: '"',
      handler(w) {

         const $el = $('<span>', {
            class: 'smartly-quoted'
         }).appendTo(w.output);

         w.subWikify($el.get(0), '"');
      }
   });

   Wikifier.Parser.Profile.compile();
};