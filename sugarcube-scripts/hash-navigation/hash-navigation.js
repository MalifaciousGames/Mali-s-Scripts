/* Mali's hash navigation */

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
         if (!Story.has(psg)) return false;

         const config = this.config[mode];

         if (Array.isArray(config)) return config.includes(psg);

         return config;
      }
   };

   if (HNav.config.startAt) {

      let storyData = $('tw-storydata'), startName = 'Start', fromHash = HNav.getHash();

      if (storyData.attr('creator') === 'Twine') {
         const startID = storyData.attr('startnode');
         startName = $(`[pid="${startID}"]`).attr('name');
      }

      if (fromHash.length && HNav.canTravel(fromHash, 'startAt')) {
         startName = fromHash;
         location.hash = '';
      }

      Config.passages.start = startName;
   };

   if (HNav.config.navigateTo) {

      window.addEventListener('hashchange', () => {
         const newHash = HNav.getHash();

         if (!newHash.length) return;

         if (HNav.canTravel(newHash, 'navigateTo')) {
            Engine.play(newHash);
            location.hash = '';
         }
      });
   }

   setup.HNav = HNav;
};