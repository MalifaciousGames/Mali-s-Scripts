window.harloweSave = {
   extension: '.tw-save',
   ifid: $('tw-storydata').attr('ifid'),

   get fileName() {
      const [m, date, hour] = new Date().toJSON().match(/(.+)T(.+)(?=\.)/);
      return $('tw-storydata').attr('name') + '-save-' + date + '-' + hour;
   },

   export(slot, encode = true) {

      const exportWrapper = {
         ifid: this.ifid,
         slot: { name: this.fileName, label: 'Imported file' },
         state: null
      };

      if (slot && typeof slot === 'string') {

         exportWrapper.state = localStorage.getItem(`(Saved Game ${this.ifid}) ${slot}`);
         if (!exportWrapper.state) throw new Error(`No save available at slot : ${slot}.`);

         exportWrapper.slot.name = string;
         exportWrapper.slot.label = localStorage.getItem(`(Saved Game Filename ${this.ifid}) ${slot}`);

      } else {

         exportWrapper.state = State.serialise(false).pastAndPresent;
         if (!exportWrapper.state) throw new Error(`Could not serialize the current state.`);

      }

      this._expt(exportWrapper, encode);
   },

   _expt(data, encode) {

      let json = JSON.stringify(data);

      if (encode) json = btoa(json.replace(/[^\x00-\x7F]/g, m => `UNI(${m.codePointAt(0)})`));

      const url = URL.createObjectURL(new Blob([json], { type: 'text/plain' }));
      $('<a>').prop({
         href : url,
         download : this.fileName + this.extension
      })[0].click();

      setTimeout(() => URL.revokeObjectURL(url), 40);
   },

   decode (json) {

      //is encoded
      if (json[0].trim() !== '{') json = atob(json).replace(/UNI\((\d+)\)/g, (m, n) => String.fromCodePoint(n));

      let data;
      try {
         data = JSON.parse(json);
      } catch (e) {
         throw new Error(`Couldn't parse file into a usable object.`);
      }

      if (data.ifid !== this.ifid) throw new Error(`Save file comes from another game!`);

      return data;
   },

   import(toLocal = false, asSlot, withLabel) {
      const dataHandler = data => {

         const {slot, state } = this.decode(data);

         const name = asSlot ?? slot.name, label = withLabel ?? slot.label;

         if (toLocal) {
            localStorage.setItem(`(Saved Game ${this.ifid}) ${name}`, state);
            localStorage.setItem(`(Saved Game Filename ${this.ifid}) ${name}`, label);
         }

         State.deserialise(Section.create(), state);
         requestAnimationFrame(Engine.showPassage.bind(Engine, State.passage, { loadedGame: true }));

      };

      $(`<input type='file' accept=${this.extension}>`)
         .on('change', function () {
            const reader = new FileReader();
            reader.onload = () => dataHandler(reader.result);
            reader.readAsText(this.files[0]);
         })
         .click();

   }
};