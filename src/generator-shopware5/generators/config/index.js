'use strict';

const Generator = require('yeoman-generator');
const helpers = require('./../helpers.js');
const fs = require('fs');
const os = require('os');

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
                name: 'configName',
                message: 'configuration name',
            },
            {
                type: 'list',
                name: 'type',
                message: 'Type of the config element',
                choices: [
                    {
                        name: 'text',
                        value: 'text',
                    },
                    {
                        name: 'password',
                        value: 'password',
                    },
                    {
                        name: 'textarea',
                        value: 'textarea',
                    },
                    {
                        name: 'boolean',
                        value: 'boolean',
                    },
                    {
                        name: 'color',
                        value: 'color',
                    },
                    {
                        name: 'date',
                        value: 'date',
                    },
                    {
                        name: 'datetime',
                        value: 'datetime',
                    },
                    {
                        name: 'time',
                        value: 'time',
                    },
                    {
                        name: 'interval',
                        value: 'interval',
                    },
                    {
                        name: 'html',
                        value: 'html',
                    },
                    {
                        name: 'mediaselection',
                        value: 'mediaselection',
                    },
                    {
                        name: 'number',
                        value: 'number',
                    },
                    {
                        name: 'select (needs store)',
                        value: 'select',
                    },
                    {
                        name: 'combo (needs store)',
                        value: 'combo',
                    },
                    {
                        name: 'button (needs command)',
                        value: 'button',
                    },
                ],
            },
            {
                type: 'input',
                name: 'label',
                message: 'label for the config element',
            },
            {
                type: 'input',
                name: 'value',
                message: 'default value for the config element',
            },
            {
                type: 'input',
                name: 'description',
                message: 'description of the config element',
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
     * Creates the config xml file it it doesn't exist yet.
    **/
    createConfigXMLFile() {
        if (fs.existsSync(`./${this.answers.pluginName}/Resources/config.xml`)) {
            return;
        }

        fs.copyFile(
            this.templatePath('_config.xml'),
            this.destinationPath(`./${this.answers.pluginName}/Resources/config.xml`),
            (err) => {
                if (err) {
                    throw err;
                }
            },
        );
    }

    /**
     * Adds the config element to the config XML file at the top.
    **/
    addConfigElementToXmlFile() {
        const file = `./${this.answers.pluginName}/Resources/config.xml`;

        const results = helpers.addAfter(
            file,
            '<elements>',
            `${os.EOL}` +
                `\t\t<element type="${this.answers.type}" scope="locale">${os.EOL}` +
                `\t\t\t<name>${this.answers.configName}</name>${os.EOL}` +
                `\t\t\t<label lang="en">${this.answers.label}</label>${os.EOL}` +
                `\t\t\t<value>${this.answers.value}</value>${os.EOL}` +
                `\t\t\t<description>${this.answers.description}</description>${os.EOL}` +
                `\t\t</element>`,
        );

        if (!results.includes(file)) {
            this.log('Error: Can\'t add config element to config xml! Please validate the config xml manually.');
        }
    }

    /**
     * Creates the config service php file as a service using the service generator
    **/
    createConfigService() {
        if (fs.existsSync(`./${this.answers.pluginName}/Components/Config.php`)) {
            return;
        }

        this.composeWith(
            require.resolve('../service'),
            {
                passedData: {
                    pluginName: this.answers.pluginName,
                    serviceName: 'Config',
                    injectModels: false,
                    injectSnippets: false,
                    subfolder: 'Config',
                },
            },
        );
    }
};
