/* Mali's template container */

window.TemplateContainer=class{constructor(t,e){if(!t)throw new Error(`Improper template name: '${t}'.`);if("string"!=typeof t)throw new Error(`Template name must be a string, reading '${t}'.`);this.name=t,this.def=e,this.constructor.active[t]=this}getOutput(t){const e=Array.isArray(this.def)?this.def.random():this.def;switch(typeof e){case"string":return e;case"function":return e.call(this,t)}}static add(t,e){if(Array.isArray(t))t.forEach((t=>new this(t,e)));else if("object"==typeof t)for(const e in t)new this(e,t[e]);else new this(t,e)}static delete(t){delete this.active[t]}static get(t){return this.active[t]}static has(t){return!!this.active[t]}static active={};static tryStandardTemplate(t){let e=Template.get(t);if(e)switch(e instanceof Array&&(e=e.random()),typeof e){case"string":return e;case"function":return stringFrom(e.call({name:t}))}}},Wikifier.Parser.add({name:"templateContainer",match:"\\?\\(\\w*?:.*?\\)",handler:({matchText:t,output:e})=>{let[r,i]=t.match(/\?\((\w*?):(.*?)\)/).slice(1),a=TemplateContainer.get(r);if(!r)return throwError(e,"Template container is missing its name.",t);if(a)$(e).wiki(a.getOutput(i));else{const a=TemplateContainer.tryStandardTemplate(r);if(null==a)return throwError(e,`No template name found for : '${r}'`,t);let n=$(new DocumentFragment).wiki(a)[0];1===n.firstChild.nodeType&&(n=n.firstChild),$(e).append($(n).wiki(i))}}});