// Mali's SVG markup
; {

   const SVGMarkup = {
      tag: 'twine.svg',
      matcher: /\[svg\[(.+?)\]\]/g,
      registered: {},

      processStyles() {
         for (const style of document.querySelectorAll('style')) {
            if (!this.matcher.test(style.innerText)) continue;

            let txt = style.innerText.replace(this.matcher, (_, psg) => {
               let content = this.registered[psg];
               if (!content) console.warn(`Failed to reference the ${psg} svg passage, make sure it is tagged with ${this.tag} and the proper name is used.`);

               return `url('data:image/svg+xml,${encodeURIComponent(content)}')`;
            });

            style.innerText = txt;
         }
      },

      parserHandler(w) {
         const psg = w.matchText.slice(5, -2);
         let contents = this.registered[psg];

         if (!contents) {
            return appendError(
               w.output,
               `Failed to reference the ${psg} svg passage, make sure it is tagged with ${this.tag} and the proper name is used.`,
               w.source.slice(w.matchStart, w.nextMatch)
            );
         }

         const wrapper = document.createElement('span');
         wrapper.innerHTML = contents;
         wrapper.classList.add('svg-markup');

         w.output.appendChild(wrapper);
      },

      init() {

         // fetch passages and their contents
         for (const p of Story.filter(p => p.tags.includes(this.tag))) {
            this.registered[p.name] = p.text;
         }

         // reload the stylesheets that have the tag
         this.processStyles();

         // register the parser profile
         Wikifier.Parser.add({
            name: 'svgMarkup',
            match: '\\[svg\\[.+?\\]\\]',
            handler: (w) => this.parserHandler(w)
         });
         Wikifier.Parser.Profile.compile();

      }
   };

   SVGMarkup.init();
   setup.SVGMarkup = SVGMarkup;
};