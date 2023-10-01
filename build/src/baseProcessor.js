import * as D from "./definitions.js";
var baseProcessor = (function () {
    function baseProcessor(_parser, _caller, _values) {
        this._parser = _parser;
        this._caller = _caller;
        this._values = _values;
    }
    baseProcessor.getType = function (input) {
        if ((typeof input === "object") &&
            (input.hasOwnProperty('type')) &&
            (D.ExpressionTypeNames.indexOf(input.type))) {
            return input.type;
        }
        return null;
    };
    return baseProcessor;
}());
export { baseProcessor };
//# sourceMappingURL=baseProcessor.js.map