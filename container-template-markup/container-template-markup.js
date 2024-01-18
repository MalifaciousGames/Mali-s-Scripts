/* Mali's template container */
/* $(name: content) */

window.TemplateContainer = class TemplateContainer {

    constructor(n, def) {
        if (!n) throw new Error(`Improper template name: '${n}'.`);
        if (typeof n !== 'string') throw new Error(`Template name must be a string, reading '${n}'.`);

        this.name = n;
        this.def = def;
        this.constructor.active[n] = this;
    }

    getOutput(match) {
      	const d = Array.isArray(this.def) ? this.def.random() : this.def;

        switch (typeof d) {
            case 'string': return d;
            case 'function': return d.call(this, match);
        }
    }

    static add(n, def) {
        if (Array.isArray(n)) {
            n.forEach(n => new this(n, def))
        } else if (typeof n === 'object') {
            for (const k in n) new this(k, n[k]);
        } else {
            new this(n, def);
        }
    }
  
	static delete(name) {delete this.active[name]}
  	static get(name) {return this.active[name]}
  	static has(name) {return !!this.active[name]}
  	
    static active = {};
    static tryStandardTemplate(name) {
        let temp = Template.get(name);
        if (!temp) return;

      	if (temp instanceof Array) temp = temp.random();
        switch (typeof temp) {
            case 'string': return temp;
            case 'function': return stringFrom(temp.call({ name }));
        }
    }
};

Wikifier.Parser.add({
    name: 'templateContainer',
    match: '\\?\\(\\w*?:.*?\\)',
    handler: ({ matchText: m, output: o }) => {
        let [name, txt] = m.match(/\?\((\w*?):(.*?)\)/).slice(1), template = TemplateContainer.get(name);

        if (!name) return throwError(o, 'Template container is missing its name.', m);

        if (!template) {
            const output = TemplateContainer.tryStandardTemplate(name);
            if (output == null) return throwError(o, `No template name found for : '${name}'`, m);
			
          	let frag = $(new DocumentFragment()).wiki(output)[0];
          	if (frag.firstChild.nodeType === 1) frag = frag.firstChild;
            $(o).append($(frag).wiki(txt));
        } else {
            $(o).wiki(template.getOutput(txt));
        }
    }
});