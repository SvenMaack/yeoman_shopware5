'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs'); 
const helpers = require('./../helpers.js');

module.exports = class extends Generator {
	 async prompting() {
		this.answers = await this.prompt([
		 	{
		    	type: 'input',
		    	name: 'pluginName',
		    	message: 'Name of the plugin.',
		    	default: this.appname, // Default to current folder name
		    	store: true
		  	},
		 	{
		    	type: 'input',
		    	name: 'minVersion',
		    	message: 'minimal shopware version',
		    	default: '5.6.4',
		    	store: true
		  	},
		]);
	}

	init() {
		this.answers = {
			...helpers.enrichAnswers(this.answers, this.answers.pluginName)
		};
	}

	createFolder() {
		var dir = `./${this.answers.pluginName}`;

		if (!fs.existsSync(dir)){
		    fs.mkdirSync(dir);
		}
 	}

	copyPluginXml() {
		this.fs.copyTpl(
			this.templatePath('_plugin.xml'), 
			this.destinationPath(`./${this.answers.pluginName}/plugin.xml`), 
			this.answers
		);
	}

	copyPluginIcon() {
		this.fs.copy(
			this.templatePath('plugin.png'),
			this.destinationPath(`./${this.answers.pluginName}/plugin.png`)
		);
	}

	copyReadmeXml() {
		this.fs.copyTpl(
			this.templatePath('_Readme.md'), 
			this.destinationPath(`./${this.answers.pluginName}/Readme.md`), 
			this.answers
		);
	}

	copyBaseFile() {
		this.fs.copyTpl(
			this.templatePath('_Base.php'), 
			this.destinationPath(`./${this.answers.pluginName}/${this.answers.pluginName}.php`), 
			this.answers
		);
	}	

	copyServicesFile() {
		this.fs.copyTpl(
			this.templatePath('Resources/_services.xml'), 
			this.destinationPath(`./${this.answers.pluginName}/Resources/services.xml`), 
			this.answers
		);
	}
};