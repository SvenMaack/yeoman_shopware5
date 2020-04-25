'use strict';

const MsGenerator = require('./../abstractGenerator.js');
const helpers = require('./../helpers.js');
const serviceHandler = require('./../serviceHandler.js');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends MsGenerator {
    /**
     * Propmts the user a few questions
    **/
    async prompting() {
        this.log(yosay(chalk.blue(`Let's create a subscriber skeleton for you.`)));

        const prompts = [
            {
                type: 'input',
                name: 'pluginName',
                message: `Which ${chalk.blue('plugin')} should be modified?`,
                default: this.appname, // Default to current folder name
                store: true,
            },
            {
                type: 'list',
                name: 'type',
                message: `What ${chalk.blue('type')} of subscriber do you want to create?`,
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
                    }
                ],
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

    /**
     * Show a hint to the user at the end.
    **/
    showfinalHint() {
        this.log(yosay(`Everything done. What about creating a service using ${chalk.blue(`yo:shopware:service`)}?`));
    }
};
