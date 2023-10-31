var __extends = (this && this.__extends) || (function () {
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
import { baseProcessor } from "./baseProcessor.js";
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
                (new global[tp](_this._parser, _this._caller, _this._values))
                    .eval(r)
                    .then(function (r1) { return R0(printable ? jexpeval.convertToPrintable(r1) : r1); })
                    .catch(function (r2) { return R_0(r2); });
            });
        });
    };
    jexpeval.run = function (str, printable, parser, caller, values) {
        if (printable === void 0) { printable = false; }
        if (caller === void 0) { caller = baseProcessor.genericCallerSolver; }
        if (values === void 0) { values = baseProcessor.genericValuesSolver; }
        return new jexpeval(parser, caller, values).eval(str, printable);
    };
    jexpeval.runAsWorker = function (str, printable, _parser, _workerCreator, _caller, _values) {
        if (printable === void 0) { printable = false; }
        if (_workerCreator === void 0) { _workerCreator = null; }
        if (_caller === void 0) { _caller = baseProcessor.genericCallerSolver; }
        if (_values === void 0) { _values = baseProcessor.genericValuesSolver; }
        if (!window) {
            throw "[jexpeval] worker only avaliable on browser: window dont exists.";
        }
        if (!Worker) {
            throw "[jexpeval] worker only avaliable on browser: Worker dont exists.";
        }
        _workerCreator =
            typeof _workerCreator !== null
                ? _workerCreator
                :
                    window.jcemWorkerCreator &&
                        typeof window.jcemWorkerCreator === "function"
                        ?
                            window.jcemWorkerCreator
                        : null;
        if (_workerCreator === null) {
            throw "[runAsWorker] creator dont exists.";
        }
        return _workerCreator({
            parser: function (args) {
                return new Promise(function (R0, R_1) {
                    R0({ return: 1, id: "" });
                });
            },
            caller: function (args) {
                return _caller(args.name, args.args);
            },
            values: function (args) {
                return _values(args.name);
            },
        }, function (inWorkerGetFromWindowSide) {
            new jexpeval(function (input) {
                return (inWorkerGetFromWindowSide("parser", []));
            }, function (name, args) {
                return inWorkerGetFromWindowSide("caller", {
                    name: name,
                    args: args,
                });
            }, function (name) {
                return (inWorkerGetFromWindowSide("values", { name: name }));
            })
                .eval(str, printable)
                .catch(function (e) { })
                .then(function (r) { });
        });
    };
    return jexpeval;
}(baseProcessor));
export { jexpeval };
//# sourceMappingURL=jexpeval.js.map