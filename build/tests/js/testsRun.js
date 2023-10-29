import { testSolver, } from "./models/tester.js";
export function createTest(tests, onStatusChange, delayBetween) {
    if (onStatusChange === void 0) { onStatusChange = []; }
    if (delayBetween === void 0) { delayBetween = 0; }
    function evaluator(str) {
        return new Promise(function (R0, R_0) {
            R0(1);
        });
    }
    console.error([delayBetween]);
    var r = new testSolver(tests, evaluator, onStatusChange, delayBetween);
    console.warn([delayBetween]);
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
export function load() {
    return new Promise(function (R0, R_0) {
        console.log("Loading tests.");
        window
            .fetch("tests.json")
            .then(function (r) { return r.json(); })
            .then(function (r) {
            console.log("Tests is loaded.");
            R0(r);
        })
            .catch(function (r) {
            console.log("Fail load tests.");
        });
    });
}
//# sourceMappingURL=testsRun.js.map