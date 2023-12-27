/* Script passages */

(() => {
    const tagName = 'script';// <== You can change the name of the tag here

    [...document.querySelectorAll(`tw-passagedata[tags*=${tagName}]`)]
        .sort((a, b) => a.getAttribute("name").localeCompare(b.getAttribute("name")))
        .forEach(psg => {
            try {
                eval(psg.innerText);
            } catch (e) {
                throw new Error(`Error in script passage: ${psg.getAttribute("name")}`);
            }
        });
})();

/* Style passages */

(() => {
    const tagName = 'style'; // <== You can change the name of the tag here

    document.querySelectorAll(`tw-passagedata[tags*=${tagName}]`).forEach(psg => {
        let sheet = document.createElement('style'),
            inner = psg.innerText.replace(/\${.+}/gm, m => eval(m.slice(2, -1)));
        sheet.setAttribute('name', psg.getAttribute("name"));
        sheet.append(inner);
        document.head.appendChild(sheet);
    });
})();