/* Mali's <cycle-elem> custom element */

customElements.define("cycle-elem", class CharCycle extends HTMLElement {
   constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(this.inner = document.createElement('span'));
   }
   connectedCallback() {
      this.delay = Number(this.getAttribute('delay'));
      if (!this.delay || isNaN(this.delay)) this.delay = 500;

      this.items = [];
      this.childNodes.forEach(n => {
         if (n.nodeType === 3) {
            this.items.push(...[...n.textContent]);
         } else {
            this.items.push(n.textContent);
         }
      });
      this.innerHTML = '';

      let i = 0;
      this.inner.textContent = this.items[i];

      this.interval = setInterval(() => {
         const item = this.items[i = (i + 1) % this.items.length];
         this.inner.textContent = item;

      }, this.delay);
   }
   disconnectedCallback() {
      clearInterval(this.interval);
   }
});