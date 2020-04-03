
var snakeCase = require('snake-case');
const replaceLib = require('replace-in-file');

/**
 * Enriches the answers with the date option and the plugin name in snakeCase.
 *
 * @param answers object
 * @param pluginName string 
**/
function enrichAnswers(answers, pluginName = '') {
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = ("0" + date_ob.getMinutes()).slice(-2);

	return { 
		...answers, 
		time: `${hours}:${minutes}`, 
		date: `${date}.${month}.${year}`,
		pluginNameSnake: snakeCase.snakeCase(pluginName)
	}
}

/**
 * Replaces all occurences from 'from' to 'to'
 * @param from string|array 
 * @param to string|array 
 * @param files string|array 
**/
function replace(files, from, to) {
	const options = {
		files: files,
		from: from,
		to: to,
	};
	return replaceLib.sync(options)
	.filter(result => result.hasChanged)
  	.map(result => result.file);
}

function addAfter(file, after, add) {
	return replace(
		file,
		after,
		after + add
	);
}

module.exports = {
	enrichAnswers,
	replace,
	addAfter
} ;
