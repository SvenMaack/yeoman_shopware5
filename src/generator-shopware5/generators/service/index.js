'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
const helpers = require('./../helpers.js');
const os = require("os");
const snakeCase = require('snake-case');

module.exports = class extends Generator {
	 async prompting() {
		this.answers = await this.prompt([
		 	{
		    	type: "input",
		    	name: "pluginName",
		    	message: "plugin name",
		    	default: this.appname, // Default to current folder name
		    	store: true
		  	},
		 	{
		    	type: "input",
		    	name: "serviceName",
		    	message: "service name"
		  	},
		    {
		        type: "confirm",
		        name: "injectModels",
		        message: "Would you like to inject models?"
		    }
		]);
	}

	init() {
		this.answers = {
			...helpers.enrichAnswers(this.answers, this.answers.pluginName),
			serviceNameSnake: snakeCase.snakeCase(this.answers.serviceName).replace('Pm', '')
		};
	}

	addPathToXml(folder = 'Components') {
		let file = `./${this.answers.pluginName}/Resources/services.xml`;
		let path = `${this.answers.pluginName}\\${folder}\\${this.answers.serviceName}`;

		const results = helpers.replace(
			file,
			/<parameters>/g,
			`<parameters>${os.EOL}`
				+ `\t\t<parameter key="${this._createXmlId()}_class">${path}</parameter>`
		);
		if(!results.includes(file)) {
			this.log("Error: Can't add parameter to service xml! Please validate the service xml manually.");
		}
	}

	addAbstractToXml(addInjections = true) {
		let file = `./${this.answers.pluginName}/Resources/services.xml`;
		let injection = this.answers.injectModels && addInjections
			? `\t\t\t<argument type="service" id="models"/>${os.EOL}` 
			: ``;

		const results = helpers.addAfter(
			file,
			'<!-- Abstracts -->',
			`${os.EOL}`
				+ `\t\t<service id="${this._createXmlId()}_abstract" abstract="true">${os.EOL}`
				+ injection
				+ `\t\t</service>`
		);
		if(!results.includes(file)) {
			this.log("Error: Can't add abstract service to service xml! Please validate the service xml manually.");
		}
	}

	addServiceToXml(appendAfter = 'Services', content = '') {
		let file = `./${this.answers.pluginName}/Resources/services.xml`;

		const results = helpers.addAfter(
			file,
			`<!-- ${appendAfter} -->`,
			`${os.EOL}`
				+ `\t\t<service id="${this._createXmlId()}" class="%${this._createXmlId()}_class%" parent="${this._createXmlId()}_abstract">${os.EOL}`
				+ (content.length > 0 ? `\t\t\t${content}` : ``)
				+ `\t\t</service>`
		);
		if(!results.includes(file)) {
			this.log("Error: Can't add service to service xml! Please validate the service xml manually.");
		}
	}

	addServiceFile() {
		this.fs.copyTpl(
			this.templatePath('_Service.php'), 
			this.destinationPath(`./${this.answers.pluginName}/Components/${this.answers.serviceName}.php`), 
			this.answers
		);
	}

	addServiceFileInterface() {
		this.fs.copyTpl(
			this.templatePath('_ServiceInterface.php'), 
			this.destinationPath(`./${this.answers.pluginName}/Components/${this.answers.serviceName}Interface.php`), 
			this.answers
		);
	}



	_createXmlId() {
		return `pm.${this.answers.pluginNameSnake}.${this.answers.serviceNameSnake}`;
	}
};
