setup.touchSkip = {
   enabled : false,
   trigger : false,
   delay : 200 // <= change the hold down delay here
};

// make sure incoming passage has a <<type>> in it
$(document).on(':passagerender', e => {
   setup.touchSkip.enabled = !!e.content.querySelector('.macro-type');
});

$(document).on('touchstart', e => {
   if (setup.touchSkip.enabled && !e.target.closest('a,button,input,textarea')) {

      setup.touchSkip.trigger = true;
      setTimeout(() => {
         if (setup.touchSkip.trigger) $('body').trigger({ type: 'keydown', key: Config.macros.typeSkipKey });
      }, setup.touchSkip.delay)
      
   };
});

$(document).on('touchend', () => {setup.touchSkip.trigger = false});