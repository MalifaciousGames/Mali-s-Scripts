/* Mali's Translations API for SugarCube */
; {

   const Translations = {

      profiles: {},
      active: null,

      settingName: 'Language',
      settingLabel: 'Change language : ',

      addProfile(name, suffix, l10nStrings, onChange) {

         if (!name || typeof name !== 'string') throw new Error(`Language profile, invalid language name : "${name}".`);
         if (!suffix || typeof suffix !== 'string') throw new Error(`Language profile (${name}), invalid language suffix : "${suffix}".`);

         this.profiles[name] = {
            name, suffix, l10nStrings, onChange
         };

      },

      change(lang) {

         if (typeof lang === 'string') {
            // override, do it via the settings callback
            return Setting.setValue(this.settingName, lang);
         }

         const profile = this.active = this.profiles[settings[this.settingName]];
         if (!profile) return;

         // global attribute
         $('html').attr('data-lang', profile.name);

         // change handler
         if (typeof profile.onChange === 'function') profile.onChange.call(profile);

         // has a locale POJO
         if (profile.l10nStrings && profile.l10nStrings.constructor.name === 'Object') {
            for (const name in profile.l10nStrings) l10nStrings[name] = profile.l10nStrings[name];

            UIBar.start(); // rebuild UI bar with the next locales
         }

         // reset the state to last history moment before the rerun...
         const previous = State.history.at(-1);
         if (previous) {
            for (const k in previous.variables) State.variables[k] = previous.variables[k];
         }

         Engine.show();
      },

      getSuffixedPassage(psg) {
         if (!this.active) return psg;

         const suffix = '-' + this.active.suffix;

         if (psg.title.endsWith(suffix)) return psg; // right suffix

         let name = psg.title, hasSuffix = this.suffixTester.test(psg.title);

         if (!hasSuffix) {
            name += suffix;
         } else {
            // replace suffix
            name = name.slice(0, -3) + suffix;
         }

         if (Story.has(name)) {
            return Story.get(name);
         } else {
            return psg;
         }
      },

      init() {

         const profiles = Object.values(this.profiles);
         if (!profiles.length) return; // no profiles


         this.active = profiles[0];

         this.suffixTester = new RegExp(`-(${profiles.map(p => p.suffix).join('|')})$`);

         // add setting
         Setting.addList(this.settingName, {
            label: this.settingLabel,
            list: Object.keys(this.profiles),
            onChange: this.change.bind(this),
            onInit: this.change.bind(this)
         });

         // register onProcess
         if (Config.passages.onProcess) {

            // already registered, simply pass the suffixed passage instead
            const old = Config.passages.onProcess;
            Config.passages.onProcess = psg => {
               psg = this.getSuffixedPassage(psg);
               return old(psg);
            };

         } else {
            Config.passages.onProcess = psg => this.getSuffixedPassage(psg).text;
         }

      }
   };

   // add language profiles !HERE!

   // Translations.addProfile('French', 'fr', { savesTitle: 'Sauvegardes' });
   // Translations.addProfile('English', 'en', { savesTitle: 'Saves' });
   // Translations.addProfile('German', 'de', { savesTitle: 'Speicherstände' });

   // call the init function
   Translations.init();

   setup.Translations = Translations;
};