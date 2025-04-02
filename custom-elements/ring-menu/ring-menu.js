/* Mali's ring menu element */

customElements.define("ring-menu", class RingMenu extends HTMLElement {

   constructor() {
      super();

      this.resizeObs = new ResizeObserver(this.placeChildren.bind(this));
      this.resizeObs.observe(this);

      this.mutationObs = new MutationObserver(this.placeChildren.bind(this));
      this.mutationObs.observe(this, { childList: true });
   }

   placeChildren() {

      const [h, w] = [this.clientHeight, this.clientWidth],
         sp = Math.PI * 2 / this.children.length;

      // offset so the first element is on top
      let rad = - Math.PI / 2;

      for (const child of this.children) {
         const x = Math.cos(rad) * (w / 2), y = Math.sin(rad) * (h / 2);

         child.style.translate = `${x}px ${y}px`;
         // increment the radian offset
         rad += sp;
      }
   }

   static observedAttributes = ['height', 'width'];

   attributeChangedCallback(n, o, v) {

      // missing css unit, treat it as px
      if (v && /\d$/.test(v.trim())) v += 'px';
      
      this.style[n] = v;
   }

   disconnectedCallback() {
      this.resizeObs.disconnect();
      this.mutationObs.disconnect();
   }
});