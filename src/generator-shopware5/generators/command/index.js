'use strict';

const helpers = require('./../helpers.js');
const MsGenerator = require('./../abstractGenerator.js');
const serviceHandler = require('./../serviceHandler.js');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends MsGenerator {
    /**
     * Propmts the user a few questions
    **/
    async prompting() {
        this.log(yosay(chalk.blue(`Let's create an command skeleton for you.`)));

        const prompts = [
            {
                type: 'input',
                name: 'pluginName',
                message: `Which ${chalk.blue('plugin')} should be modified?`,
                default: this.appname, // Default to current folder name
                store: true,
            },
            {
                type: 'input',
                name: 'commandName',
                message: `What is the ${chalk.blue('name')} of the command class?`,
            },
            {
                type: 'input',
                name: 'commandCallString',
                message: `Please specify the name to ${chalk.blue('call the command')}:`,
                default: 'pm:entity/service:action',
            },
            {
                type: 'input',
                name: 'commandDescription',
                message: `What is the ${chalk.blue('description')} for the command?`,
            },
            {
                type: 'input',
                name: 'commandHelp',
                message: `And what ist the ${chalk.blue('help text')} for the command?`,
                default: 'The ommand creates ...',
            },
        ];

        await this.askForInjections(prompts);
    }

    /**
     * Inits the answers property.
    **/
    init() {
        this.answers = {
            ...helpers.enrichAnswers(this.answers, this.answers.pluginName),
            injections: this.injections,
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
            this.injections.map((injection) =>
                `<argument type="service" id="${injection.id}"/>`,
            ),
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

    /**
     * Show a hint to the user at the end.
    **/
    showfinalHint() {
        this.log(yosay(`Everything done. What about creating a service using ${chalk.blue(`yo:shopware:service`)} and use it inside the ${chalk.blue(`${this.answers.pluginName}/Commands/${this.answers.commandName}.php`)} execution method?`));
    }
};
