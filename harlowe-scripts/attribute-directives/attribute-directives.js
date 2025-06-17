; {

   // Mali's attribute directives for Harlowe
   const AttrDirectives = {
      config: {
         eva: 'eval:',
         sub: 'sub:'
      },

      story: document.querySelector('tw-story'),
      init() {
         const MO = new MutationObserver(() => this.processPassage());
         MO.observe(this.story, { childList: true });
      },

      processPassage() {
         const { eva, sub } = this.config;

         for (const el of this.story.querySelectorAll('*')) {
            for (const { name, value } of [...el.attributes]) {

               if (name.startsWith(eva)) {

                  el.removeAttribute(name);
                  el.setAttribute(name.slice(eva.length), this.eval(value, true));

               } else if (name.startsWith(sub)) {

                  el.removeAttribute(name);
                  el.setAttribute(name.slice(sub.length), this.substitute(value));

               }

            }
         }
      },

      varMatch: /\$(\w+)/g,
      eval(exp) {
         exp = exp.replace(this.varMatch, (v, name) => JSON.stringify(State.variables.TwineScript_GetProperty(name)));
         return eval(exp);
      },
      substitute(exp) {
         return exp.replace(this.varMatch, (v, name) => State.variables.TwineScript_GetProperty(name));
      }
   };

   AttrDirectives.init();
};