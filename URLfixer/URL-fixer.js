// Mali's URL fixer
window.setPath = url => {

	const twUrls = [
		'AppData/Local', 'var/folders', '/tmp', //OS temp paths for older versions of Twine
		'Twine/Scratch', //2.8 scratch folder
		'twinery' //website
	], hotUrl = url.startsWith('http');

	// not a twine launch
	if (!twUrls.find(p => location.href.includes(p))) return;

	if (!url) return console.warn(`No path URL supplied.`);

	if (location.origin.includes('twinery')) {
		// browser twine
		if (!hotUrl) return console.warn(`No remote directory supplied, relative assets won't be available for testing.`);
	} else if (!hotUrl) {
		// desktop app and local path
		url = 'file://' + url;
	}

	url = url.replaceAll('\\', '/');
	if (url.at(-1) !== '/') url += '/';

	//build base element
	const base = document.createElement('base');
	base.setAttribute('href', url);
	document.head.append(base);

	//reload stylesheets
	[...document.getElementsByTagName('style')].forEach(e => e.innerText = e.innerText);

};

// SUPPLY YOUR OWN URL HERE !
// remember to turn '\' into '/' 
setPath('C:/Maliface/Documents/fake/folder/media');
// SUPPLY YOUR OWN URL HERE !