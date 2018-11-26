/* eslint-env jest */
// @see https://jest-bot.github.io/jest/docs/using-matchers.html

const scriptsList = require('./index');

describe('npm-package-user-scripts-list', () => {

  it('`getScripts` must be a function', () => {
    expect(typeof scriptsList.getScripts).toEqual('function');
  });

  /** describe ** {{{ getScripts
   */
  describe('getScripts', () => {

    // Get script commands
    const scriptCommands = scriptsList.getScripts();

    it('must return object', () => {
      expect(typeof scriptCommands).toEqual('object');
    });

    /** describe ** {{{ returned data
     */
    describe('returned data', () => {

      it('must match snapshot', () => {
        expect(scriptCommands).toMatchSnapshot();
      });

      /** describe ** {{{ key details
       */
      describe('key details', () => {

        it('must contain `test` key', () => {
          expect(typeof scriptCommands.test).toBe('object');
        });

        it('command must contain `title` property', () => {
          expect(typeof scriptCommands.test.title).toBe('string');
        });

        it('must be correct `test` key value', () => {
          const pkgScripts = require('./package.json').scripts;
          // Values from `package.json` to compare with returned by `getScripts`...
          expect(pkgScripts.test).toContain('echo --' + scriptCommands['test'].title + '--');
        });

      });/*}}}*/

      /** describe ** {{{ included/excluded commands
       */
      describe('included/excluded commands', () => {

        it('must include commands from `npm-package-user-scripts` section', () => {
          expect(scriptCommands['npm-package-user-scripts-command']).toBeDefined();
        });

        it('must override commands for `npm-package-user-scripts` section items', () => {
          const pkgUserScripts = require('./package.json')['npm-package-user-scripts'];
          // Values from `package.json` to compare with returned by `getScripts`...
          expect(scriptCommands['npm-package-user-scripts-command'].cmd).toEqual(pkgUserScripts['npm-package-user-scripts-command'].cmd);
        });

        it('must include commands starts with `echo --*--`', () => {
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

  });/*}}}*/

});

