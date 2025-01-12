/* Mali's hash navigation */

{
   const HashNavigation = {
      config: {
         hashStart: true,
         hashChangeNavigation: true
      },
      getHash() {
         return decodeURIComponent(location.hash.slice(1).trim());
      },
      setHash(value) {
         return location.hash = encodeURIComponent(value);
      }
   };

   if (HashNavigation.config.hashStart) {
      let storyData = $('tw-storydata'), startName = 'Start';

      if (storyData.attr('creator') === 'Twine') {
         const startID = storyData.attr('startnode');
         startName = $(`[pid="${startID}"]`).attr('name');
      }

      const fromHash = HashNavigation.getHash();

      if (fromHash.length && Story.has(fromHash)) {
         Config.passages.start = fromHash;
         location.hash = '';
      } else {
         Config.passages.start = startName;
      }

   };

   if (HashNavigation.config.hashChangeNavigation) {
      window.addEventListener('hashchange', () => {
         const newHash = HashNavigation.getHash();

         if (!newHash.length) return;

         if (Story.has(newHash)) {
            Engine.play(newHash);
            location.hash = '';
         } else {
            console.warn(`Story does not have a "${newHash}" passage.`);
         }

      });
   }
}