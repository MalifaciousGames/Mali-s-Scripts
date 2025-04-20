/* Mali's key navigation for Harlowe */

(() => {

   window.KeyNav = {
      symbols: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'k', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      story: $('tw-story'),

      isInvalid(e) {
         return (
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            ['input', 'textarea'].includes(e.target.tagName.toLowerCase()) ||
            e.originalTarget.isContentEditable
         );
      },

      historyControl(e) {

         if (e.code === 'ArrowRight') {
            const $b = this.story.find('tw-icon[title=Redo]:visible');
            if ($b.css('visibility') !== 'hidden') return $b.click();
         }

         if (e.code === 'ArrowLeft') {
            const $b = this.story.find('tw-icon[title=Undo]:visible');
            if ($b.css('visibility') !== 'hidden') return $b.click();
         }

         return false;
      },

      process(e) {
         if (!this._enabled || this.isInvalid(e)) return;

         if (this.historyControl(e)) return;

         let n = /Digit|Numpad/.test(e.code) ? e.code.at(-1) : e.key;

         if (!this.symbols.includes(n)) return;

         const index = this.symbols.indexOf(n.toLowerCase()),
            trg = this.story.find('tw-passage>:not(tw-sidebar) tw-link')[index];

         if (trg) trg.click();
      },

      _enabled: false,
      get enabled() {
         return this._enabled;
      },
      set enabled(v) {
         this._enabled = (v = !!v);

         if (v) {
            document.documentElement.setAttribute('data-keynav', '');
         } else {
            document.documentElement.removeAttribute('data-keynav');
         }
      }
   };

   KeyNav.enabled = true;
   window.addEventListener('keyup', KeyNav.process.bind(KeyNav));

})();

/* End of key navigation script */