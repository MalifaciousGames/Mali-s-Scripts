; {

   const HarloweInput = {
      config: {
         attributes: {
            setter: 'data-setter',
            update: 'data-update',
            coerce: 'data-coerce'
         },
         updateByDefault: true
      },

      story: document.querySelector('tw-story'),

      init() {
         document.addEventListener('change', e => this.changeHandler(e), { capture: true });

         const MO = new MutationObserver(ch => this.valueFiller());
         MO.observe(this.story, { childList: true });
      },

      valueFiller() {
         const { setter } = this.config.attributes, inputs = this.story.querySelectorAll(`[${setter}]`);

         for (const input of inputs) {
            const variables = input.getAttribute(setter)?.match(/\w+/g);
            if (!variables) continue;

            const stateVal = State.variables.TwineScript_GetProperty(variables[0]);
            console.log(stateVal, variables[0]);

            if (input.type === 'checkbox') {
               input.checked = !!stateVal;
            } else if (input.type === 'radio') {
               input.checked = input.value === '' + stateVal;
            } else {
               input.value = stateVal ?? input.value;
            }
         }

      },

      changeHandler(event) {
         const t = event.target,
            { attributes, updateByDefault } = this.config;

         if (!t.hasAttribute(attributes.setter)) return;

         let { type, value } = t,
            varNames = t.getAttribute(attributes.setter).match(/\w+/g),
            coerceTo = t.getAttribute(attributes.coerce),
            withUpdate = t.hasAttribute(attributes.update) || updateByDefault;

         if (!varNames?.length) return;

         // do value coercion
         if (coerceTo) {
            value = this.coerceValue(value, coerceTo);
         } else if (type === 'number' || type === 'range') {
            value = Number(value);
         } else if (type === 'checkbox') {
            value = e.target.checked;
         }

         this.setVars(varNames, value, withUpdate);
      },

      setVars(names, value, update) {
         for (const name of names) {
            // set variable
            State.variables.TwineScript_Set(name, value);

            // update elements
            if (update) {
               [...this.story.querySelectorAll(`[type="variable"][name="${name}"]`)].forEach(el => el.innerHTML = value);
            }
         }
      },

      coerceValue(v, type) {
         if (!type || typeof type !== 'string') return v;

         let val = v.trim().toLowerCase();

         switch (type.trim().toLowerCase()) {
            case 'boolean': case 'bool': case 'b':
               return val === 'false' ? false : !!val.length;
            case 'number': case 'num': case 'n':
               return Number(val);
            case 'string': case 'str': case 's':
               return val;
         }

         return v;
      }
   };

   HarloweInput.init();

   window.HarloweInput = HarloweInput;
};
