/* eslint-env es6, node, commonjs */
/**
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Return all npm script commands (in hash: `[{ cmd: description }]`_
 * @since 2018.11.25, 23:38
 * @version 2018.11.25, 23:38
 */

const path = require('path');

module.exports.getScripts = function(){

  const packageFilename = path.join(process.cwd(), 'package.json');

  // M.b. error thrown...
  const project = require(packageFilename);

  const commandsData = (project && project.scripts) || {};
  const commandKeys = Object.keys(commandsData);
  const scriptCommands = commandKeys
    .filter((key) => !(key.endsWith('UNUSED') || key.endsWith('SAMPLE')))
    .reduce((scriptCommands, key) => {
      const cmd = commandsData[key];
      const reg = cmd && cmd.match(/^echo\s+--(.*?)--/);
      if (reg && reg[1]) {
        scriptCommands[key] = { title: reg[1] };
      }
      return scriptCommands;
    }, {})
  ;

  return scriptCommands;

};
