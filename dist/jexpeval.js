(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("jexpeval", [], factory);
	else if(typeof exports === 'object')
		exports["jexpeval"] = factory();
	else
		root["jexpeval"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/baseProcessor.ts":
/*!******************************!*\
  !*** ./src/baseProcessor.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseProcessor: () => (/* binding */ baseProcessor)
/* harmony export */ });
/* harmony import */ var _unknowParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unknowParser */ "./src/unknowParser.ts");

var baseProcessor = (function () {
    function baseProcessor(_parser, _caller, _values) {
        if (_caller === void 0) { _caller = baseProcessor.genericCallerSolver; }
        if (_values === void 0) { _values = baseProcessor.genericValuesSolver; }
        this._parser = _parser;
        this._caller = _caller;
        this._values = _values;
    }
    baseProcessor.genericCallerSolver = function (name, args) {
        return new Promise(function (R, R_) {
            R("`".concat(name, "`"));
        });
    };
    baseProcessor.genericValuesSolver = function (name) {
        return new Promise(function (R, R_) {
            R("`".concat(name, "`"));
        });
    };
    baseProcessor.genericCallerUnknowParser = function (f, i) {
        return new Promise(function (R1, R_1) {
            if (typeof f !== "function") {
                throw "JSEP is not defined";
            }
            var resp = f(i);
            if (typeof resp !== "object") {
                throw "Value returned in JSEP is not array";
            }
            if (!resp.hasOwnProperty("type")) {
                throw "Value returned in JSEP dont contain 'type' item.";
            }
            R1(resp);
        });
    };
    baseProcessor.getType = function (input) {
        if (typeof input === "object" &&
            input.hasOwnProperty("type") &&
            _unknowParser__WEBPACK_IMPORTED_MODULE_0__.ExpressionTypeNames.indexOf(input.type)) {
            return input.type;
        }
        return null;
    };
    return baseProcessor;
}());



/***/ }),

/***/ "./src/unknowParser.ts":
/*!*****************************!*\
  !*** ./src/unknowParser.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExpressionTypeNames: () => (/* binding */ ExpressionTypeNames)
/* harmony export */ });
var ExpressionTypeNames = [
    "Compound",
    "Identifier",
    "MemberExpression",
    "Literal",
    "ThisExpression",
    "CallExpression",
    "UnaryExpression",
    "BinaryExpression",
    "ConditionalExpression",
    "ArrayExpression",
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/jexpeval.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jexpeval: () => (/* binding */ jexpeval)
/* harmony export */ });
/* harmony import */ var _baseProcessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseProcessor */ "./src/baseProcessor.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var jexpeval = (function (_super) {
    __extends(jexpeval, _super);
    function jexpeval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    jexpeval.prototype.eval = function (input) {
        var _this = this;
        if (typeof input !== "string") {
            throw "Eval input in jexpeval isnot string";
        }
        return new Promise(function (R0, R_0) {
            _this._parser(input).then(function (r) {
                var tp = _this.constructor.getType(r);
                if (tp === null) {
                    throw "Invalid type in lex eval.";
                }
                (new __webpack_require__.g[tp](_this._parser, _this._caller, _this._values))
                    .eval(r)
                    .then(function (r1) { return R0(r1); })
                    .catch(function (r2) { return R_0(r2); });
            });
        });
    };
    return jexpeval;
}(_baseProcessor__WEBPACK_IMPORTED_MODULE_0__.baseProcessor));


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jexpeval.js.map