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

      static observedAttributes = ['randomize', 'angle'];
      attributeChangedCallback(n, o, value) {

         switch (n) {
            case 'angle': return this.style.rotate = value;
            case 'randomize':
               // attribute is removed but we can't easily un-randomize
               if (value == null) return;

               if (value === '' || value.includes('all')) {
                  this.randomize();
               } else {
                  this.randomize(value.includes('color'), value.includes('angle'));
               }
         }

      }

   };

   customElements.define('sticky-note', Sticky);

};