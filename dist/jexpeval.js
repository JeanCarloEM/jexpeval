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


/***/ }),

/***/ "./src/worker.ts":
/*!***********************!*\
  !*** ./src/worker.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWorker: () => (/* binding */ createWorker),
/* harmony export */   createWorkerSource: () => (/* binding */ createWorkerSource),
/* harmony export */   runWorkerScript: () => (/* binding */ runWorkerScript)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function runWorkerScript(starter) {
    function basicMessageCheck(e) {
        if (typeof e !== "object") {
            return "[jexpeval][runAsWorker][worker] message isnot object.";
        }
        if (!e.hasOwnProperty("data")) {
            return "[jexpeval][runAsWorker][worker] message dont contain 'data' proprerty.";
        }
        if (typeof e.data !== "object") {
            return "[jexpeval][runAsWorker][worker] data of message isnot object.";
        }
        return "";
    }
    var uuid = function () {
        return "uid10000000100040008000100000000000".replace(/[018]/g, function (x) {
            var c = x;
            return (c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
        });
    };
    function customPromiseMessage(id, caller, args) {
        var _terminated = false;
        return new Promise(function (R0, R_0) {
            self.addEventListener("message", function (e) {
                if (_terminated) {
                    return;
                }
                var _error = basicMessageCheck(e);
                _error =
                    _error.trim().length === 0
                        ? (function () {
                            if (!e.data.hasOwnProperty("return")) {
                                return "[jexpeval][runAsWorker][worker] message in 'customPromiseMessage' dont contain 'return' proprerty.";
                            }
                            if (typeof e.data.id !== "string") {
                                return "[jexpeval][runAsWorker][worker] message 'id' in 'customPromiseMessage' isnot string value.";
                            }
                            if (e.data.id.trim().length === 0) {
                                return "[jexpeval][runAsWorker][worker] message 'id' in 'customPromiseMessage' is empty.";
                            }
                            return "";
                        })()
                        : _error;
                if (_error.trim().length > 0) {
                    return R_0(_error);
                }
                if (e.data.id !== id) {
                    return;
                }
                _terminated = true;
                R0(e.data.return);
            });
            self.postMessage({ caller: caller, args: args, id: id });
        });
    }
    function getFromBrowser(name, _a) {
        var args = __rest(_a, []);
        return new Promise(function (R0, R_0) {
            var uid = uuid();
            customPromiseMessage(uid, name, __assign({}, args))
                .catch(function (e) { return R_0(e); })
                .then(function (r) { return R0(r); });
        });
    }
    var run = function (str, printable) {
        return void ({});
    };
    self.addEventListener("message", function (e) {
        var _error = basicMessageCheck(e);
        _error =
            _error.trim().length === 0
                ? (function () {
                    if (!e.data.hasOwnProperty("start")) {
                        return "[jexpeval][runAsWorker][worker] message dont contain 'eval' proprerty.";
                    }
                    if (typeof e.data.start !== "boolean") {
                        return "[jexpeval][runAsWorker][worker] message 'eval' isnot boolean value.";
                    }
                    if (!e.data.hasOwnProperty("printable")) {
                        return "[jexpeval][runAsWorker][worker] message dont contain 'printable' proprerty.";
                    }
                    if (typeof e.data.printable !== "boolean") {
                        return "[jexpeval][runAsWorker][worker] message 'printable' isnot boolean value.";
                    }
                    return "";
                })()
                : _error;
        if (_error.trim().length > 0) {
            return self.postMessage({ error: _error });
        }
        if (e.data.hasOwnProperty("start")) {
            starter(getFromBrowser);
        }
    });
}
function createWorkerSource(starter) {
    var source = window.URL.createObjectURL(new Blob(["(", runWorkerScript.toString(), ")(", starter.toString(), ")"], {
        type: "text/javascript",
    }));
    console.warn(source);
    return new Worker(source);
}
function createWorker(callers, starter) {
    if (!window) {
        throw "[jexpeval] worker only avaliable on browser: window dont exists.";
    }
    if (!Worker) {
        throw "[jexpeval] worker only avaliable on browser: Worker dont exists.";
    }
    var w = createWorkerSource(starter);
    return new Promise(function (R0, R_0) {
        w.addEventListener("message", function (e) {
            var _error = (function () {
                if (typeof e !== "object") {
                    return "[jexpeval][runAsWorker][window] message isnot object.";
                }
                if (!e.hasOwnProperty("data")) {
                    return "[jexpeval][runAsWorker][window] message dont contain 'data' proprerty.";
                }
                if (typeof e.data !== "object") {
                    return "[jexpeval][runAsWorker][window] data of message isnot object.";
                }
                return "";
            })();
            _error =
                _error.trim().length === 0 && e.data.hasOwnProperty("error")
                    ? e.data.error.trim()
                    : _error;
            _error =
                _error.trim().length === 0
                    ? (function () {
                        if (e.data.hasOwnProperty("caller")) {
                            if (typeof e.data.caller !== "string") {
                                return "[jexpeval][runAsWorker][window] caller of message isnot string.";
                            }
                            e.data.caller = e.data.caller.trim();
                            if (e.data.caller.length === 0) {
                                return "[jexpeval][runAsWorker][window] caller of message is empty.";
                            }
                            if (!callers.hasOwnProperty(e.data.caller)) {
                                return "[jexpeval][runAsWorker][window] the caller name does not exist.";
                            }
                            if (typeof callers[e.data.caller] !== "function") {
                                return "[jexpeval][runAsWorker][window] caller name is not a function.";
                            }
                        }
                        return "";
                    })()
                    : _error;
            if (_error.trim().length > 0 || e.data.hasOwnProperty("return")) {
                w.terminate();
                return _error.trim().length > 0 ? R_0(_error) : R0(e.data.return);
            }
            if (e.data.hasOwnProperty("caller")) {
                return callers[e.data.caller](e.data.hasOwnProperty("args") ? e.data.args : []).then(function (r, id) {
                    w.postMessage({ return: r, id: id });
                });
            }
            throw "[jexpeval][runAsWorker][window] It was not expected that the execution would reach this line.";
        });
        w.postMessage({
            start: true,
        });
    });
}


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
/* harmony import */ var _worker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worker */ "./src/worker.ts");
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
    jexpeval.convertToPrintable = function (input) {
        return 1;
    };
    jexpeval.prototype.eval = function (input, printable) {
        var _this = this;
        if (printable === void 0) { printable = false; }
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
                    .then(function (r1) { return R0(printable ? jexpeval.convertToPrintable(r1) : r1); })
                    .catch(function (r2) { return R_0(r2); });
            });
        });
    };
    jexpeval.run = function (str, printable, parser, caller, values) {
        if (printable === void 0) { printable = false; }
        if (caller === void 0) { caller = _baseProcessor__WEBPACK_IMPORTED_MODULE_0__.baseProcessor.genericCallerSolver; }
        if (values === void 0) { values = _baseProcessor__WEBPACK_IMPORTED_MODULE_0__.baseProcessor.genericValuesSolver; }
        return new jexpeval(parser, caller, values).eval(str, printable);
    };
    jexpeval.runAsWorker = function (str, printable, parser, caller, values) {
        if (printable === void 0) { printable = false; }
        if (caller === void 0) { caller = _baseProcessor__WEBPACK_IMPORTED_MODULE_0__.baseProcessor.genericCallerSolver; }
        if (values === void 0) { values = _baseProcessor__WEBPACK_IMPORTED_MODULE_0__.baseProcessor.genericValuesSolver; }
        return _worker__WEBPACK_IMPORTED_MODULE_1__.createWorker({
            parser: function () { },
            caller: function () { },
            values: function () { },
        }, function (getFromBrowser) {
            new jexpeval(function (input) {
                return (getFromBrowser("parser", []));
            }, function (name, args) {
                return getFromBrowser("caller", []);
            }, function (name) {
                return getFromBrowser("values", []);
            })
                .eval(str, printable)
                .catch(function (e) { })
                .then(function (r) { });
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