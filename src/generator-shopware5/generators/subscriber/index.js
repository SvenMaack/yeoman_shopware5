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
                        value: 'Backend',
                    },
                    {
                        name: 'Template',
                        value: 'Template',
                    },
                    {
                        name: 'SEO',
                        value: 'SEO',
                    },
                    {
                        name: 'Core (rarely used)',
                        value: 'Core',
                    },
                    {
                        name: 'Cronjob',
                        value: 'Cronjob',
                    },
                ],
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

        // this.answers.type += 'Subscriber';
    }

    /**
     * Adds the path parameter to the xml.
    **/
    addPathToXml() {
        serviceHandler.addPathToXml(
            this.answers.pluginName,
            this.answers.type,
            'Subscriber',
        );
    }

    /**
     * Adds the abstract service to the xml.
    **/
    addAbstractToXml() {
        serviceHandler.addAbstractToXml(
            this.answers.pluginName,
            this.answers.type,
            [],
        );
    }

    /**
     * Adds the service to the xml.
    **/
    addServiceToXml() {
        serviceHandler.addServiceToXml(
            this.answers.pluginName,
            this.answers.type,
            'Subscriber',
            [
                '<tag name="shopware.event_subscriber"/>',
            ],
        );
    }

    /**
     * Creates the subscriber php-file.
    **/
    addSubscriberFile() {
        this.fs.copyTpl(
            this.templatePath('_Subscriber.php'),
            this.destinationPath(`./${this.answers.pluginName}/Subscriber/${this.answers.type}.php`),
            this.answers,
        );
    }
};
