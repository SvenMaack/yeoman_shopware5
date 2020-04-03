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
                name: 'serviceName',
                message: 'service name',
            },
            {
                type: 'confirm',
                name: 'injectModels',
                message: 'Would you like to inject models?',
            },
            {
                type: 'confirm',
                name: 'injectSnippets',
                message: 'Would you like to inject snippets?',
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
    }

    /**
     * Adds the path parameter to the xml.
    **/
    addPathToXml() {
        serviceHandler.addPathToXml(
            this.answers.pluginName,
            this.answers.serviceName,
            'Components',
        );
    }

    /**
     * Adds the abstract service to the xml.
    **/
    addAbstractToXml() {
        const models = this.answers.injectModels ?
            [
                '<argument type="service" id="models"/>',
            ] :
            [];
        const snippets = this.answers.injectSnippets ?
            [
                '<argument type="service" id="snippets"/>',
            ] :
            [];

        serviceHandler.addAbstractToXml(
            this.answers.pluginName,
            this.answers.serviceName,
            models.concat(snippets),
        );
    }

    /**
     * Adds the service to the xml.
    **/
    addServiceToXml() {
        serviceHandler.addServiceToXml(
            this.answers.pluginName,
            this.answers.serviceName,
            'Services',
            [],
        );
    }

    /**
     * Creates the service php-file.
    **/
    addServiceFile() {
        this.fs.copyTpl(
            this.templatePath('_Service.php'),
            this.destinationPath(`./${this.answers.pluginName}/Components/${this.answers.serviceName}.php`),
            this.answers,
        );
    }

    /**
     * Creates the service interface php-file.
    **/
    addServiceFileInterface() {
        this.fs.copyTpl(
            this.templatePath('_ServiceInterface.php'),
            this.destinationPath(`./${this.answers.pluginName}/Components/${this.answers.serviceName}Interface.php`),
            this.answers,
        );
    }
};
