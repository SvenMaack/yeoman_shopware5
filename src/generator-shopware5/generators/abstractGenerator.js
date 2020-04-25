'use strict';

const Generator = require('yeoman-generator');
const camelCase = require('camel-case');
const chalk = require('chalk');

/**
 * Extends the generator with some convenient functions
**/
class MsGenerator extends Generator {
    /**
     * This function will prompt the user with the given questions and adds a loop of injection prompts after that.
     * The this.answers object contains the 'prompts' answers, while the this.injection array contains the injections.
     * The injections objects are in the shape of {id, path, name, varName}.
     *
     * @param {array} prompts
     * @return {array} the result of the promises
    **/
    askForInjections(prompts) {
        const me = this;
        me.answers = [];
        me.injections = [];

        const question = {
            type: 'confirm',
            name: 'repeat',
            message: `Do you want to add ${chalk.blue('more dependencies')}?`,
            default: 'Y',
        };

        const injectionPrompts = [
            {
                type: 'input',
                name: 'id',
                message: `What is the ${chalk.blue('id')} of the service (e.g. models/snippets):`,
                default: 'models',
            }, {
                type: 'input',
                name: 'path',
                message: `Please specify the ${chalk.blue('path')} (e.g. Shopware_Components_Snippet_Manager or Doctrine\\ORM\\EntityManagerInterface):`,
                default: 'Doctrine\\ORM\\EntityManagerInterface',
            },
            question,
        ];

        const loop = (relevantPrompts) => {
            return me.prompt(relevantPrompts).then((props) => {
                if (me.answers.length === 0) {
                    me.answers = props;
                } else {
                    props.name = props.path.substring(props.path.lastIndexOf('\\') + 1);
                    props.varName = camelCase.camelCase(props.name);
                    me.injections.push(props);
                }

                return props.repeat ? loop(injectionPrompts) : me.prompt([]);
            });
        };

        return loop([...prompts, question]);
    }
}

module.exports = MsGenerator;
