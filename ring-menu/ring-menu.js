/* Mali's ring menu element */

customElements.define("ring-menu", class RingMenu extends HTMLElement {

   connectedCallback() {
      this.pointing = this.getAttribute('pointing');

      // we re-place the elements when the container is resized, or another child is added
      new ResizeObserver(this.placeChildren.bind(this)).observe(this);
      new MutationObserver(this.placeChildren.bind(this)).observe(this, { childList: true });
   }

   placeChildren() {

      const [h, w] = [this.clientHeight, this.clientWidth],
         sp = Math.PI * 2 / this.children.length;

      // offset so the first element is on top
      let rad = - Math.PI / 2;

      for (const child of this.children) {
         const x = Math.cos(rad) * (w / 2), y = Math.sin(rad) * (h / 2);

         child.style.translate = `${x}px ${y}px`;
         if (this.pointing) child.style.rotate = rad + Math.PI / 2 + 'rad';

         // increment the radian offset
         rad += sp;
      }
   }
});