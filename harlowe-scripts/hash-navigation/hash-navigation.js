/* Mali's hash navigation for Harlowe*/
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
      },
      hasPassage(name) {
         return !!document.querySelector(`tw-passagedata[name="${name}"]`);
      }
   };

   if (HashNavigation.config.hashStart) {

      const fromHash = HashNavigation.getHash();

      if (fromHash.length && HashNavigation.hasPassage(fromHash)) {
         Engine.goToPassage(fromHash);
         State.timeline.shift();
         location.hash = '';
      }

   };

   if (HashNavigation.config.hashChangeNavigation) {

      window.addEventListener('hashchange', () => {
         const newHash = HashNavigation.getHash();

         if (!newHash.length) return;

         if (HashNavigation.hasPassage(newHash)) {
            Engine.goToPassage(newHash);
            location.hash = '';
         } else {
            console.warn(`No "${newHash}" passage available!`);
         }

      });
   }
}