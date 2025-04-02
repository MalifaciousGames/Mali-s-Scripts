; {

   const Translations = {

      profiles: {
         English: 'en',
         French: 'fr',
         German: 'de',
         Portuguese: 'pt',
         Spanish: 'es',
      },

      refresh() {
         $('html').attr('data-lang', settings.lang);

         // reset the state to last history moment before the rerun...
         Engine.show();
      },

      testForSuffix(title) {
         return new RegExp(`-(${Object.values(this.profiles).join('|')})$`).test(title);
      },

      getSuffixedPassage(psg) {
         const suffix = '-' + this.profiles[settings.lang];

         if (psg.title.endsWith(suffix)) return psg; // right suffix

         let name = psg.title, hasSuffix = this.testForSuffix(psg.title);

         if (!hasSuffix) {
            name += suffix;
         } else {
            // replace suffix
            name = name.slice(0, -3) + suffix;
         }

         if (Story.has(name)) {
            return Story.get(name);
         } else {
            console.warn(`Tried to display ${name} but no such passage existed.`);
            return psg;
         }
      }

   };

   // add setting
   Setting.addList('lang', {
      label: 'Language choice : ',
      list: Object.keys(Translations.profiles),
      onChange: Translations.refresh,
      onInit: Translations.refresh
   });

   // register onProcess
   if (Config.passages.onProcess) {
      // already registered, simply pass the suffixed passage instead
      const old = Config.passages.onProcess;
      Config.passages.onProcess = psg => {
         psg = Translations.getSuffixedPassage(psg);
         return old(psg);
      };

   } else {
      Config.passages.onProcess = psg => Translations.getSuffixedPassage(psg).text;
   }

   setup.Translations = Translations;
};