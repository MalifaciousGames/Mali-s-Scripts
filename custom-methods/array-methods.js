
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