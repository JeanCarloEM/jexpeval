import { jexpeval } from "../../src/jexpeval.js";
import * as jsep from "jsep";
var tests = (function () {
    function tests() {
    }
    tests.run_item = function (input, onItem, pre_r) {
        var _this = this;
        if (onItem === void 0) { onItem = null; }
        if (pre_r === void 0) { pre_r = true; }
        if (!Array.isArray(input)) {
            throw "input in test.run_item is not array";
        }
        return new Promise(function (R0, R_0) {
            if (input.length === 0) {
                return R0(pre_r);
            }
            var gi = input.shift();
            if (typeof gi === "undefined") {
                throw "item in test.run_item is undefined";
            }
            if (!Array.isArray(gi)) {
                throw "item in test.run_item is not array";
            }
            if (gi.length < 2) {
                throw "item in test.run_item len is less 2";
            }
            new jexpeval(function (i) {
                console.log("z");
                return jexpeval.genericCallerUnknowParser(jsep, i);
            })
                .eval(gi[0])
                .then(function (r) {
                var rr = Array.isArray(gi) && gi.length > 1 && r === gi[1];
                onItem !== null && onItem(gi[0], rr);
                _this.run_item(input, onItem, pre_r && rr).then(function (r1) { return R0(r1); });
            });
        });
    };
    tests.run = function (input, onItem, onGroup, onGoupFinish, pre_r) {
        var _this = this;
        if (onItem === void 0) { onItem = null; }
        if (onGroup === void 0) { onGroup = null; }
        if (onGoupFinish === void 0) { onGoupFinish = null; }
        if (pre_r === void 0) { pre_r = true; }
        if (!Array.isArray(input)) {
            throw "input in test.run isnot array";
        }
        return new Promise(function (R0, R_0) {
            if (input.length === 0) {
                return R0(pre_r);
            }
            var gv = input.shift();
            if (typeof gv === "undefined") {
                throw "item in test.run is undefined";
            }
            onGroup !== null && onGroup(gv.name);
            _this.run_item(gv.t, onItem).then(function (r) {
                onGoupFinish !== null && onGoupFinish(gv.name, r);
                _this.run(input, onItem, onGroup, onGoupFinish, pre_r && r).then(function (r) {
                    return R0(r);
                });
            });
        });
    };
    return tests;
}());
export { tests };
//# sourceMappingURL=tests.js.map