
const snakeCase = require('snake-case');
const replaceLib = require('replace-in-file');

/**
 * Enriches the answers with the date option and the plugin name in snakeCase.
 *
 * @param {object} answers
 * @param {string} pluginName
 *
 * @return {object} An enriched answer object.
**/
function enrichAnswers(answers, pluginName = '') {
    const dateOb = new Date();
    const date = ('0' + dateOb.getDate()).slice(-2);
    const month = ('0' + (dateOb.getMonth() + 1)).slice(-2);
    const year = dateOb.getFullYear();
    const hours = dateOb.getHours();
    const minutes = ('0' + dateOb.getMinutes()).slice(-2);

    return {
        ...answers,
        time: `${hours}:${minutes}`,
        date: `${date}.${month}.${year}`,
        pluginNameSnake: snakeCase.snakeCase(pluginName),
    };
}

/**
 * Replaces all occurences from 'from' to 'to'
 *
 * @param {string|array} files
 * @param {string|array} from
 * @param {string|array} to
 *
 * @return {string}
**/
function replace(files, from, to) {
    const options = {
        files: files,
        from: from,
        to: to,
    };

    return replaceLib.sync(options)
        .filter((result) => result.hasChanged)
        .map((result) => result.file);
}

/**
 * Adds the 'add' after any occurence of 'after' in the 'file'
 *
 * @param {string} file
 * @param {string} after
 * @param {string} add
 *
 * @return {string}
**/
function addAfter(file, after, add) {
    return replace(
        file,
        after,
        after + add,
    );
}

module.exports = {
    enrichAnswers,
    replace,
    addAfter,
};
