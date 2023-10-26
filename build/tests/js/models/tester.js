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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { TIterator } from "./iterator.js";
var testSolver = (function (_super) {
    __extends(testSolver, _super);
    function testSolver(tests, solver, onStatusChange) {
        if (onStatusChange === void 0) { onStatusChange = null; }
        var _this = _super.call(this, (function () {
            if (typeof tests !== "object" || !Array.isArray(tests)) {
                throw "[testSolver] tests parameter isn't object array.";
            }
            if (__spreadArray([], tests, true).length === 0) {
                throw "[testSolver] tests parameter is empty.";
            }
            if (typeof tests[0] !== "string") {
                return tests;
            }
            if (__spreadArray([], tests, true).length < 2) {
                throw "[testSolver] test size is less than 2.";
            }
            if (typeof tests[1] !== "object") {
                return [];
            }
            if (!Array.isArray(tests[1])) {
                throw "[testSolver] tests is not a valid group, as [1] is not an array..";
            }
            var _self = [];
            tests[1].map(function (item) {
                _self.push(new testSolver(item, _this.solver, _this.onMyFinishChild));
            });
            return _self;
        })()) || this;
        _this.solver = solver;
        _this.onStatusChange = onStatusChange;
        _this._test = undefined;
        _this._status = "not_started";
        _this._approved = true;
        _this._indexTest = 0;
        _this._id = "";
        _this._title = "";
        (function (setTitle) {
            if (_this.length > 0) {
                _this._test = null;
                return setTitle(tests[0].trim());
            }
            if (tests[1]) {
                throw "[testSolver] tests[0] parameter in constructor don't contain 2 elements.";
            }
            _this._test = {
                expression: tests[0],
                expectedResult: tests[1],
            };
            if (tests.length === 3) {
                if (typeof tests[2] !== "string") {
                    throw "[testSolver] title isn't string in TOneTestItemSource.";
                }
                tests[2] = tests[2].trim();
                if (tests[2].length > 0) {
                    return setTitle(tests[2]);
                }
            }
            return setTitle(tests[0]);
        })(function (r) { return _this._title; });
        crypto.subtle
            .digest("SHA-256", new TextEncoder().encode(_this.isGroup() ? _this.title : _this.test.expression))
            .then(function (r) { return _this._id; });
        return _this;
    }
    testSolver.prototype.throwIfNotStartedTest = function () {
        if (typeof this._test === undefined) {
            throw "[testSolver] this getter (.test) was called before the definition in the class constructor.";
        }
        return false;
    };
    testSolver.prototype.isGroup = function () {
        return !this.throwIfNotStartedTest() && this._test === null;
    };
    testSolver.prototype.isTest = function () {
        return !this.isGroup();
    };
    Object.defineProperty(testSolver.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(testSolver.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(testSolver.prototype, "test", {
        get: function () {
            this.throwIfNotStartedTest();
            if (typeof this._test === null) {
                throw "[testSolver] this getter (.test) was called on group test.";
            }
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
            this.triggerStatusChange(this);
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
        this._indexTest = 0;
    };
    testSolver.prototype.triggerStatusChange = function (item) {
        typeof this.onStatusChange === "function" &&
            this.onStatusChange(item.id, item.status, item);
    };
    testSolver.prototype.onMyFinishChild = function (id, resp, item) {
        var _a;
        if (id.trim().length === 0) {
            throw "[testSolver] onMyFinishChild receive an empty 'id' of child.";
        }
        if (resp !== true && resp !== false) {
            throw "[testSolver] onMyFinishChild receive an uncompleted 'resp'.";
        }
        item && this.triggerStatusChange(item);
        this.updateStatus(resp);
        if (this._indexTest < this.length) {
            return (_a = this.at(this._indexTest++)) === null || _a === void 0 ? void 0 : _a.run();
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
        if (this.isGroup()) {
            if (this.length === 0) {
                throw "[testSolver] is empty, but this._test is also null.";
            }
            return (_a = this.at(this._indexTest++)) === null || _a === void 0 ? void 0 : _a.run();
        }
        if (this.length > 0) {
            throw "[testSolver] values ​​defined simultaneously as individual and group in '.run()'.";
        }
        this.solver(this.test.expression).then(function (r) {
            _this.finished(String(_this.test.expectedResult) === String(r));
        });
    };
    return testSolver;
}(TIterator));
export { testSolver };
//# sourceMappingURL=tester.js.map