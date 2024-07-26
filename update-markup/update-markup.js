/* Mali's update markup */

((isCooldown = false) => {
   const shadowHandler = Wikifier.helpers.shadowHandler || Wikifier.helpers.createShadowSetterCallback;

   const wrappers = [];

   // Update function
   const updateWrappers = () => {
      if (isCooldown) return;

      let i = wrappers.length - 1;

      while (i >= 0) {
         const { wrapper, shadowGetter } = wrappers[i];

         // out of DOM, remove it
         if (!wrapper.isConnected) {
            wrappers.splice(i--, 1);
            continue;
         }

         const cnt = stringFrom(shadowGetter());
         if (wrapper.innerText !== cnt) wrapper.innerText = cnt;
         i--;
      }

      isCooldown = true;
      setTimeout(() => isCooldown = false, 150);
   };

   Wikifier.Parser.add({
      name: 'updateMarkup',
      match: '{.*?{.*?}}',
      handler(w) {

         const [_, elem, raw] = w.matchText.match(/{(.*?){(.*?)}}/),
            wrapper = $(`<${elem.trim() || 'span'} aria-live='polite'>`)[0];

         // push reference object
         wrappers.push({
            wrapper,
            shadowGetter: shadowHandler(`State.getVar("${raw.replace(/"|'|`/g, m => `\\${m}`)}")`)
         });

         wrapper.innerText = stringFrom(State.getVar(raw));

         w.output.appendChild(wrapper);
      }
   });

   $(document).on('change click drop keyup', updateWrappers);

   // Exports.
   setup.updateWrappers = updateWrappers;

   Wikifier.Parser.Profile.compile();
})();