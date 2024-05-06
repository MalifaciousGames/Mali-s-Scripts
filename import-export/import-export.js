
window.exportFile = (data, name, type = 'text/plain', ext = 'txt') => {

   if (data == null) throw new Error(`exportFile : data is null or undefined.`);
   if (!name) throw new Error(`exportFile : missing file name.`);

   // stringify non-primitives 
   if (typeof data === 'object') data = JSON.stringify(data);

   data = new Blob([data], { type: type });
   const url = URL.createObjectURL(data);

   const a = document.createElement('a');
   a.href = url;
   a.download = `${name}.${ext}`;
   a.click();

   setTimeout(() => URL.revokeObjectURL(url), 40);

};

window.importFile = function (...args) {

   const inp = document.createElement('input'),
      attr = args.find(a => typeof a === 'object') ?? {},
      handlers = args.filter(a => typeof a === 'function'),
      processFile = function (i) {
         const reader = new FileReader();
         reader.onload = () => {
            let data;

            try {
               data = JSON.parse(reader.result);
            } catch (e) {
               data = reader.result;
            }

            handlers.forEach(hdl => hdl(data, i, this.files[i]));
         };

         reader.readAsText(this.files[i]);
      };
      
   for (const k in attr) inp[k] = attr[k];
   inp.type = 'file';

   inp.onchange = function () {
      let i = 0;
      while (i < this.files.length) {
         processFile.call(this, i++);
      }
   };
   inp.click();

};