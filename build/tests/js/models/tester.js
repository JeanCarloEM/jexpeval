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
export var EIdentifyTTestGroupSource;
(function (EIdentifyTTestGroupSource) {
    EIdentifyTTestGroupSource[EIdentifyTTestGroupSource["isTNestedTestGroupSource"] = 0] = "isTNestedTestGroupSource";
    EIdentifyTTestGroupSource[EIdentifyTTestGroupSource["itsNotAGroup"] = 1] = "itsNotAGroup";
    EIdentifyTTestGroupSource[EIdentifyTTestGroupSource["isEmptyGroup"] = 2] = "isEmptyGroup";
    EIdentifyTTestGroupSource[EIdentifyTTestGroupSource["notAValidContentTests"] = 3] = "notAValidContentTests";
})(EIdentifyTTestGroupSource || (EIdentifyTTestGroupSource = {}));
var testSolver = (function (_super) {
    __extends(testSolver, _super);
    function testSolver(tests, solver, onStatusChange, delayBetween) {
        if (onStatusChange === void 0) { onStatusChange = []; }
        if (delayBetween === void 0) { delayBetween = 0; }
        var _this = _super.call(this, []) || this;
        _this.solver = solver;
        _this.onStatusChange = onStatusChange;
        _this.delayBetween = delayBetween;
        _this._test = undefined;
        _this.group = undefined;
        _this._status = "not_started";
        _this._approved = true;
        _this._indexTest = 0;
        _this._id = "";
        _this._title = "";
        _this.__startMe(tests);
        return _this;
    }
    testSolver.prototype.__startMe = function (tests) {
        var _this = this;
        var setTitle = function (r) {
            return r.trim().length > 0 ? (_this._title = r.trim()) : false;
        };
        var terminate = function (title) {
            if (title === void 0) { title = ""; }
            setTitle(title);
            if (_this.title.length === 0 && !_this.isGroup()) {
                setTitle(_this.test.expression);
            }
            _this._test = typeof _this._test === "undefined" ? "group" : _this._test;
            var uuid = function () {
                return "uid10000000100040008000100000000000".replace(/[018]/g, function (x) {
                    var c = x;
                    return (c ^
                        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
                });
            };
            var generateUniqueIDforMe = function (force) {
                if (force === void 0) { force = false; }
                new Promise(function (R0, R_0) {
                    if (force) {
                        return R0(uuid());
                    }
                    crypto.subtle
                        .digest("SHA-256", new TextEncoder().encode(_this.title.length > 0 ? _this.title : uuid()))
                        .then(function (r) { return R0(r); });
                }).then(function (r) {
                    var new_uid = typeof r === "string"
                        ? r
                        : "i" +
                            Array.from(new Uint8Array(r))
                                .map(function (b) { return b.toString(16).padStart(2, "0"); })
                                .join("");
                    var isUnique = testSolver.__inputs.ids.indexOf(new_uid) < 0;
                    if (!isUnique && !force && _this.isGroup()) {
                        return generateUniqueIDforMe(true);
                    }
                    if (!isUnique) {
                        throw "[testSolver] duplicated test, '".concat(_this.title, "'");
                    }
                    testSolver.__inputs.tests[testSolver.__inputs.ids.push(new_uid)] =
                        _this;
                    _this._id = new_uid;
                });
            };
            generateUniqueIDforMe();
        };
        var T = testSolver.identifyTTestGroupSource(tests);
        if (T === EIdentifyTTestGroupSource.itsNotAGroup) {
            if (typeof tests !== "object" || !Array.isArray(tests)) {
                throw "[testSolver] tests parameter isn't object array.";
            }
            if (__spreadArray([], tests, true).length === 0) {
                throw "[testSolver] tests parameter is empty.";
            }
            if (typeof tests[0] !== "string") {
                if (typeof tests[0] !== "object" || !(tests[0] instanceof testSolver)) {
                    throw "[testSolver] tests[0] was expected to be a testSolver.";
                }
                this.recreateFrom(tests);
                return terminate();
            }
            if (__spreadArray([], tests, true).length < 2) {
                throw "[testSolver] test size is less than 2.";
            }
            if (testSolver.isTOneTestItemSource(tests)) {
                this._test = {
                    expression: tests[0],
                    expectedResult: tests[1],
                };
                if (tests.length > 2) {
                    this._title = tests[2];
                }
                return terminate();
            }
            throw "[testSolver] parameters tests in testSolver.constructor is not valid (unexpected error).";
        }
        if (tests[1].length === 1) {
            return this.__startMe(tests[1][0]);
        }
        setTitle(tests[0]);
        tests[1].map(function (item) {
            _this.push(new testSolver(item, _this.solver, function (targetId, targetStatus, partial, ref) {
                _this.updateParcialStatus(targetId, targetStatus, partial);
            }, _this.delayBetween));
        });
        return terminate();
    };
    testSolver.getIfIdExists = function (id) {
        var pos = testSolver.__inputs.ids.indexOf(id);
        if (pos < 0) {
            return false;
        }
        return testSolver.__inputs.tests[pos];
    };
    testSolver.isTOneTestItemSource = function (x) {
        return (typeof x === "object" &&
            Array.isArray(x) &&
            x.length >= 2 &&
            typeof x[0] === "string" &&
            (typeof x[1] === "string" ||
                typeof x[1] === "number" ||
                typeof x[1] === "bigint") &&
            (x.length === 2 || (x.length === 3 && typeof x[2] === "string")));
    };
    testSolver.itsSuperficialGroupCompatibility = function (x) {
        return (typeof x === "object" &&
            Array.isArray(x) &&
            x.length === 2 &&
            typeof x[0] === "string" &&
            typeof x[1] === "object" &&
            Array.isArray(x[1]));
    };
    testSolver.identifyTTestGroupSource = function (input) {
        if (!testSolver.itsSuperficialGroupCompatibility(input)) {
            return EIdentifyTTestGroupSource.itsNotAGroup;
        }
        var tests = input[1];
        if (tests.length === 0) {
            return EIdentifyTTestGroupSource.isEmptyGroup;
        }
        return EIdentifyTTestGroupSource.isTNestedTestGroupSource;
    };
    testSolver.prototype.throwIfNotStartedTest = function () {
        if (typeof this._test === "undefined") {
            throw "[testSolver] this getter (.test) was called before the definition in the class constructor.";
        }
        return false;
    };
    testSolver.prototype.isGroup = function () {
        return !this.throwIfNotStartedTest() && this._test === "group";
    };
    testSolver.prototype.isTest = function () {
        return !this.isGroup();
    };
    Object.defineProperty(testSolver.prototype, "title", {
        get: function () {
            return this._title.trim();
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
            if (this._status !== v) {
                this._status = v;
                this.triggerStatusChange(this, this.isGroup() && this._indexTest < this.length);
            }
        },
        enumerable: false,
        configurable: true
    });
    testSolver.prototype.updateParcialStatus = function (targetId, targetStatus, partial) {
        var _this = this;
        if (partial === void 0) { partial = false; }
        if (targetStatus === false || targetStatus === true) {
            if (!this.isGroup()) {
                this.status = targetStatus;
                return;
            }
            this._approved = this._approved && targetStatus;
            if (partial) {
                return this.triggerStatusChange(targetId, targetStatus, true);
            }
            if (this._indexTest < this.length) {
                this.triggerStatusChange(targetId, targetStatus, true);
                (function (run) {
                    if (_this.delayBetween > 0) {
                        return setTimeout(run, _this.delayBetween);
                    }
                    run();
                })(function () {
                    var _a;
                    (_a = _this.at(_this._indexTest++)) === null || _a === void 0 ? void 0 : _a.run();
                });
                return;
            }
            this.status = this._approved;
        }
    };
    testSolver.prototype.addOnStatusChange = function (newOnStatusChange) {
        if (typeof newOnStatusChange !== "function") {
            throw "[testSolver] newOnStatusChange is not a function.";
        }
        if (typeof this.onStatusChange === "function") {
            this.onStatusChange = [this.onStatusChange];
        }
        this.onStatusChange.push(newOnStatusChange);
    };
    testSolver.prototype.triggerStatusChange = function (target, statusOrPartial, partial) {
        var _this = this;
        if (partial === void 0) { partial = false; }
        this.onStatusChange =
            typeof this.onStatusChange === "function"
                ? [this.onStatusChange]
                : this.onStatusChange;
        this.onStatusChange.map(function (f) {
            if (typeof target === "object") {
                if (typeof statusOrPartial !== "boolean") {
                    throw [
                        "[testSolver] triggerStatusChange: statusOrPartial parameter is invalid.",
                        statusOrPartial,
                    ];
                }
                return f(target.id, target.status, statusOrPartial, _this);
            }
            if (typeof statusOrPartial === "undefined") {
                throw [
                    "[testSolver] statusOrPartial: resp parameter is invalid.",
                    statusOrPartial,
                ];
            }
            if (typeof target === "string") {
                return f(target, statusOrPartial, partial, _this);
            }
            throw [
                "[testSolver] triggerStatusChange: target parameter is invalid.",
                target,
            ];
        });
    };
    testSolver.prototype.toString = function () {
        return JSON.stringify(this.at(0));
    };
    testSolver.prototype.run = function () {
        var _this = this;
        var _a;
        if (this.status === false || this.status === true) {
            return this.updateParcialStatus(this.id, this.status, false);
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
            _this.updateParcialStatus(_this.id, String(_this.test.expectedResult) === String(r), false);
        });
    };
    testSolver.__inputs = { ids: [], tests: [] };
    return testSolver;
}(TIterator));
export { testSolver };
//# sourceMappingURL=tester.js.map