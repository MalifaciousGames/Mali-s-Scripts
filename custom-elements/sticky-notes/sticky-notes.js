; {

   const Sticky = class extends HTMLElement {
      constructor() {
         super();

         this.unstickButton = document.createElement('a');

         this.unstickButton.classList.add('unstick');
         this.unstickButton.setAttribute('tabindex', 0);

         this.unstickButton.addEventListener('click', () => {
            this.unstick();
         });

      }

      randomize(color = true, angle = true) {

         if (color) {
            this.classList.add(['red', 'green', 'pink', 'yellow', 'blue'][Math.floor(5 * Math.random())]);
         }

         if (angle) {
            this.style.rotate = `${40 * Math.random() - 20}deg`;
         }

      }

      unstick() {
         this.addEventListener('animationend', () => this.remove());
         this.classList.add('sticky-fall');

         if (this.style.rotate.startsWith('-')) {
            this.classList.add('fall-left');
         } else {
            this.classList.add('fall-right');
         }

      }

      connectedCallback() {
         this.prepend(this.unstickButton);
      }

   };

   customElements.define('sticky-note', Sticky);

};