#!/usr/bin/env node
/* eslint-env es6, node, commonjs */
/* eslint-disable no-console */
/**
 * @module package-npm-commands-help.js
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Printing out all npm script commands
 * @since 2018.11.25, 23:38
 * @version 2018.11.25, 23:38
 */

const chalk = require('chalk');

const commands = require('./index');
const commandKeys = Object.keys(commands);

console.info('\nUsage: ' + chalk.underline(' npm run -s <cmd>') + '\n');

commandKeys
  .map((key) => {
    console.info('  ' + chalk.green(key) + ': ' + commands[key]);
  })
;
