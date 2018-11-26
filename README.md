# npm-package-user-scripts-list

List all available npm script commands listed in `scripts` section of
`package.json`.

Lists only items preceeded by `echo --<Some description text>-- && <...>`
commands.

Excluded commands with keys ends with `*-UNUSED` or `*-SAMPLE` strings, eg for
next example scripts only `test` and `lint` commands will be listed:

```json
  "npm-package-user-scripts": {
    "__default__": {
      "someCommonParameter": true
    },
    "npm-package-user-scripts-command": {
      "title": "Command from `npm-package-user-scripts` section",
      "cmd": "echo Overrided command"
    }
  },
  "scripts": {
    "skipped-command": "echo Commands without leading `echo --*--` are skipped (if not listed in `npm-package-user-scripts` section -- see next command)",
    "npm-package-user-scripts-command": "echo Commands present in `npm-package-user-scripts` section (with `title` property) are used",
    "command-SAMPLE": "echo --Sample command (not used)--",
    "command-UNUSED": "echo --Unused command (not used)--",
    "lint": "echo --Lint source code-- && eslint . --ext .js && echo --No JS problems found--",
    "test": "echo --Run tests-- && jest",
    "help": "echo --List all available script commands (autotest)-- && node ./cli.js"
  }
```

## Installation

For current project:

```shell
npm i -D npm-package-user-scripts-list
```
Or global:
```shell
npm i -g npm-package-user-scripts-list
```

## Usage

In javascript code:

```js
const scriptsList = require('npm-package-user-scripts-list');

// Get script commands
const scriptCommands = scriptsList.getScripts();

// Print to console
Object.keys(scriptCommands).map((id) => {
  console.log(id, scriptCommands[id].title);
});
```

From shell command line:
```shell
npm-package-user-scripts-list
```

Add command shortcut to `package.json`:
```json
  "scripts": {
    "help": "echo --List all available script commands-- && npm-package-user-scripts-list"
  }
```

Sample command line line result:
```shell
$ npm-package-user-scripts-list

Available commands (for npm run -s <cmd>):

  npm-package-user-scripts-command: Command from `npm-package-user-scripts` section
  lint: Lint source code
  test: Run tests
  help: List all available script commands (autotest)
```

## See also

- [GUI interface standalone script](https://github.com/lilliputten/npm-package-user-scripts-gui)

<!--
@version 2018.11.26, 19:15
-->
