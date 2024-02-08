//cross check arrays against each others
Object.defineProperty(Array.prototype, 'crossFind', {
    configurable: true,
    writable: true,
    value(...args) {
        const values = args.flat();
        return this.find(e => values.includes(e));
    }
});