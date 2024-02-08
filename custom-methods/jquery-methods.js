jQuery.fn.extend({
    //add animation class, remove it once the animation has run and run optional callback
    runAnim: function (effectName, cb) {
        return this.addClass(effectName).one('animationend', _ => {
            this.removeClass(effectName);
            if (cb) cb.call(this, this);
        });
    },
    //insert at a given index among an element's children
    insertAt: function (index, target) {
        if (typeof target === 'number') { [index, target] = [target, index] }

        const ch = target.children();
        if (index < 0) { index += ch.length }

        if (index >= ch.length) {
            target.append(this);
        } else if (ch[index]) {
            $(ch[index]).before(this);
        } else {
            target.prepend(this);
        }
        return this;
    },
    at: function (insert, index) {
        $(insert).insertAt(index, this);
        return this;
    }
});