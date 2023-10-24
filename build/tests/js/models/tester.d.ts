import { TIterator } from "./iterator";
import { TPrintableEvalResult } from "../../../src/definitions";
export type TTestItemSource = [expression: string, expectedResult: TPrintableEvalResult];
export type TTestResult = "not_started" | "running" | true | false;
export type TFinishTest = (id: string, resp: TTestResult) => void;
export type TSolver = (test: string) => Promise<TPrintableEvalResult>;
export declare class testSolver extends TIterator<testSolver> {
    private readonly solver;
    private readonly onFinish;
    private readonly onFinishChild;
    private readonly onStatusChange;
    private _test;
    private _status;
    private _approved;
    private _test_pos;
    private _id;
    constructor(tests: TTestItemSource[], solver: TSolver, onFinish: TFinishTest, onFinishChild?: null | TFinishTest, onStatusChange?: null | TFinishTest);
    get id(): string;
    get test(): null | TTestItemSource;
    get status(): TTestResult;
    private set status(value);
    protected updateStatus(state: TTestResult): void;
    protected finished(state?: TTestResult): void;
    onMyFinishChild(id: string, resp: TTestResult): void;
    toString(): string;
    run(): void;
}
//# sourceMappingURL=tester.d.ts.map