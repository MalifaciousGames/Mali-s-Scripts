; {

   // ContextMenuOverride

   const CMO = {
      t8nLength: 300, // this value needs to match #override-menu's CSS transition!
      alwaysOverride: true, // prevent standard context menu from showing even if no items can be displayed
      items: [],

      handler(event) {

         const toDisplay = this.items.filter(i => i.canDisplay(event, event.target));

         if (toDisplay.length) {

            if (this.isOpen) {
               this.menu.style.height = 0; // collapse open one

               setTimeout(() => {

                  this.inner.innerHTML = '';
                  this.displaySequence(event, toDisplay);

               }, this.t8nLength * .5);

            } else {
               this.displaySequence(event, toDisplay);
            }

            event.preventDefault();

         } else if (this.alwaysOverride) {
            event.preventDefault();
         }

      },

      displaySequence(event, items) {
         const { x, y } = event;

         // populate
         for (const item of items) this.inner.appendChild(item.print(event));

         // open and place menu
         this.openMenu(x, y);
      },

      openMenu(x, y) {

         this.isOpen = true;

         this.menu.style.display = 'unset';

         this.menu.style.top = y + 'px';
         this.menu.style.left = x + 'px';

         this.inner.focus();
      },

      closeMenu() {
         this.isOpen = false;

         this.menu.style.height = 0;

         setTimeout(() => {
            this.inner.innerHTML = '';
            this.menu.style.display = 'none';
         }, this.t8nLength)

      },

      init() {

         // build menu
         this.menu = document.createElement('div');
         this.menu.id = 'override-menu';

         // click events inside the menu itself cannot be caught
         this.menu.addEventListener('contextmenu', e => e.stopPropagation());
         this.menu.addEventListener('click', e => e.stopPropagation());

         this.menu.appendChild(this.inner = document.createElement('span'));

         const resizer = new MutationObserver(() => {
            this.menu.style.height = this.inner.clientHeight + 'px';
         });

         resizer.observe(this.inner, { childList: true, subtree: true, attributes: true });

         document.body.appendChild(this.menu);

         // window level listeners
         window.addEventListener('contextmenu', e => this.handler(e));
         window.addEventListener('click', e => this.closeMenu());

      },

      Item: class CMOItem {
         constructor(def) {

            const { html, condition, handler, selector } = def;

            this.wrapper = document.createElement('div');
            this.wrapper.classList.add('menu-item-wrapper');

            this.html = html;

            if (handler) {
               this.wrapper.addEventListener('click', handler);
            }

            this.condition = condition;
            this.selector = selector;
         }

         // decide if 
         canDisplay(event, target) {

            if (this.selector && !target.matches(this.selector)) return false;

            if (this.condition == null) return true;

            switch (typeof this.condition) {
               case 'string': return eval(this.condition);
               case 'function': return this.condition(event, event.target);
               default: return this.condition;
            }

         }

         print(event) {
            let out = this.html;

            if (typeof this.html === 'function') out = this.html.call(this, event);

            switch (typeof out) {
               case 'string': this.wrapper.innerHTML = out; return this.wrapper;
               case 'object': // some kind of node collection, array, whatever...
                  this.wrapper.innerHTML = '';
                  for (const el of Object.values(out)) this.wrapper.appendChild(el);
                  return this.wrapper;
            }

         }

         attach() {
            if (!CMO.items.includes(this)) CMO.items.push(this);
         }

         detach() {
            const i = CMO.items.indexOf(this);
            if (i > -1) CMO.items.splice(i, 1);
         }

      }
   };

   // init when DOM is loaded
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => CMO.init(), { once: true });
   } else {
      CMO.init();
   }

   // exporting
   window.CMO = CMO;
};
