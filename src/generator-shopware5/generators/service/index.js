'use strict';

const fs = require('fs');
const Generator = require('yeoman-generator');
const helpers = require('./../helpers.js');
const serviceHandler = require('./../serviceHandler.js');

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
			...helpers.enrichAnswers(this.answers, this.answers.pluginName)
		};
	}

	addPathToXml() {
		serviceHandler.addPathToXml(
			this.answers.pluginName,
			this.answers.serviceName,
			'Components'
		);
	}

	addAbstractToXml() {
		let injections = this.answers.injectModels
			? ['<argument type="service" id="models"/>']
			: [];

		serviceHandler.addAbstractToXml(
			this.answers.pluginName,
			this.answers.serviceName,
			injections
		);
	}

	addServiceToXml() {
		serviceHandler.addServiceToXml(
			this.answers.pluginName,
			this.answers.serviceName,
			'Services',
			[]
		);
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
};
