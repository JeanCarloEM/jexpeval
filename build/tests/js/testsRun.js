import { testSolver, } from "./models/tester.js";
export function createTest(tests, onStatusChange) {
    if (onStatusChange === void 0) { onStatusChange = null; }
    function evaluate(str) {
        return new Promise(function (R0, R_0) {
            R0(0);
        });
    }
    return new testSolver(tests, evaluate, onStatusChange);
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