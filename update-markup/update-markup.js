/* Mali's update markup */

((isCooldown = false, onPage = 0) => {
   const shadowHandler = Wikifier.helpers.shadowHandler || Wikifier.helpers.createShadowSetterCallback;

   // Update function
   const updateWrappers = () => {
      if (isCooldown) return;

      const found = $('[role="update-wrapper"]');
      if (!found.length) onPage = 0;
      if (!onPage) return;

      found.each((_, el) => el.update());
      isCooldown = true;
      setTimeout(() => isCooldown = false, 100);
   };

   // Exports.
   setup.updateWrappers = updateWrappers;

   Wikifier.Parser.add({
      name: 'updateMarkup',
      match: '{.*?{.*?}}',
      handler(w) {

         const [_, elem, raw] = w.matchText.match(/{(.*?){(.*?)}}/),
            wrapper = $(`<${elem.trim() || 'span'} role='update-wrapper' aria-live='polite'>`)[0],
            getShadow = shadowHandler(`State.getVar("${raw.replace(/"|'|`/g, m => `\\${m}`)}")`);

         wrapper.innerText = stringFrom(State.getVar(raw));

         wrapper.update = function () {
            const str = stringFrom(getShadow());
            if (str !== this.innerText) this.innerText = str;
         };

         onPage++;

         w.output.appendChild(wrapper);
      }
   });

   $(document).on('change click drop refreshUpdateContainers', updateWrappers);
   Wikifier.Parser.Profile.compile();
})();