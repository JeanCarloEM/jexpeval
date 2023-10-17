import * as unknowParser from "./unknowParser";
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
            unknowParser.ExpressionTypeNames.indexOf(input.type)) {
            return input.type;
        }
        return null;
    };
    return baseProcessor;
}());
export { baseProcessor };
//# sourceMappingURL=baseProcessor.js.map