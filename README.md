# jExpEval

[![</> - typescript](https://img.shields.io/badge/<%2F>-typescript-blue)](https://) [![license - MPL 2.0+](https://img.shields.io/static/v1?label=license&message=MPL+2.0%2B&color=%23333333)](https://github.com/JeanCarloEM/jexpeval/blob/dev/LICENSE) [![Status - development](https://img.shields.io/badge/status-development-red)](https://)

**jExpEval** is a, javascript, client-side, pluggable and asynchronous  **safe string evaluator** that parses the _expression tree_ returned by parsers like [jsep](https://ericsmekens.github.io/jsep/).

## Goal

It acts as an expression parser that works with any lexical analyzer that returns a binary tree, as simple as:

```javascript
jexpeval("2 * 5").then(r => console.log(r));
// show 10
```

### Targets

 - Client-size (browsers)
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

## To-do list

- [ ] Github action test
- [ ] Automatic badge "build" update with actions
- [ ] Web-based, live test at githubpages

### Project environment

- [ ] Automatic compilation in the `.js` file in `dist/`
- [ ] Automatic minify in the `min.js` file in `dist/`
- [ ] Automatic generate a bundle definition in the `d.ts` file in `dist/`

### Expression Type Evaluator

- [ ] CoreExpression
- [ ] ArrayExpression
- [ ] BinaryExpression
- [ ] CallExpression
- [ ] Compound
- [ ] ConditionalExpression
- [ ] Identifier
- [ ] Literal
- [ ] MemberExpression
- [ ] ThisExpression
- [ ] UnaryExpression

### Commom function callers

#### Math Function Callers to implement

- [ ] not
- [ ] round, Math.round
- [ ] ceil, Math.ceil
- [ ] trunc, Math.trunc
- [ ] floor, Math.floor
- [ ] abs, Math.abs
- [ ] pow, Math.pow
- [ ] exp, Math.exp
- [ ] ln, log, Math.log
- [ ] sin, Math.sin
- [ ] cos, Math.cos
- [ ] tan, Math.tan
- [ ] acos, Math.acos
- [ ] asin, Math.asin
- [ ] atan, Math.atan

#### String Function Callers to implement

- [ ] len
- [ ] pos
- [ ] rpos
- [ ] sub
- [ ] replace
- [ ] explode
- [ ] implode

## License

MPL 2.0+
