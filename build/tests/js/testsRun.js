import { testSolver, } from "./models/tester.js";
export function createTest(tests, onStatusChange, delayBetween, inWebwork) {
    if (onStatusChange === void 0) { onStatusChange = []; }
    if (delayBetween === void 0) { delayBetween = 0; }
    if (inWebwork === void 0) { inWebwork = false; }
    function evaluator(str) {
        return new Promise(function (R0) {
            R0(1);
        });
    }
    return new Promise(function (R0, R_0) {
        var r = new testSolver(tests, evaluator, onStatusChange, delayBetween);
        function _whileWithoutId() {
            return r.id.trim().length === 0 ? setTimeout(_whileWithoutId, 1) : R0(r);
        }
        if (typeof r !== "object") {
            throw ["[index.ts (main)] is not object.", r];
        }
        _whileWithoutId();
    });
}
export function load(onStatusChange, delayBetween, inWebwork) {
    if (onStatusChange === void 0) { onStatusChange = []; }
    if (delayBetween === void 0) { delayBetween = 0; }
    if (inWebwork === void 0) { inWebwork = false; }
    return new Promise(function (R0, R_0) {
        console.log("Loading tests.");
        window
            .fetch("tests.json")
            .catch(function (r) {
            throw "Fail to download tests;json.";
        })
            .then(function (r) { return r.json(); })
            .catch(function (r) {
            throw "Fail load tests as json.";
        })
            .then(function (r) {
            return new Promise(function (R1) {
                console.log("Tests is loaded.");
                R1(r);
            });
        })
            .then(function (r1) {
            return createTest(r1, onStatusChange, delayBetween, inWebwork);
        })
            .catch(function (r) {
            throw "Fail to create test from json.";
        })
            .then(function (r) { return R0(r); });
    });
}
//# sourceMappingURL=testsRun.js.map