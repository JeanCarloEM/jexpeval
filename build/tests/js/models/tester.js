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
import { TIterator } from "./iterator.js";
var testSolver = (function (_super) {
    __extends(testSolver, _super);
    function testSolver(tests, solver, onFinish, onFinishChild, onStatusChange) {
        if (onFinishChild === void 0) { onFinishChild = null; }
        if (onStatusChange === void 0) { onStatusChange = null; }
        var _this = _super.call(this, (function () {
            if ((typeof tests !== "object") || (!Array.isArray(tests))) {
                throw "[testSolver] tests parameter isn't object array.";
            }
            if (typeof onFinish !== 'function') {
                throw "[testSolver] onFinish parameter isn't function.";
            }
            var _self = [];
            if (tests.length > 1) {
                tests.map(function (item) {
                    _self.push(new testSolver([item], _this.solver, _this.onMyFinishChild));
                });
                return _self;
            }
            return [];
        })()) || this;
        _this.solver = solver;
        _this.onFinish = onFinish;
        _this.onFinishChild = onFinishChild;
        _this.onStatusChange = onStatusChange;
        _this._test = null;
        _this._status = "not_started";
        _this._approved = true;
        _this._test_pos = 0;
        _this._id = "";
        if (tests.length === 1) {
            if (tests[0].length !== 2) {
                throw "[testSolver] tests[0] parameter in constructor don't contain 2 elements.";
            }
            if (typeof tests[0][0] !== "string") {
                throw "[testSolver] tests[0][0] parameter in constructor isn't string.";
            }
            if (tests[0][0].trim().length === 0) {
                throw "[testSolver] tests[0][0] parameter in constructor is empty.";
            }
            crypto.subtle
                .digest("SHA-256", new TextEncoder().encode(tests[0][0].trim()))
                .then(function (r) { return _this._id; });
            _this._test = tests[0];
        }
        return _this;
    }
    Object.defineProperty(testSolver.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(testSolver.prototype, "test", {
        get: function () {
            return this._test;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(testSolver.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (v) {
            this._status = v;
            if (typeof this.onStatusChange !== "function") {
                return;
            }
            this.onStatusChange(this._id, this._status);
        },
        enumerable: false,
        configurable: true
    });
    testSolver.prototype.updateStatus = function (state) {
        this._approved = this._approved && state === true;
    };
    testSolver.prototype.finished = function (state) {
        if (state === true || state === false) {
            this.updateStatus(state);
        }
        this.status = this._approved;
        this._test_pos = 0;
        return this.onFinish(this._id, this.status);
    };
    testSolver.prototype.onMyFinishChild = function (id, resp) {
        var _a;
        if (id.trim().length === 0) {
            throw "[testSolver] onFinishChild cannot receive an empty 'id' of child.";
        }
        if (resp !== true && resp !== false) {
            throw "[testSolver] onFinishChild cannot receive an uncompleted 'resp'.";
        }
        if (typeof this.onFinishChild === "function") {
            this.onFinishChild(id, resp);
        }
        this.updateStatus(resp);
        if (this._test_pos < this.length) {
            return (_a = this.at(this._test_pos++)) === null || _a === void 0 ? void 0 : _a.run();
        }
        this.finished();
    };
    testSolver.prototype.toString = function () {
        return JSON.stringify(this.at(0));
    };
    testSolver.prototype.run = function () {
        var _this = this;
        var _a;
        if (this.status === false || this.status === true) {
            this.finished(this.status);
        }
        this.status = "running";
        if (this._test === null) {
            if (this.length === 0) {
                throw "[testSolver] is empty, but this._test is also null.";
            }
            return (_a = this.at(this._test_pos++)) === null || _a === void 0 ? void 0 : _a.run();
        }
        if (this.length > 0) {
            throw "[testSolver] values ​​defined simultaneously as individual and group in '.run()'.";
        }
        var TEST = this._test;
        this.solver(TEST[0]).then(function (r) {
            _this.finished(String(TEST[1]) === String(r));
        });
    };
    return testSolver;
}(TIterator));
export { testSolver };
//# sourceMappingURL=tester.js.map