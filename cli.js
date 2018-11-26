#!/usr/bin/env node
/* eslint-env es6, node, commonjs */
/* eslint-disable no-console */
/**
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Printing out all npm script commands
 * @since 2018.11.25, 23:38
 * @version 2018.11.25, 23:38
 */

const chalk = require('chalk');
const scriptsList = require('./');

let scriptCommands;
try {
  scriptCommands = scriptsList.getScripts();
}
catch (err) {
  console.error('Can\'t load scriptCommands list!\n' + err.stack || err);
  process.exit(1);
}

const commandKeys = Object.keys(scriptCommands);

console.info('\nAvailable commands (for ' + chalk.underline('npm run -s <cmd>') + '):\n');

commandKeys
  .map((key) => {
    console.info('  ' + chalk.green(key) + ': ' + scriptCommands[key].title);
  })
;
