/* eslint-env es6, node, commonjs */
/* eslint-disable no-console */
/**
 * @module package-npm-commands-help.js
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Printing out all npm script commands
 * @since 2018.11.25, 23:38
 * @version 2018.11.25, 23:38
 */

const project = require('./package.json');
const commandsData = project.scripts || [];
const commandKeys = Object.keys(commandsData);
const commands = commandKeys
  .filter((key) => !(key.endsWith('UNUSED') || key.endsWith('SAMPLE')))
  .reduce((commands, key) => {
    const cmd = commandsData[key];
    const reg = cmd && cmd.match(/^echo\s+--(.*?)--/);
    if (reg && reg[1]) {
      commands[key] = reg[1];
    }
    return commands;
  }, {})
;

module.exports = commands;
