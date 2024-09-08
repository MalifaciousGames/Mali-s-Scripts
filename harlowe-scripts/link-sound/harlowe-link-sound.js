// Mali's automated link sounds

window.setLinkSound = (...urls) => {
   const tracks = [];
   
   // yes, the jQuery wrapper is immediately discarded, fight me
   for (const url of urls) tracks.push($(`<audio src='${url}'>`)[0]);

   $('tw-story')[0].addEventListener('click', e => {

      if (e.target.nodeName === 'TW-LINK') {
         // get random track
         const i = Math.floor(Math.random() * tracks.length);
         tracks[i].play();
      }

   });
};

// set the tracks by using : setLinkSound('myLinkSound.mp3');
// multiple URLs will result in randomized sounds