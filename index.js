/* eslint-env es6, node, commonjs */
/**
 * @author lilliputten <lilliputten@yandex.ru>
 * @desc Return all npm script commands (in hash: `[{ cmd, title, ... }]`
 * @since 2018.11.25, 23:38
 * @version 2018.11.26, 06:12
 */

const path = require('path');

/** getScripts ** {{{
 * @param {Object} [props]
 * @param {String} [props.specialMark="--"]
 * @param {String} [props.defaultObjectId="__default__"]
 * @return {Object} - Return all npm script commands (in hash: `[{ cmd, title, ... }]`
 */
function getScripts({ specialMark, defaultObjectId } = {}){

  const packageFilename = path.join(process.cwd(), 'package.json');

  defaultObjectId = defaultObjectId || '__default__';

  specialMark = specialMark || '--';
  specialMark = specialMark.replace(/[[]().*^$]/g, '\\$1');
  const specialEchoRegexp = new RegExp('^echo ' + specialMark + '(.*?)' + specialMark);

  // M.b. error thrown...
  const project = require(packageFilename) || {};

  // Data from `npm-package-user-scripts` section
  const userScriptsData = project['npm-package-user-scripts'] || {};

  // Default object properties
  const userScriptsDefaultObject = userScriptsData[defaultObjectId] || {};

  // Data from `scripts` section
  const scriptsData = project['scripts'] || {};

  const scriptCommands = Object.keys(scriptsData)
    .filter((id) => !id.endsWith('UNUSED') && !id.endsWith('SAMPLE'))
    .reduce((scriptCommands, id) => {
      // Default object: from `npm-package-user-scripts` section or empty object
      const obj = userScriptsData[id] || {};
      // Command from `scripts` section (required!)
      const cmd = obj.cmd || scriptsData[id];
      // Match for special `echo --*--`
      const reg = cmd && cmd.match(specialEchoRegexp);
      // Title form special echo or default object
      const title = (reg && reg[1]) ? reg[1]: obj.title;
      // Title exists?
      if (title && cmd) {
        // ...then append to resulting object
        scriptCommands[id] = Object.assign({}, userScriptsDefaultObject, obj, { title, cmd });
      }
      return scriptCommands;
    }, {})
  ;

  return scriptCommands;

}/*}}}*/

module.exports.getScripts = getScripts;
