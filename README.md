# jExpEval

[![</> - typescript](https://img.shields.io/badge/<%2F>-typescript-blue)](https://) [![license - MPL 2.0+](https://img.shields.io/static/v1?label=license&message=MPL+2.0%2B&color=%23333333)](https://github.com/JeanCarloEM/jexpeval/blob/dev/LICENSE) [![Status - development](https://img.shields.io/badge/status-development-red)](https://)

**jExpEval** is a, javascript, client-side, pluggable and asynchronous **safe string evaluator** that parses the _expression tree_ returned by parsers like [jsep](https://ericsmekens.github.io/jsep/).

## Goal

It acts as an expression parser that works with any lexical analyzer that returns a binary tree, as simple as:

```javascript
jexpeval("2 * 5").then((r) => console.log(r));
// show 10
```

### Targets

- Client-side (browsers)
- Node.js

## Features

- Pluggable variable solver identifiers
- Pluggable functions caller Solver
- Solver common string and math functions callers.
- Mathematical operations solver
- Logical expression solver
- Accepts the logical operator `AND` or `&&`, case insensitive
- Accepts the logical operator `OR` or `||`, case insensitive
- Accepts the exponentiation operator `^` or `**`"

## Dependencies

Need a string parser that returns a expressions tree.

## To-do

[Here](https://github.com/users/JeanCarloEM/projects/1)

## License

MPL 2.0+
