# eslint-formatter-todo

Generate a configuration file acting as a TODO list for [ESLint](https://eslint.org). Borrows the pattern from [Rubocop's `auto-gen-config` option](https://github.com/bbatsov/rubocop/blob/master/manual/configuration.md#automatically-generated-configuration).

## Install

```
$ yarn install --dev eslint-formatter-todo
```

## Usage

Extend `./.eslintrc_todo.js` from your `.eslintrc`. For example:

```diff
-  extends: 'my-eslint-config',
+  extends: ['my-eslint-config', './.eslintrc_todo.js'],
```

Null out your `.eslintrc_todo.js` and run `eslint` with the `todo` formatter to generate your TODO file:

```
echo "module.exports = {}" >| .eslintrc_todo.js
eslint --format=todo . --output-file ".eslintrc_todo.js"
```
