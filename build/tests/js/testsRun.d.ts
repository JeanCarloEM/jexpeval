import { TTestSource, TonTestStatusChange, testSolver } from "./models/tester.js";
export declare function createTest(tests: testSolver[] | TTestSource, onStatusChange?: TonTestStatusChange | TonTestStatusChange[]): Promise<testSolver>;
export declare function load(): Promise<object>;
//# sourceMappingURL=testsRun.d.ts.map