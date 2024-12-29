/* Mali's arrow-box custom element */

; (() => {

   window.ArrowBox = class extends HTMLElement {

      static config = {
         symbols: {
            prev: '<',
            next: '>'
         }
      };

      constructor() {
         super();

         const prevButton = document.createElement('button');
         prevButton.innerHTML = this.constructor.config.symbols.prev;
         prevButton.setAttribute('tabindex', -1);
         prevButton.addEventListener('click', () => {
            this.select(this.valueIndex - 1);
         });

         const nextButton = document.createElement('button');
         nextButton.innerHTML = this.constructor.config.symbols.next;
         nextButton.setAttribute('tabindex', -1);
         nextButton.addEventListener('click', () => {
            this.select(this.valueIndex + 1);
         });

         const innerField = document.createElement('span');

         this.innerField = innerField;

         // arrow keys
         this.addEventListener('keyup', e => {
            switch (e.key) {
               case 'ArrowLeft': case 'ArrowUp': return this.select(this.valueIndex - 1);
               case 'ArrowRight': case 'ArrowDown': return this.select(this.valueIndex + 1);
            }
         });

         // scroll
         this.addEventListener('wheel', e => {
            this.select(this.valueIndex + (e.deltaY < 0 ? 1 : -1));
            e.preventDefault();
         });

         this.valueIndex = 0;

         // init tasks
         requestAnimationFrame(() => {
            this.append(prevButton, innerField, nextButton);

            this.setAttribute('tabindex', 0);

            const options = this.options;

            // size inner field to longest available option
            if (options.length) {
               const longest = options.sort((a, b) => b.textContent.length - a.textContent.length)[0];
               this.innerField.style['min-width'] = longest.textContent.length + 'ch';
            }

            if (this.value) return this.innerField.innerHTML = this.value;

            let index = options.findIndex(o => o.selected);
            if (index === -1) index = 0;
            this.select(index);

         });
      }

      get options() {
         const children = [...this.children];

         // has a datalist id, fetch options from there too
         if (this.fromList) {
            const list = document.getElementById(this.fromList);

            if (list) children.push(...list.children);
         }

         return children.filter(c => c.tagName === 'OPTION' && !c.disabled);
      }

      get selected() {
         return this.options[this.valueIndex];
      }

      select(index = this.valueIndex) {

         const options = this.options;

         if (!options.length) return;

         while (index < 0) index += options.length;
         index = index % options.length;

         const selected = this.options[index];

         if (!selected) throw new Error('No option at index ' + index);

         this.valueIndex = index;

         this.setValue(selected.value ?? selected.textContent);
         this.innerField.innerHTML = selected.textContent || selected.value;

      }

      setValue(val, withEvent = true) {
         val = this.enforceType(val);

         this.value = val;

         if (!withEvent) return;

         const event = new CustomEvent(
            'change',
            {
               detail: {
                  value: this.value,
                  index: this.valueIndex
               }
            }
         );

         this.dispatchEvent(event);
      }

      makeEditable() {

         this.editable = true;

         this.innerField.setAttribute('tabindex', 0);
         this.innerField.setAttribute('contenteditable', true);
         this.innerField.setAttribute('spellcheck', false);

         this.innerField.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === 'Escape') {
               this.focus();
               this.setValue(this.innerField.textContent);
               return false;
            }

            // prevent letters in number-only mode
            if (this.type === 'number' && e.key.length === 1 && !/[0-9\._]/.test(e.key)) {
               e.preventDefault();
               return false;
            }

         }, true);

         this.innerField.addEventListener('focusout', () => this.setValue(this.innerField.textContent));

         this.innerField.addEventListener('keyup', e => {
            e.stopImmediatePropagation();

            const targetOption = this.selected, content = e.target.textContent;

            if (targetOption) {
               targetOption.value = targetOption.innerHTML = content;
            } else {
               // in case there are not option elements we write to value directly
               this.setValue(content, false);
            }

            this.innerField.style['min-width'] = content.length + 'ch';
         });

      }

      enforceType(value) {
         if (!this.type || this.type === 'string') return value;

         try {

            switch (this.type) {
               case 'number': return Number(value);
               case 'json': return JSON.parse(value);
               case 'eval': return eval(value);
            }

         } catch (e) {
            // input coercion threw an exception, set to null instead
            return null;
         };

      }
      static observedAttributes = ['value', 'type', 'editable', 'list'];
      attributeChangedCallback(name, o, value) {

         switch (name) {
            case 'value':
               //find matching option
               const found = this.options.findIndex(c => c.value === value || c.textContent === value);
               return (found !== -1) ? this.select(found) : this.setValue(value);
            case 'editable':
               return (value === null) ? false : this.makeEditable();
            case 'type':
               return this.type = value?.toLowerCase();
            case 'list':
               this.fromList = value;
         }

      }

   };

   customElements.define('arrow-box', window.ArrowBox);

})();

/* End of arrow-box custom element */