// Mali's URL fixer
window.setPath=e=>{const t=e.startsWith("http");if(!["AppData/Local","var/folders","/tmp","Twine/Scratch","twinery"].find((e=>location.href.includes(e))))return;if(!e)return;if(location.origin.includes("twinery")){if(!t)return}else t||(e="file://"+e);"/"!==(e=e.replaceAll("\\","/")).at(-1)&&(e+="/");const n=document.createElement("base");n.setAttribute("href",e),document.head.append(n),[...document.getElementsByTagName("style")].forEach((e=>e.innerText=e.innerText))};

// SUPPLY YOUR OWN URL HERE !
// remember to turn '\' into '/' 
setPath('C:/Maliface/Documents/fake/folder/media');
// SUPPLY YOUR OWN URL HERE !