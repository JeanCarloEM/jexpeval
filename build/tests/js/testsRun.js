import { testSolver, } from "./models/tester.js";
export function createTest(tests, onStatusChange, delayBetween) {
    if (onStatusChange === void 0) { onStatusChange = []; }
    if (delayBetween === void 0) { delayBetween = 0; }
    function evaluator(str) {
        return new Promise(function (R0, R_0) {
            R0(1);
        });
    }
    var r = new testSolver(tests, evaluator, onStatusChange, delayBetween);
    return new Promise(function (R0, R_0) {
        function __whilteNoId() {
            return r.id.trim().length === 0 ? setTimeout(__whilteNoId, 1) : R0(r);
        }
        if (typeof r !== "object") {
            throw ["[index.ts (main)] is not object.", r];
        }
        __whilteNoId();
    });
}
export function load(onStatusChange, delayBetween) {
    if (onStatusChange === void 0) { onStatusChange = []; }
    if (delayBetween === void 0) { delayBetween = 0; }
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
            .then(function (r1) { return createTest(r1, onStatusChange, delayBetween); })
            .catch(function (r) {
            throw "Fail to create test from json.";
        })
            .then(function (r) { return R0(r); });
    });
}
//# sourceMappingURL=testsRun.js.map