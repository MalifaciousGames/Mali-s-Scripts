Wikifier.Parser.add({
    name: 'swapMarkup',
    match: '\\(.*?\\|.*?\\)',
    handler: ({ matchText: m, output: o }) => {
        let acc = 0, entries = m.substring(1, m.length - 1).split('|').map((e, i) => {
            let hasOdd = e.match(/^(\d*\.*\d+)(?=:)/), odd = 1, txt = e;
            if (hasOdd) {
                odd = Number(hasOdd[0]);
                txt = txt.slice(hasOdd[0].length + 1);
            }
            odd = acc += odd;
            return { odd, txt };
        });

        return $(o).wiki(entries.find(e => e.odd > randomFloat(acc)).txt);
    }
});