
//nobr config/tags/macro prevents the p parsing
//remove default <br> insertion
Wikifier.Parser.delete('lineBreak');

//parse continous text that starts with anything but <
Wikifier.Parser.add({
   name: 'pWrap',
   //linestart => optional indentation => first character that's not < nor space => anything till line end
   match: '^[ \\t]*[^<\\s].+',
   profiles: ['block'],
   handler(w) {
      //ensure we wrap the passage's first line but not all first matches in async wikifier calls
      if (w.source.startsWith(w.matchText) && !Engine.isRendering()) return $(w.output).wiki('\\' + w.matchText);
      $(w.output).wiki(`<p>${w.matchText}</p>`);
   }
});
Wikifier.Parser.Profile.compile();