window.testMedia = (getFile = true, warnHotLink = true) => {

   let report = '', step = 0, errCount = 0;

   const presets = {
      img: {
         formats: ['png', 'jpg', 'gif', 'ico', 'svg'],
         testElem: 'img',
         title: '========= IMAGES =========\n',
         loadEv: 'load'
      },
      audio: {
         formats: ['mp3', 'ogg', 'wav', 'aac', 'flac'],
         testElem: 'audio',
         title: '========= AUDIO TRACKS =========\n',
         loadEv: 'loadstart'
      },
      video: {
         formats: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
         testElem: 'video',
         title: '========= VIDEOS =========\n',
         loadEv: 'loadstart'
      }
   }, next = first => {
      if (!first) console.groupEnd(), step++;
      if (step < 3) {
         typeCheck(Object.keys(presets)[step])
      } else if (getFile && errCount) {

         //last run, export report!
         const n = $('tw-storydata')[0].getAttribute('name'), data = new Blob([report], { type: "text/plain" });

         $('<a>').prop({
            href: URL.createObjectURL(data),
            download: `Twine-media-test:${n}.txt`
         })[0].click();
      } else if (!errCount) {
         console.log('No errors found!');
      }
   }, logReport = (txt, cs) => {
      console[cs ?? 'log'](txt);
      report += txt + '\n';
   }, getLoc = loc => {
      let o = '\n';
      for (const k in loc) o += k + loc[k].slice(0, -2) + `.\n`;
      return o;
   }, typeCheck = mode => {

      const media = {}, preset = presets[mode], matcher = new RegExp(`(https*:)*[\\w ~\\.\\/-]+\\.(${preset.formats.join('|')})(?![\\w ~\\.\\/-])`, 'g');

      $('tw-passagedata, style, script').each((_, e) => {

         const matches = [...e.innerText.matchAll(matcher)];
         if (!matches.length) return;

         const n = e.getAttribute('name') ?? e.getAttribute('title') ?? e.getAttribute('data-title') ?? e.getAttribute('id') ?? 'Some ' + e.localName, type = e.localName === 'tw-passagedata' ? 'passage' : e.localName, totLength = e.innerText.length;

         matches.forEach(m => {
            const pos = `- ${type} "${n}" : `, char = `character ${m.index}/${totLength}, `;
            m = m[0];
            media[m] ??= {};
            media[m][pos] ??= '';
            media[m][pos] += char
         });
      });

      let tot = Object.keys(media).length, done = 0, locErr = 0;

      // title
      logReport(preset.title, 'group');

      if (!tot) return logReport(`No ${mode} urls found.\n`), next();

      console.log(`... testing ${tot} url${tot > 1 ? 's' : ''}...`);

      for (const url in media) {

         // hotlink warning, if toggled
         if (warnHotLink && url.startsWith('http')) {
            errCount++; locErr++;
            logReport(`WARNING : \nFound online url "${url}". In :${getLoc(media[url])}`);
         };

         const t = document.createElement(mode);
         t.onerror = () => {
            errCount++; locErr++;
            logReport(`ERROR : \nFailed to load ${mode} with url "${url}". In :${getLoc(media[url])}`);
            if ((done += 1) === tot) console.log(`...done...`), next();
         };
         t.addEventListener(preset.loadEv, () => {
            if ((done += 1) === tot) {
               console.log(`...done...`);
               // no error in media category
               if (!locErr) report += `${tot}/${tot} url${tot > 1 ? 's' : ''} loaded successfully.\n`;
               next();
            };
         })
         t.src = url;
      }
   };

   next(true);

};