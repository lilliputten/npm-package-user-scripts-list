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
      "showConsole": false
    },
    "npm-package-user-scripts-command": {
      "title": "Command from `npm-package-user-scripts` section",
      "cmd": "echo Overrided command",
      "showConsole": true
    }
  },
  "scripts": {
    "skipped-command": "echo Commands without first special (--) echo are skipped",
    "npm-package-user-scripts-command": "echo Commands present in `npm-package-user-scripts` section are used",
    "command-SAMPLE": "echo --Sample command (not used)--",
    "command-UNUSED": "echo --Unused command (not used)--",
    "lint": "echo --Lint source code-- && eslint . --ext .js && echo --No JS problems found--",
    "test": "echo --Run tests-- && jest"
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

From commandline:
```shell
npm-package-user-scripts-list
```

Add command shortcut to `package.json`:
```json
  "scripts": {
    "help": "echo --List all available script commands-- && npm-package-user-scripts-list"
  }
```

## See also

- [GUI interface](https://github.com/lilliputten/npm-package-user-scripts-gui)

---

<!--
@version 2018.11.26, 19:15
-->
