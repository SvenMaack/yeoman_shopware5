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
		        type: 'list',
		        name: 'type',
		        message: 'Type of Subscriber',
		        choices: [
		        	{
		            	name: 'Frontend',
		            	value: 'Frontend',
		          	}, 
		          	{
		            	name: 'Backend',
		            	value: 'Backend'
		          	}, 
		          	{
		            	name: 'Template',
		            	value: 'Template'
		         	}, 
		          	{
		            	name: 'SEO',
		            	value: 'SEO'
		         	}, 
		          	{
		            	name: 'Core (rarely used)',
		            	value: 'Core'
		         	}, 
		          	{
		            	name: 'Cronjob',
		            	value: 'Cronjob'
		         	}
		        ]
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
			this.answers.type,
			'Subscriber'
		);
	}

	addAbstractToXml() {
		serviceHandler.addAbstractToXml(
			this.answers.pluginName,
			this.answers.type,
			[]
		);
	}

	addServiceToXml() {
		serviceHandler.addServiceToXml(
			this.answers.pluginName,
			this.answers.type,
			'Subscriber',
			[
				'<tag name="shopware.event_subscriber"/>'
			]
		);
	}

	addSubscriberFile() {
		this.fs.copyTpl(
			this.templatePath('_Subscriber.php'), 
			this.destinationPath(`./${this.answers.pluginName}/Subscriber/${this.answers.type}.php`), 
			this.answers
		);
	}	
};
