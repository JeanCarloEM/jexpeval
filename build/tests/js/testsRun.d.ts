import { TTestSource, TonTestStatusChange, testSolver } from "./models/tester.js";
export declare function createTest(tests: testSolver[] | TTestSource, onStatusChange?: TonTestStatusChange | TonTestStatusChange[], delayBetween?: number, inWebwork?: boolean): Promise<testSolver>;
export declare function load(onStatusChange?: TonTestStatusChange | TonTestStatusChange[], delayBetween?: number, inWebwork?: boolean): Promise<object>;
//# sourceMappingURL=testsRun.d.ts.map