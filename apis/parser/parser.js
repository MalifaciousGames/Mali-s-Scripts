window.Parser = {

   buffer: document.createElement('span'),

   parse(txt) {
      if (typeof txt !== 'string') throw new Error(`Cannot call the parser on a ${typeof txt}, must be a string.`);

      // character escape
      txt = txt.replace(/\\(.)/g, (_, c) => `&#${c.charCodeAt(0)};`);

      console.log(txt);

      // do the pre-processing (cleanup)
      for (const prf of this.tasks.pre) txt = this.runProfile(txt, prf);

      // do the text parsing
      for (const prf of this.tasks.parse) txt = this.runProfile(txt, prf);

      // output to buffer element
      this.buffer.innerHTML = txt;

      // run the post-processing tasks on the buffer element
      for (const prf of this.tasks.post) this.runProfile(this.buffer, prf);

      return [...this.buffer.childNodes];
   },

   parseTo(txt, output) {

      if (output instanceof HTMLElement || output instanceof DocumentFragment) {
         output.append(...this.parse(txt));
         return output;
      }

      throw new Error(`Invalid output argument, must be an element or a document fragment.`);
   },

   specials: /[`\\<>&-]/g,
   escapeSpecial(txt) {
      return txt.replace(this.specials, c => this.escape(c));
   },
   escape(c) {
      return `&#${c.charCodeAt(0)};`
   },

   tasks: {
      pre: [],
      parse: [],
      post: []
   },

   addProfile(profile) {

      profile.type ||= 'parse';

      profile.priority ??= 1;

      if (!profile.match) throw new Error('Parser profile is missing a match property!');
      if (!profile.handler) throw new Error('Parser profile is missing a handler property!');

      this.tasks[profile.type].push(profile);

      // sort by priority
      this.tasks[profile.type].sort((p1, p2) => p2.priority - p1.priority);
   },

   getProfile(name) {
      let found = this.tasks.pre.find(p => p.name === name);
      if (!found) found = this.tasks.parse.find(p => p.name === name);
      if (!found) found = this.tasks.post.find(p => p.name === name);

      return found;
   },

   runProfile(content, prf) {

      // do sanity checks

      if (typeof prf === 'string') prf = this.getProfile(prf);

      if (prf.type === 'post') {
         // content is an element (likely the buffer)
         if (!(content instanceof HTMLElement)) throw new Error(`Post-processing profiles can only be called on HTML elements.`);

         const elements = content.querySelectorAll(prf.match);
         for (const el of elements) prf.handler(el);

      } else {
         // pre or parse task, on a string
         if (typeof content !== 'string') throw new Error(`Cannot run a ${prf.type} profile on something that isn't a string: ${typeof content}.`);

         const matchers = Array.isArray(prf.match) ? prf.match : [prf.match], handler = prf.handler.bind(prf);

         for (const m of matchers) {

            if (typeof m === 'string') {
               content = content.replaceAll(m, handler);
            } else if (m instanceof RegExp) {
               content = content.replace(m, handler);
            }

         }

      }

      return content;
   }

};
