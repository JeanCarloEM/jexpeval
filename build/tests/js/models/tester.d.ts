import { TIterator } from "./iterator";
import { TPrintableEvalResult } from "../../../src/definitions";
export type TOneTestItemSource = [
    expression: string,
    expectedResult: TPrintableEvalResult,
    title?: string
];
export type TOneExplicitTest = {
    expression: string;
    expectedResult: TPrintableEvalResult;
};
export type TTestGroupSource = [title: string, tests: TOneTestItemSource[]];
export type TTestSource = TOneTestItemSource | TTestGroupSource;
export type TTestResult = "not_started" | "running" | true | false;
export interface ItestSolver {
    id: string;
    status: TTestResult;
    title: string;
    test: TOneExplicitTest;
    isGroup: () => boolean;
    isTest: () => boolean;
}
export type TonTestStatusChange = (id: string, resp: TTestResult, item?: ItestSolver) => void;
export type TSolverCall = (str: string) => Promise<TPrintableEvalResult>;
export type TTestMode = "group" | "test";
export declare class testSolver extends TIterator<testSolver> implements ItestSolver {
    private readonly solver;
    private readonly onStatusChange;
    private _test;
    private _status;
    private _approved;
    private _indexTest;
    private _id;
    private _title;
    constructor(tests: testSolver[] | TTestSource, solver: TSolverCall, onStatusChange?: null | TonTestStatusChange);
    private throwIfNotStartedTest;
    isGroup(): boolean;
    isTest(): boolean;
    get title(): string;
    get id(): string;
    get test(): TOneExplicitTest;
    get status(): TTestResult;
    private set status(value);
    protected updateStatus(state: TTestResult): void;
    protected finished(state?: TTestResult): void;
    private triggerStatusChange;
    onMyFinishChild(id: string, resp: TTestResult, item?: ItestSolver): void;
    toString(): string;
    run(): void;
}
//# sourceMappingURL=tester.d.ts.map