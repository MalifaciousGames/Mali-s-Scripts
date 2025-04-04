; {

   const doNothing = e =>
      e.key === 'Enter' ||
      ['INPUT', 'TEXTAREA'].includes(e.target.nodeName) ||
      e.target.attributes.hasOwnProperty('contenteditable');

   const buildTargetCode = e => {
      let targetCode = (e.ctrlKey ? 'ctrl + ' : '') + (e.shiftKey ? 'shift + ' : '') + (e.altKey ? 'alt + ' : '');

      if (e.code.startsWith('Digit')) {
         targetCode += e.code.slice(5);
      } else if (e.code === 'Space') {
         targetCode += 'space';
      } else {
         targetCode += e.key.toLowerCase();
      }

      return targetCode;
   };

   const findTarget = el => el.querySelector('a, button, tw-link, passage-link, [onclick], input, select, textarea') ?? el;

   // bind listener
   window.addEventListener('keyup', e => {

      if (doNothing(e)) return;

      const targets = document.querySelectorAll(`[data-key="${buildTargetCode(e)}"]`);

      for (let target of targets) {
         findTarget(target).click();
      }

   }, true);

};
