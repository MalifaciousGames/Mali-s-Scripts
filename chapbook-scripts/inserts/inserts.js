// Mali's Chapbook inserts

engine.extend('2.0.0', () => {

   // variable setter
   engine.template.inserts.add({
      name: 'set',
      syntax: '{set _variable_ : _value_}',
      description: 'Set variables outside of the var section.',
      completions: 'set',

      arguments: {
         firstArgument: {
            required: true,
            placeholder: 'value'
         }
      },

      match: /^set/i,
      render: (f, p, invocation) => {

         let varName, value;
         invocation.replace(/set\s+(.+?)\s*:(.+)/, (_, vn, vl) => {
            varName = vn.trim();
            value = vl.trim();
         });

         // object syntax : 'obj{key : value}'
         const objMatcher = /obj({.+})/;
         if (typeof value === 'string' && objMatcher.test(value)) {

            value = '(' + value.replace(objMatcher, (_, inner) => inner).slice(1, -1) + ')';
            console.log('obj syntax', value);
         }

         engine.state.set(varName, eval(value));
      }
   });

   // expression printing
   engine.template.inserts.add({
      name: '=',
      syntax: '{= _expression_}',
      description: 'Prints expressions.',
      completions: '=',

      match: /^=/i,
      render: (f, p, invocation) => eval(invocation.slice(1))
   });


});

