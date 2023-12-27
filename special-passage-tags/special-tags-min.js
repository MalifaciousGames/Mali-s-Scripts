/* Mali's special passage tags */
(() => {
    const scriptName = 'script', styleName = 'style';// <== You can change the name of the tag here

    [...document.querySelectorAll(`tw-passagedata[tags*=${scriptName}]`)].sort(((e,t)=>e.getAttribute("name").localeCompare(t.getAttribute("name")))).forEach((psg=>{try{eval(psg.innerText)}catch(e){throw new Error(`Error in script passage: ${psg.getAttribute("name")}`)}})),document.querySelectorAll(`tw-passagedata[tags*=${styleName}]`).forEach((psg=>{let sheet=document.createElement("style"),inner=psg.innerText.replace(/\${.+}/gm,(m=>eval(m.slice(2,-1))));sheet.setAttribute("name",psg.getAttribute("name")),sheet.append(inner),document.head.appendChild(sheet)}));
})();