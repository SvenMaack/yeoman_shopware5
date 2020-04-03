'use strict';

const Generator = require('./../service/index.js');
const os = require("os");

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
		console.log(this.answers);

		this.answers = {
			...this.answers,
			serviceName: this.answers.type //the base class (service) used this as a name of the service.
		};

		super.init();
	}

	addPathToXml() {
		super.addPathToXml('Subscriber');
	}

	addAbstractToXml() {
		super.addAbstractToXml(false); //don't inject stuff
	}

	addServiceToXml() {
		super.addServiceToXml('Subscriber', `<tag name="shopware.event_subscriber"/>${os.EOL}`); // add it below 'Subscriber'
	}

	addSubscriberFile() {
		this.fs.copyTpl(
			this.templatePath('_Subscriber.php'), 
			this.destinationPath(`./${this.answers.pluginName}/Subscriber/${this.answers.type}.php`), 
			this.answers
		);
	}	
};
