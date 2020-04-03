'use strict';

const Generator = require('yeoman-generator');
const fs = require('fs');
const helpers = require('./../helpers.js');

module.exports = class extends Generator {
    /**
     * Propmts the user a few questions
    **/
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'pluginName',
                message: 'Name of the plugin.',
                default: this.appname, // Default to current folder name
                store: true,
            },
            {
                type: 'input',
                name: 'minVersion',
                message: 'minimal shopware version',
                default: '5.6.4',
                store: true,
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
     * Creates the folder for the plugin.
    **/
    createFolder() {
        const dir = `./${this.answers.pluginName}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    /**
     * Creates the plugin xml with the plugin info.
    **/
    createPluginXml() {
        this.fs.copyTpl(
            this.templatePath('_plugin.xml'),
            this.destinationPath(`./${this.answers.pluginName}/plugin.xml`),
            this.answers,
        );
    }

    /**
     * Creates the plugin icon.
    **/
    createPluginIcon() {
        this.fs.copy(
            this.templatePath('plugin.png'),
            this.destinationPath(`./${this.answers.pluginName}/plugin.png`),
        );
    }

    /**
     * Creates the readme xml.
    **/
    createReadmeXml() {
        this.fs.copyTpl(
            this.templatePath('_Readme.md'),
            this.destinationPath(`./${this.answers.pluginName}/Readme.md`),
            this.answers,
        );
    }

    /**
     * Creates the plugin base file.
    **/
    createBaseFile() {
        this.fs.copyTpl(
            this.templatePath('_Base.php'),
            this.destinationPath(`./${this.answers.pluginName}/${this.answers.pluginName}.php`),
            this.answers,
        );
    }

    /**
     * Creates the services.xml file.
    **/
    createServicesFile() {
        this.fs.copyTpl(
            this.templatePath('Resources/_services.xml'),
            this.destinationPath(`./${this.answers.pluginName}/Resources/services.xml`),
            this.answers,
        );
    }
};
