//Mali's URL fixer
(() => {

	//EDIT PATHS HERE!
	const defaultFilePath = {
		local: String.raw`...C:\Users\myName\Documents\myAssets...`,
		remote: String.raw`...https://myHostingSite.com/myAssets...`
	};
	//EDIT PATHS HERE!

	if (!defaultFilePath.remote && !defaultFilePath.local) return;

	let path, tempPaths = [
		'AppData/Local', 'var/folders', '/tmp', //OS temp paths for older versions of Twine
		'Twine/Scratch' //2.8 scratch folder
	];

	if (location.origin.includes('twinery')) {//Launched from browser Twine
		if (!defaultFilePath.remote) return console.log(`No remote directory supplied, relative assets won't be available for testing.`);
		path = defaultFilePath.remote.trim();
	} else if (tempPaths.find(p => { return location.pathname.includes(p) })) {//Launched from desktop Twine
		path = defaultFilePath.local ? 'file://' + defaultFilePath.local.trim() : defaultFilePath.remote.trim();
	} else {//Local path with relative assets
		return;
	}

	path = path.replaceAll('\\', '/');
	if (path.at(-1) !== '/') path += '/';

	//build base element
	const baseElem = document.createElement('base');
	baseElem.setAttribute('href', path);
	document.head.append(baseElem);
})();
