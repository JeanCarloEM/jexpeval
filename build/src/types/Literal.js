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
import { baseProcessor } from "../baseProcessor.js";
var jexpeval;
(function (jexpeval) {
    var Literal = (function (_super) {
        __extends(Literal, _super);
        function Literal() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Literal.prototype.eval = function (input) {
            return new Promise(function (R0, R_0) { });
        };
        return Literal;
    }(baseProcessor));
    jexpeval.Literal = Literal;
})(jexpeval || (jexpeval = {}));
//# sourceMappingURL=Literal.js.map