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
export type TNextedSubItems = (TOneTestItemSource | TNestedTestGroupSource)[];
export type TNestedTestGroupSource = [title: string, tests: TNextedSubItems];
export declare enum EIdentifyTTestGroupSource {
    isTNestedTestGroupSource = 0,
    itsNotAGroup = 1,
    isEmptyGroup = 2,
    notAValidContentTests = 3
}
export type TTestSource = TOneTestItemSource | TNestedTestGroupSource;
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
export type TTestMode = "group" | TOneExplicitTest;
export declare class testSolver extends TIterator<testSolver> implements ItestSolver {
    private readonly solver;
    private readonly onStatusChange;
    private _test;
    private group;
    private _status;
    private _approved;
    private _indexTest;
    private _id;
    private _title;
    constructor(tests: testSolver[] | TTestSource, solver: TSolverCall, onStatusChange?: null | TonTestStatusChange);
    private __startMe;
    static isTOneTestItemSource(x: any): boolean;
    static itsSuperficialGroupCompatibility(x: any): boolean;
    static identifyTTestGroupSource(input: any): EIdentifyTTestGroupSource;
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