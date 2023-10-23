import { TIterator } from "./iterator";
import { TPrintableEvalResult } from "../../../src/definitions";

export type TTestItemSource = [string, TPrintableEvalResult];

export type TTestResult = "running" | "not_started" | true | false;

export type TFinishTest = (id: string, resp: TTestResult) => void;

export type TSolver = (test: string) => Promise<TPrintableEvalResult>;

export class testSolver extends TIterator<testSolver> {
  private _test: null | TTestItemSource = null;
  private _status: TTestResult = "not_started";
  private _approved: boolean = true;
  private _test_pos: number = 0;
  private _id: string = "";

  constructor(
    tests: TTestItemSource[],
    private readonly solver: TSolver,
    private readonly onFinish: TFinishTest,
    private readonly onFinishChild: null | TFinishTest = null,
    private readonly onStatusChange: null | TFinishTest = null,
  ) {
    super(
      <testSolver[]>(() => {
        let _self: testSolver[] = [];

        if (tests.length > 1) {
          tests.map((item) => {
            _self.push(
              new testSolver([item], this.solver, this.onMyFinishChild),
            );
          });

          return _self;
        }

        return [];
      })(),
    );

    if (tests.length === 1) {
      if (tests[0].length !== 2) {
        throw "[testSolver] tests[0] in constructor don't contain 2 elements.";
      }

      if (typeof tests[0][0] !== "string") {
        throw "[testSolver] tests[0][0] in constructor isn't string.";
      }

      if (tests[0][0].trim().length === 0) {
        throw "[testSolver] tests[0][0] in constructor is empty.";
      }

      crypto.subtle
        .digest("SHA-256", new TextEncoder().encode(tests[0][0].trim()))
        .then((r) => this._id);
      this._test = tests[0];
    }
  }

  /**
   *
   */
  public get id(): string {
    return this._id;
  }

  /**
   *
   */
  public get test(): null | TTestItemSource {
    return this._test;
  }

  /**
   *
   */
  public get status(): TTestResult {
    return this._status;
  }

  private set status(v: TTestResult) {
    this._status = v;

    if (typeof this.onStatusChange !== "function") {
      return;
    }

    this.onStatusChange(this._id, this._status);
  }

  /**
   *
   * @param state
   */
  protected updateStatus(state: TTestResult): void {
    this._approved = this._approved && state === true;
  }

  /**
   *
   */
  protected finished(state?: TTestResult): void {
    if (state === true || state === false) {
      this.updateStatus(state);
    }

    this.status = this._approved;
    this._test_pos = 0;
    return this.onFinish(this._id, this.status);
  }

  /**
   *
   */
  public onMyFinishChild(id: string, resp: TTestResult): void {
    if (id.trim().length === 0) {
      throw "[testSolver] onFinishChild cannot receive an empty 'id' of child.";
    }

    if (resp !== true && resp !== false) {
      throw "[testSolver] onFinishChild cannot receive an uncompleted 'resp'.";
    }

    /* trigger an eventual event, if there is a callback  */
    if (typeof this.onFinishChild === "function") {
      this.onFinishChild(id, resp);
    }

    this.updateStatus(resp);

    if (this._test_pos < this.length) {
      return this.at(this._test_pos++)?.run();
    }

    this.finished();
  }

  /**
   *
   */
  public toString(): string {
    return JSON.stringify(this.at(0));
  }

  /**
   *
   * @returns
   */
  public run(): void {
    /* ist finished */
    if (this.status === false || this.status === true) {
      this.finished(this.status);
    }

    this.status = "running";

    /* Run first child */
    if (this._test === null) {
      if (this.length === 0) {
        throw "[testSolver] is empty, but this._test is also null.";
      }

      return this.at(this._test_pos++)?.run();
    }

    /* run myself test */
    if (this.length > 0) {
      throw "[testSolver] values ​​defined simultaneously as individual and group in '.run()'.";
    }

    const TEST: TTestItemSource = this._test;

    this.solver(TEST[0]).then((r: TPrintableEvalResult) => {
      /* if it is a number or string, normalizes both as string */
      this.finished(String(TEST[1]) === String(r));
    });
  }
}