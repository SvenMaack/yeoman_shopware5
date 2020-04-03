'use strict';

const Generator = require('yeoman-generator');
const helpers = require('./../helpers.js');
const serviceHandler = require('./../serviceHandler.js');

module.exports = class extends Generator {
    /**
     * Propmts the user a few questions
    **/
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'pluginName',
                message: 'plugin name',
                default: this.appname, // Default to current folder name
                store: true,
            },
            {
                type: 'input',
                name: 'commandName',
                message: 'command name',
            },
            {
                type: 'input',
                name: 'commandCallString',
                message: 'the argument to start the command',
                default: 'pm:entity/service:action',
            },
            {
                type: 'input',
                name: 'commandDescription',
                message: 'the description for the command',
            },
            {
                type: 'input',
                name: 'commandHelp',
                message: 'The help text for the command',
                default: 'The ommand creates ...',
            },
            {
                type: 'confirm',
                name: 'injectModels',
                message: 'Would you like to inject models?',
            },
        ]);
    }

    /**
     * Inits the answers property.
    **/
    init() {
        this.answers = {
            ...helpers.enrichAnswers(this.answers, this.answers.pluginName),
        };

        // this.answers.commandName += 'Command';
    }

    /**
     * Adds the path parameter to the xml.
    **/
    addPathToXml() {
        serviceHandler.addPathToXml(
            this.answers.pluginName,
            this.answers.commandName,
            'Commands',
        );
    }

    /**
     * Adds the abstract service to the xml.
    **/
    addAbstractToXml() {
        serviceHandler.addAbstractToXml(
            this.answers.pluginName,
            this.answers.commandName,
            [],
        );
    }

    /**
     * Adds the service to the xml.
    **/
    addServiceToXml() {
        serviceHandler.addServiceToXml(
            this.answers.pluginName,
            this.answers.commandName,
            'Commands',
            [
                '<tag name="console.command"/>',
            ],
        );
    }

    /**
     * Creates the subscriber php-file.
    **/
    addCommandFile() {
        this.fs.copyTpl(
            this.templatePath('_Command.php'),
            this.destinationPath(`./${this.answers.pluginName}/Commands/${this.answers.commandName}.php`),
            this.answers,
        );
    }
};
