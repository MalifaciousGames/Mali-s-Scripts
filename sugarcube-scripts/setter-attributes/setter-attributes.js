/* Mali's setter attributes for SugarCube */
; {

   const splitVars = t => {
      if (!t) return [];
      return t.split(/\s|,/g).filter(v => v);
   };

   window.addEventListener('change', ev => {
      const varNames = splitVars(ev.target.getAttribute('data-variable')), settingNames = splitVars(ev.target.getAttribute('data-setting'));

      let { value, type } = ev.target;
      if (type === 'number' || type === 'range') value = Number(value);

      for (const v of varNames) State.setVar(v, value);

      for (const s of settingNames) Setting.setValue(s, value);

   }, { capture: true });

};
