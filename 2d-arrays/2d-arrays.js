// Mali's 2D arrays utility class

window.Array2D = class Array2D extends Array {
   constructor() {
      super();

      if (typeof arguments[0] === 'number') {//from dimensions

         let [y, x = y, gen = null] = arguments;
         if (arguments.length === 2) {
            gen = arguments[1];
            x = y;
         }
         this.fromDimensions(y, x, gen);

      } else if (typeof arguments[0] === 'string') {//from string pattern

         this.fromPattern(...arguments);

      } else if (arguments[0] instanceof this.constructor) {//from array (revive)

         Object.assign(this, arguments[0]);

      }
   }

   fromPattern(
      pattern, gen,
      rows = this.constructor.defaultSeparators.row,
      chars = this.constructor.defaultSeparators.char
   ) {

      let cb;
      if (gen != null) {
         switch (typeof gen) {
            case 'object': cb = v => gen.hasOwnProperty(v) ? gen[v] : v; break; //a lookup object
            case 'function': cb = gen; break; //already a callback
            default: cb = () => gen; //primitive
         };
      }

      //build
      pattern.split(rows).forEach((r, y) => {
         this[y] = r.split(chars).map((v, x) => cb ? cb.call(this, v, x, y) : v);
      });

   }

   fromDimensions(height, width = height, generator) {
      for (let y = 0; y < height; y++) {
         const row = this[y] = [];
         for (let x = 0; x < width; x++) {
            row[x] = typeof generator === 'function' ? generator.call(this, x, y) : generator;
         }
      }
   }

   print(
      rowCut = this.constructor.defaultSeparators.row,
      valueCut = this.constructor.defaultSeparators.char, wrap
   ) {
      let output = '';

      this.forEach(row => {
         if (wrap) output += rowCut;
         row.forEach(v => output += (wrap ? valueCut : '') + v + valueCut);
         output += rowCut;
      });

      return output;
   }
   toHTML(
      rowContainer = this.constructor.HTMLWrappers.row,
      valContainer = this.constructor.HTMLWrappers.cell,
      mainContainer = this.constructor.HTMLWrappers.main
   ) {
      const $output = $(mainContainer);

      this.forEach(row => {
         const $row = $(rowContainer).appendTo($output);
         row.forEach(v => $(valContainer).text(v).appendTo($row));
      });

      return $output[0];
   }
   clone() {
      return new Array2D(this);
   }
   toJSON() {
      return JSON?.reviveWrapper('new Array2D($ReviveData$)', [...this]);
   }

   static HTMLWrappers = { row: '<tr>', cell: '<td>', main: '<table>' };
   static defaultSeparators = { row: '\n', char: '' };
};