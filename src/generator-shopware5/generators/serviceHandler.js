
const snakeCase = require('snake-case');
const helpers = require('./helpers.js');
const os = require("os");

/**
 * Adds the path paramter to the xml file
 *
 * @param pluginName string
 * @param serviceName string
 * @param folder string
**/
function addPathToXml(pluginName, serviceName, folder) {
	let file = `./${pluginName}/Resources/services.xml`;
	let path = `${pluginName}\\${folder}\\${serviceName}`;

	const results = helpers.addAfter(
		file,
		'<parameters>',
		`${os.EOL}`
			+ `\t\t<parameter key="${_createXmlId(pluginName, serviceName)}_class">${path}</parameter>`
	);

	if(!results.includes(file)) {
		this.log("Error: Can't add parameter to service xml! Please validate the service xml manually.");
	}
}

/** Adds the abstract service to the xml file
 *
 * @param pluginName string
 * @param serviceName string
 * @param injections string[]
**/
function addAbstractToXml(pluginName, serviceName, injections) {
	let file = `./${pluginName}/Resources/services.xml`;

	const results = helpers.addAfter(
		file,
		'<!-- Abstracts -->',
		`${os.EOL}`
			+ `\t\t<service id="${_createXmlId(pluginName, serviceName)}_abstract" abstract="true">${os.EOL}`
			+ injections.map(injection =>
				`\t\t\t${injection}${os.EOL}`
			).join()
			+ `\t\t</service>`
	);

	if(!results.includes(file)) {
		this.log("Error: Can't add abstract service to service xml! Please validate the service xml manually.");
	}
}

/**
 * Adds the service to the xml referencing a parent and a class.
 *
 * @param pluginName string
 * @param serviceName string 
 * @param appendAfter string 
**/
function addServiceToXml(pluginName, serviceName, appendAfter, tags) {
	let file = `./${pluginName}/Resources/services.xml`,
		xmlId = _createXmlId(pluginName, serviceName);

	const results = helpers.addAfter(
		file,
		`<!-- ${appendAfter} -->`,
		`${os.EOL}`
			+ `\t\t<service id="${xmlId}" class="%${xmlId}_class%" parent="${xmlId}_abstract">${os.EOL}`
			+ tags.map(tag =>
				`\t\t\t${tag}${os.EOL}`
			).join()
			+ `\t\t</service>`
	);

	if(!results.includes(file)) {
		this.log("Error: Can't add service to service xml! Please validate the service xml manually.");
	}
}

function _createSnakeCase(name) {
	return snakeCase.snakeCase(name).replace('Pm', '')
}

function _createXmlId(pluginName, serviceName) {
	return `pm.${_createSnakeCase(pluginName)}.${_createSnakeCase(serviceName)}`;
}

module.exports = {
	addPathToXml,
	addAbstractToXml,
	addServiceToXml
};
