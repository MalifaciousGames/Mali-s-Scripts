/* Mali's save system for Chapbook */
; {
window.SaveSystem={getFileName(e){let t=engine.story.name()+"-save";switch(typeof this.config.fileName){case"string":t=this.config.fileName;break;case"function":t=this.config.fileName.call(null,e)}return this.config.withTimeStamp&&(t+=this.makeTimestamp()),t},makeTimestamp(){const[e,t,a]=(new Date).toJSON().match(/(.+)T(.+)(?=\.)/);return t+"-"+a},lastState:null,currentState:engine.state.saveToObject(),export(){const e={game:{ifid:engine.story.ifid(),version:this.config.version},state:this.lastState??this.currentState??engine.state.saveToObject(),chapbook:{version:engine.version}};e.state.trail??=[],e.state.trail.push(engine.state.get("trail").at(-1)),"function"==typeof this.config.metadata?e.metadata=this.config.metadata.call(null,e):this.config.metadata&&(e.metadata=this.config.metadata);let t=JSON.stringify(e);this.config.encoded&&(t=btoa(t.replace(/[^\x00-\x7F]/g,(e=>`u<(${e.codePointAt(0)}>`))));const a=URL.createObjectURL(new Blob([t],{type:"text/plain"})),n=document.createElement("a");n.href=a,n.download=this.getFileName()+this.config.extension,n.click(),requestAnimationFrame((()=>URL.revokeObjectURL(a)))},import(){const e=document.createElement("input");e.type="file",e.accept=this.config.extension,e.onchange=()=>{const t=new FileReader;t.onload=()=>this.saveHandler(t.result),t.readAsText(e.files[0])},e.click()},saveHandler(e){let t;"{"!==e.trim()[0]&&(e=atob(e).replace(/u<(\d+)>/g,((e,t)=>String.fromCodePoint(t))));try{t=JSON.parse(e)}catch(e){return alert("Save file could not be parsed into a usable object, sorry.")}const{game:a,state:n,chapbook:i}=t;if(!n)return alert("Save file is lacking a state object, something went very wrong.");if(a.ifid!==engine.story.ifid())return alert("Save file does not come from this game.");if(i.version!==engine.version&&this.config.engineUpdaters?.length)for(const e of this.config.engineUpdaters)e.call(null,t,i.version,engine.version);if(a.version!==this.config.version&&this.config.gameUpdaters?.length)for(const e of this.config.gameUpdaters)e.call(null,t,a.version,this.config.version);try{engine.state.restoreFromObject(n)}catch(e){return alert("Chapbook was unable to restore the saved state, this is an internal error.")}}},engine.extend("2.0.0",(()=>{window.addEventListener("body-content-change",(()=>{SaveSystem.lastState=structuredClone(SaveSystem.currentState),SaveSystem.currentState=engine.state.saveToObject()})),window.addEventListener("click",(e=>{const t=e.target.getAttribute("data-save");t&&SaveSystem[t]()})),engine.template.inserts.add({match:/^load save/i,render:e=>`<a class="link" tabindex="0" role="link" data-save="import">${e||"Load from file"}</a>`}),engine.template.inserts.add({match:/^save to file/i,render:e=>`<a class="link" tabindex="0" role="link" data-save="export">${e||"Save to file"}</a>`})}));

   window.SaveSystem.config = {
      fileName: null, // a string or function that returns one
      withTimeStamp: true, // the file name ends with a timestamp
      extension: '.tw-save', // the file's extension
      encoded: true, // whether the save is encoded to base64 (larger but not human-readable)
      version: null, // the game version, can be anything
      metadata: null, // arbitrary data or a function that returns it

      // where you put callbacks responsible for updating saves from older versions of CHAPBOOK
      engineUpdaters: [],

      // where you put callbacks responsible for updating saves from older GAME versions
      gameUpdaters: []
   }
};
/* End of save system */