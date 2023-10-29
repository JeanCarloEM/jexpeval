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
export type TonTestStatusChange = (targetId: string, targetStatus: TTestResult, partial: boolean, ref?: ItestSolver) => void;
export type TSolverCall = (str: string) => Promise<TPrintableEvalResult>;
export type TTestMode = "group" | TOneExplicitTest;
export type TCreatedTests = {
    ids: string[];
    tests: testSolver[];
};
export declare class testSolver extends TIterator<testSolver> implements ItestSolver {
    private readonly solver;
    private onStatusChange;
    private static __inputs;
    private _test;
    private group;
    private _status;
    private _approved;
    private _indexTest;
    private _id;
    private _title;
    constructor(tests: testSolver[] | TTestSource, solver: TSolverCall, onStatusChange?: TonTestStatusChange | TonTestStatusChange[]);
    private __startMe;
    static getIfIdExists(id: string): false | testSolver;
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
    protected updateParcialStatus(targetId: string, targetStatus: TTestResult, partial?: boolean): void;
    addOnStatusChange(newOnStatusChange: TonTestStatusChange): void;
    private triggerStatusChange;
    toString(): string;
    run(): void;
}
//# sourceMappingURL=tester.d.ts.map