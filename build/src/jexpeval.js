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
import { baseProcessor } from "./baseProcessor";
var jexpeval = (function (_super) {
    __extends(jexpeval, _super);
    function jexpeval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    jexpeval.prototype.eval = function (input) {
        var _this = this;
        if (typeof input !== 'string') {
            throw "Eval input in jexpeval isnot string";
        }
        return new Promise(function (R0, R_0) {
            _this._parser(input)
                .then(function (r) {
                var tp = _this.constructor.getType(r);
                if (tp === null) {
                    throw "Invalid type in lex eval.";
                }
                (new window[tp](_this._parser, _this._caller, _this._values))
                    .eval(r)
                    .then(function (r1) { return R0(r1); })
                    .catch(function (r2) { return R_0(r2); });
            });
        });
    };
    return jexpeval;
}(baseProcessor));
export { jexpeval };
//# sourceMappingURL=jexpeval.js.map