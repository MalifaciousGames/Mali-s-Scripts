// Mali's automated link sounds

window.setLinkSound = (...urls) => {
   const tracks = [], playRandom = () => tracks[Math.floor(Math.random() * tracks.length)]?.play();

   const isGoodTarget = el =>
      ['tw-link', 'a', 'button'].includes(el.localName) || // standard interactables
      el.classList.contains('link') // a clickable enchantment
   ;

   // yes, the jQuery wrapper is immediately discarded, fight me
   for (const url of urls) tracks.push($(`<audio src='${url}'>`)[0]);

   $('tw-story')[0].addEventListener('click', e => {

      if (isGoodTarget(e.target)) playRandom();

   });
};

// set the tracks by using : setLinkSound('myLinkSound.mp3');
// multiple URLs will result in randomized sounds