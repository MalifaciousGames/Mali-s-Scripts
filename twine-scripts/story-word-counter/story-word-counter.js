window.wordCounter = {
   profiles: {

      html: [
         /<(style|script)>.*?<\/\1>/gs, // script and style
         /(?<!<)<[^<>]+?>(?!>)/gs // html tags so we don't match their properties
      ],

      SugarCube: {
         matchers: [
            /\/\*.*?\*\//gs, // /* comments */
            /<<(?:run|capture|unset|set|if|elseif|for|switch|case|type).+?>>/gs, // macros that don't output their arguments
            /<<[\w_-]+/g // macro names
         ],
         exclude: {
            passages: ['StoryInit', 'PassageDone', 'PassageReady'],
            tags: ['widget', 'init', 'script', 'stylesheet', 'Twine.audio', 'Twine.video', 'Twine.image', 'Twine.vtt']
         },
         words : /\b[\p{L}'-]+\b/gu
      },

      Harlowe : {
         matchers : [
            /\(.+?\)/gs //crude macro matching
         ],
         words : /\b[\p{L}'-]+\b/gu
      }
   },

   count(n = 0) {
      const { matchers, exclude, words } = this.profiles[$('tw-storydata').attr('format')];
      matchers.push(...this.profiles.html);

      $('tw-passagedata').each((_, p) => {

         if (exclude) {
            if (exclude.passages.includes(p.getAttribute('name'))) return;
            if (p.getAttribute('tags').split(' ').some(t => exclude.tags.includes(t))) return;
         }

         let txt = p.innerText;

         matchers.forEach(reg => txt = txt.replace(reg, ''));

         const mt = txt.match(words);

         if (mt) n += mt.length;
      });

      return n;
   }
};