// removes end/start characters : <string>.snip(fromStart [, fromEnd])
Object.defineProperty(String.prototype, 'snip', {
    value(v = 0, vv = v) {
        return this.substring(v, this.length - vv);
    }
});

Object.defineProperty(String.prototype, 'includesAny', {
	configurable : true,
	writable     : true,
	value() {
    	return Array.from(arguments).some(e => this.includes(e));
    }
});

Object.defineProperty(String.prototype, 'includesAll', {
	configurable : true,
	writable     : true,
	value() {
    	return Array.from(arguments).every(e => this.includes(e));
    }
});

Object.defineProperty(String.prototype, 'startsWithAny', {
	configurable : true,
	writable     : true,
	value() {
    	return Array.from(arguments).some(e => this.startsWith(e));
    }
});

Object.defineProperty(String.prototype, 'endsWithAny', {
	configurable : true,
	writable     : true,
	value() {
    	return Array.from(arguments).some(e => this.endsWith(e));
    }
});

Object.defineProperty(String.prototype, 'removeEvery', {
	configurable : true,
	writable     : true,
	value() {
      	let output = this;
    	Array.from(arguments).forEach(e => output = output.replace(e,''));
      	return output;
    }
});

Object.defineProperty(String.prototype, 'sanitize', {
	configurable : true,
	writable     : true,
	value() {
      	const repRef = [
      		['>','&gt;'],
      		['<','&lt;'],
        	['[','&lbrack;'],
        	[']','&rbrack;'],
        	['$','&dollar;'],
        	['_','&lowbar;']
        ];
      	let output = this;
      	repRef.forEach(p => {
        	output = output.replaceAll(p[0],p[1]);
        }) 
    	return output;
    }
});

Object.defineProperty(String.prototype, 'insert', {
	configurable : true,
	writable : true,
	value(txt,at) {
    	return this.substring(0,at)+txt+this.substring(at);
    }
});

//capitalize the first letter of every word
Object.defineProperty(String.prototype, 'toWordUpperFirst', {
	configurable : true,
	writable : true,
	value() {
        return this.replace(/\p{L}+/gu, w => w[0].toUpperCase() + w.substring(1)); 
    }
});