/* eslint-env jest */
// @see https://jest-bot.github.io/jest/docs/using-matchers.html

const scriptsList = require('./');

describe('npm-package-user-scripts-list', () => {

  it('`getScripts` must be a function', () => {
    expect(typeof scriptsList.getScripts).toEqual('function');
  });

  /** describe getScripts ** {{{
   */
  describe('getScripts', () => {

    // Get script commands
    const scriptCommands = scriptsList.getScripts();

    it('must return object', () => {
      expect(typeof scriptCommands).toEqual('object');
    });

    /** describe returned scripts list object ** {{{
     */
    describe('returned scripts list object', () => {

      it('must contain `test` key', () => {
        expect(typeof scriptCommands.test).toBe('string');
      });

      it('must be correct `test` key value', () => {
        // Values from `package.json` to compare with returned by `getScripts`...
        const pkgScripts = require('./package.json').scripts;
        expect(pkgScripts.test).toContain('echo --' + scriptCommands['test'] + '--');
      });

      it('must not include only commands starts with `echo --*--`', () => {
        expect(scriptCommands['command']).toBeUndefined();
      });

      it('must not include `*UNUSED` scriptCommands', () => {
        expect(scriptCommands['test-command-UNUSED']).toBeUndefined();
      });

      it('must not include `*SAMPLE` scriptCommands', () => {
        expect(scriptCommands['test-command-SAMPLE']).toBeUndefined();
      });

    });/*}}}*/

  });/*}}}*/

});

