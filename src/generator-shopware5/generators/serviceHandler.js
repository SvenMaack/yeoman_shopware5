'use strict';

const snakeCase = require('snake-case');
const helpers = require('./helpers.js');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

/**
 * Adds the path paramter to the xml file.
 * @param {string} pluginName
 * @param {string} serviceName
 * @param {string} folder
**/
function addPathToXml(pluginName, serviceName, folder) {
    const file = `./${pluginName}/Resources/services.xml`;
    const path = `${pluginName}\\${folder}\\${serviceName}`;
    const uniqueLine = `<parameter key="${_createXmlId(pluginName, serviceName)}_class">${path}</parameter>`;

    if (_checkIfExistsInFile(file, uniqueLine)) {
        return;
    }

    const results = helpers.addAfter(
        file,
        '<parameters>',
        `${os.EOL}` +
            `\t\t${uniqueLine}`,
    );

    if (!results.includes(file)) {
        console.log(chalk.red('Error: Can\'t add parameter to service xml! Please validate the service xml manually.'));
    }
}

/** Adds the abstract service to the xml file.
 *
 * @param {string} pluginName
 * @param {string} serviceName
 * @param {string[]} injections
**/
function addAbstractToXml(pluginName, serviceName, injections) {
    const file = `./${pluginName}/Resources/services.xml`;
    const uniqueLine = `<service id="${_createXmlId(pluginName, serviceName)}_abstract" abstract="true">${os.EOL}`;

    if (_checkIfExistsInFile(file, uniqueLine)) {
        console.log(chalk.red('The abstract service ') + chalk.blue(`${_createXmlId(pluginName, serviceName)}_abstract`) + chalk.red(' exists already. Please check if it fits the requirements or remove it and rerun this generator!'));
        return;
    }

    const results = helpers.addAfter(
        file,
        '<!-- Abstracts -->',
        `${os.EOL}` +
            `\t\t${uniqueLine}` +
            injections.map((injection) =>
                `\t\t\t${injection}${os.EOL}`,
            ).join('') +
            `\t\t</service>`,
    );

    if (!results.includes(file)) {
        console.log(chalk.red('Error: Can\'t add abstract service to service xml! Please validate the service xml manually.'));
    }
}

/**
 * Adds the service to the xml referencing a parent and a class.
 *
 * @param {string} pluginName
 * @param {string} serviceName
 * @param {string} appendAfter
 * @param {string[]} tags
**/
function addServiceToXml(pluginName, serviceName, appendAfter, tags) {
    const file = `./${pluginName}/Resources/services.xml`;
    const xmlId = _createXmlId(pluginName, serviceName);
    const uniqueLine = `<service id="${xmlId}" class="%${xmlId}_class%" parent="${xmlId}_abstract">${os.EOL}`;

    if (_checkIfExistsInFile(file, uniqueLine)) {
        return;
    }

    const results = helpers.addAfter(
        file,
        `<!-- ${appendAfter} -->`,
        `${os.EOL}` +
            `\t\t${uniqueLine}` +
            tags.map((tag) =>
                `\t\t\t${tag}${os.EOL}`,
            ).join('') +
            `\t\t</service>`,
    );

    if (!results.includes(file)) {
        console.log(chalk.red('Error: Can\'t add service to service xml! Please validate the service xml manually.'));
    }
}

/**
 * Creates a snake version of the given 'name'
 *
 * @param {string} name
 *
 * @return {string}
**/
function _createSnakeCase(name) {
    return snakeCase.snakeCase(name).replace('Pm', '');
}

/**
 * Creates the if for the xml file for the given service and plugin name.
 *
 * @param {string} pluginName
 * @param {string} serviceName
 *
 * @return {string}
**/
function _createXmlId(pluginName, serviceName) {
    return `pm.${_createSnakeCase(pluginName)}.${_createSnakeCase(serviceName)}`;
}

/**
 * Checks if the file contains the search string
 *
 * @param {string} file the path to the file
 * @param {string} search the search string
 *
 * @return {bool} true if search exists in the file.
**/
function _checkIfExistsInFile(file, search) {
    return fs.readFileSync(file).includes(search);
}

module.exports = {
    addPathToXml,
    addAbstractToXml,
    addServiceToXml,
};
