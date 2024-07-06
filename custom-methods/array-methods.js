
//cross check arrays against each others
Object.defineProperty(Array.prototype, 'crossFind', {
    configurable: true,
    writable: true,
    value(...args) {
        const values = args.flat();
        return this.find(e => values.includes(e));
    }
});

// quick filtering based on data type

Object.defineProperty(Array.prototype, 'ofType', {
    configurable: true,
    writable: true,
    value(...args) {
        return this.filter(e => args.includes(typeof e));
    }
});

// push elements as many time as the last integer value 

Object.defineProperty(Array.prototype, 'pushMany', {
    configurable: true,
    writable: true,
 
    value(...args) {
       
       if (args.length < 2) throw new Error(`<array>.pushMany() : Must be called with at least one element and a positive integer.`);
 
       const items = args.slice(0, -1), n = args.at(-1);
 
       if (typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n < 0) throw new Error(`<array>.pushMany() : Last argument must be a positive integer.`);
 
       for (const item of items) {
          let i = n;
          while (i--) this.push(item);
       }
 
       return this;
    }
 });