# jExpEval

[![</> - typescript](https://img.shields.io/badge/<%2F>-typescript-blue)](https://) [![license - MPL 2.0+](https://img.shields.io/static/v1?label=license&message=MPL+2.0%2B&color=%23333333)](https://github.com/JeanCarloEM/jexpeval/blob/dev/LICENSE) [![Status - development](https://img.shields.io/badge/status-development-red)](https://)

**jExpEval** is an asynchronous, pluggable, browser-compatible and safe string evaluator. This uses parsers like [jsep](https://ericsmekens.github.io/jsep/) and resolves the [binary expression tree](https://en.wikipedia.org/wiki/Binary_expression_tree) returned by it.

## Goal

It acts as an expression parser that works with any lexical analyzer that returns a binary tree, as simple as:

```javascript
new jexpeval(anyParserCaller, callerSolver, valuesSolver)
  .eval("2 * 5")
  .then((r) => console.log(r));
// show 10
```

#### Where:

- **anyParserCaller** is a function of type (TExpParser) that should return the binary tree obtained by any parser like jsep.
- **callerSolver** is a OPTIONAL function (of type TGetCaller) that must calculate the result of some custom function.
- **callerSolver** is an OPTIONAL function (of type TGetValue) that must return the value of a custom identifier/variable.

### Targets

- Client-side (browsers)
- Node.js

## Features

- Pluggable variables/identifiers solver identifiers
- Pluggable functions caller Solver
- Solver common string and math/algebraic functions callers.
- Mathematical operations solver
- Logical expression solver
- Accepts the logical operator `AND` or `&&`, case insensitive
- Accepts the logical operator `OR` or `||`, case insensitive
- Accepts the logical operator `NOT` or`!`, case insensitive
- Accepts the exponentiation operator `^` or `**`"

## Dependencies

Need a string parser that returns a expressions tree.

## Project and To-do

**jExpEval** is developed for (and as an integral part of) [strTranformJs](https://github.com/JeanCarloEM/strtransformjs). See project [to-do](https://github.com/users/JeanCarloEM/projects/1) for more.

## License

- MPL 2.0+
- Additionally, JeanCarloEM reserves the right, at any time and without prior notice, to change the license of this content to another partial or incompatible COPYLEFT license (opensource license).
