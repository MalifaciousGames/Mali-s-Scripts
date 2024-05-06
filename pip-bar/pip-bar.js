; ((onPage = 0) => {

   const format = document.querySelector('tw-storydata').getAttribute('format'),
      varParser = {
         SugarCube(str) {
            return str.replace(/(?<!\w)\$(?=\w)/g, 'State.variables.').replace(/(?<!\w)_(?=\w)/g, 'State.temporary.');
         },
         Harlowe(str) {
            return str.replace(/(?<!\w)\$(?=\w)/g, 'State.variables.');
         },
         Chapbook(str) {
            const st = engine.state.get();
            for (const k in st) {
               str = str.replace(new RegExp(`\\b${k}\\b`, 'g'), st[k]);
            }
            return str;
         },
         //Snowman: custom elements don't render properly...
      };


   const config = {
      name: 'pip-bar',

      presets: {
         default: '◼,◻',
         round: '◉,◎',
         hexa: '⬢,⬡',
         hexalong: '⬣,⎔',
         penta: '⬟,⬠',
         pentalong: '⭓,⭔',
         diamond: '◈,◇',
         bar: '𝅛,𝅚',
         xcom: '▰,▱',
         sonata: '☐,☒',
         stars: '★,☆',
         stars4: '⯌,⯎',
         ascii: {
            full: 'l',
            empty: {
               token: 'l',
               style: 'opacity: .5;'
            }
         },
         hearts: {
            full: '♡',
            empty: {
               token: '♡',
               style: 'opacity: .5;'
            }
         }
      },
      classes: {
         full: 'full-bar',
         empty: 'empty-bar',
         main: 'pip-bar'
      },
      default: {
         max: 5,
         value: 0
      }
   };

   const numGetter = v => {
      let num = Number(v);
      if (isNaN(num)) {
         try {
            num = eval(v);
         } catch {
            num = 0;
         }
      }

      if (typeof num !== 'number') {
         console.warn(`Couldn't coerce '${v}' into a number, we tried tho.`);
         num = 0;
      };
      
      return num;
   };

   function numSetter(v) {
      if (typeof v === 'number') v = '' + v;

      //need to be computed
      if (isNaN(Number(v)) && !this.hasVariable) {
         this.hasVariable = true;
         onPage++;
      };

      // replace $ sigil, set variable flag if any match
      if (varParser[format]) v = varParser[format](v);

      return v;
   };

  window.PipBar = class extends HTMLElement {
      constructor() {
         super();

         // default values
         this.preset = 'default';
         this.max = config.default.max;
         this.value = config.default.value;
         this.setAttribute('aria-live', 'polite');
      }

      // preset getter/setter
      get preset() {
         return this._preset;
      }
      set preset(prs) {

         // already an object
         if (typeof prs === 'object') {
            if (typeof prs.full === 'string') prs.full = { token: prs.full };
            if (typeof prs.empty === 'string') prs.empty = { token: prs.empty };
            return this._preset = prs;
         };

         if (typeof prs === 'string') {
            // a valid preset name, call the setter again, with the object
            if (config.presets[prs]) return this.preset = config.presets[prs];

            const [full = '', empty = ''] = prs.split(',');
            this._preset = {
               full: { token: full },
               empty: { token: empty }
            };
         }
      }

      // value and max getters/setters
      get value() { return Math.min(numGetter(this._value), this.max) }
      set value(v) { this._value = numSetter.call(this, v) }

      get max() { return numGetter(this._max) }
      set max(v) { this._max = numSetter.call(this, v) }

      connectedCallback() {
         if (!this.firstInit) {
            this.baseText = this.innerHTML;
            this.firstInit = true;
         }

         this.printValue();
      }

      buildBar(val, type) {

         const def = this.preset[type],
            token = def.token,
            cls = config.classes[type] + (def?.class ?? ''),
            bar = ''.padEnd(val * token.length, token),
            stl = def?.style ?? '';

         return `<span class='${cls}' style='${stl}'>${bar}</span>`;
      }

      printValue() {
         const val = this.value, max = this.max, excerpt = val + ' out of ' + max;

         // didn't change, don't re-render
         if (excerpt === this.excerpt) return;

         this.innerHTML = this.baseText + `<span class='${config.classes.main}'>` + this.buildBar(val, 'full') + this.buildBar(max - val, 'empty') + `</span>`;

         this.setAttribute('aria-label', this.excerpt = excerpt);
      }

      attributeChangedCallback(n, old, val) {
         if (val == null) return;

         // full-token to preset.full.token
         if (n.includes('-')) {
            const [t, c] = n.split('-');
            this.preset[t][c] = val;
         }

         switch (n) {
            case 'preset':
               this.preset = val;
               break;
            case 'tokens':
               // this is different from the preset setter as it only affect tokens, nothing else
               const [full = '', empty = ''] = val.split(',');
               this.preset.full.token = full;
               this.preset.empty.token = empty;
               break;
            case 'value': case 'max':
               this[n] = val;
         }

         if (this.isConnected) this.printValue();

      }

      static observedAttributes = ['max', 'value', 'preset', 'full-token', 'empty-token', 'full-class', 'empty-class', 'full-style', 'empty-style', 'tokens'];
      static updateAll = () => {
         const bars = document.querySelectorAll('pip-bar');
         if (!bars.length) onPage = 0;
         if (!onPage) return;

         bars.forEach(el => {
            setTimeout(() => {
               if (el.hasVariable) el.printValue();
            }, 20);
         });
      }
   };

   // custom elem
   customElements.define(config.name, PipBar);

   // listeners
   window.addEventListener("click", PipBar.updateAll, true);
   window.addEventListener("keypress", e => {
      if (e.key === 'Enter') PipBar.updateAll();
   }, true);

})();