window.exportFile = (data, name = 'saved-as-file', type = 'text/plain', ext = 'txt') => {

   // stringify non-primitives 
   if (typeof data === 'object') data = JSON.stringify(data);

   data = new Blob([data], { type: type });
   const url = URL.createObjectURL(data);

   const a = document.createElement('a');
   a.href = url;
   a.download = name + '.' + ext;
   a.click();

   setTimeout(() => URL.revokeObjectURL(url), 40);

};

window.importFile = function(...args) {

   const inp = document.createElement('input');
   inp.type = 'file';
   inp.accept = args.find(a => typeof a === 'string');

   inp.onchange = function() {

      const reader = new FileReader();
      reader.readAsText(this.files[0]);
      reader.onload = () => {
         args.filter(a => typeof a === 'function').forEach(cb => cb(reader.result));
      };
   };
   inp.click();

};