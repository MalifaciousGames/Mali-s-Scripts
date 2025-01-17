/* Mali's hash navigation for Harlowe*/
;{
   const HNav = {
      config: {
         startAt: true,
         navigateTo: true
      },
      getHash() {
         return decodeURIComponent(location.hash.slice(1).trim());
      },
      setHash(value) {
         return location.hash = encodeURIComponent(value);
      },
      canTravel(psg, mode) {
         if (!document.querySelector(`tw-passagedata[name="${psg}"]`)) return false;

         const config = this.config[mode];

         if (Array.isArray(config)) return config.includes(psg);

         return config;
      }
   };

   if (HNav.config.startAt) {

      const fromHash = HNav.getHash();

      if (fromHash.length && HNav.canTravel(fromHash, 'startAt')) {
         Engine.goToPassage(fromHash);
         State.timeline.shift();
         location.hash = '';
      }

   };

   if (HNav.config.navigateTo) {

      window.addEventListener('hashchange', () => {
         const newHash = HNav.getHash();

         if (!newHash.length) return;

         if (HNav.canTravel(newHash, 'navigateTo')) {
            Engine.goToPassage(newHash);
            location.hash = '';
         }

      });
   }
};
