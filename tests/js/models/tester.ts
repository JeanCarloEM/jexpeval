import { TIterator } from "./iterator";
import { TPrintableEvalResult } from "../../../src/definitions";
import { Expression } from "jsep";

export type TOneTestItemSource = [
  expression: string,
  expectedResult: TPrintableEvalResult,
  title?: string,
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

export type TonTestStatusChange = (
  id: string,
  resp: TTestResult,
  item?: ItestSolver,
) => void;

export type TSolverCall = (str: string) => Promise<TPrintableEvalResult>;

export type TTestMode = "group" | "test";

export class testSolver extends TIterator<testSolver> implements ItestSolver {
  private _test: null | undefined | TOneExplicitTest = undefined;
  private _status: TTestResult = "not_started";
  private _approved: boolean = true;
  private _indexTest: number = 0;
  private _id: string = "";
  private _title: string = "";

  constructor(
    tests: testSolver[] | TTestSource,
    private readonly solver: TSolverCall,
    private readonly onStatusChange: null | TonTestStatusChange = null,
  ) {
    super(
      <testSolver[]>(() => {
        if (typeof tests !== "object" || !Array.isArray(tests)) {
          throw "[testSolver] tests parameter isn't object array.";
        }

        if ([...tests].length === 0) {
          throw "[testSolver] tests parameter is empty.";
        }

        /* is a array of testSolver, passthrough this for iterator */
        if (typeof tests[0] !== "string") {
          return tests;
        }

        if ([...tests].length < 2) {
          throw "[testSolver] test size is less than 2.";
        }

        /* Is a one test, passthrough empty for iterator */
        if (typeof tests[1] !== "object") {
          return [];
        }

        /* is a test group,  */

        if (!Array.isArray(tests[1])) {
          throw "[testSolver] tests is not a valid group, as [1] is not an array..";
        }

        /* is TTestSource */

        var _self: testSolver[] = [];

        tests[1].map((item) => {
          _self.push(new testSolver(item, this.solver, this.onMyFinishChild));
        });

        return _self;
      })(),
    );

    ((setTitle) => {
      /* set type mode as group */
      if (this.length > 0) {
        this._test = null;
        return setTitle((<TTestSource>tests)[0].trim());
      }

      /* is test */

      if (tests[1]) {
        throw "[testSolver] tests[0] parameter in constructor don't contain 2 elements.";
      }

      /* set test */
      this._test = <TOneExplicitTest>{
        expression: tests[0],
        expectedResult: tests[1],
      };

      /* if title is passed in ONE test */
      if (tests.length === 3) {
        if (typeof tests[2] !== "string") {
          throw `[testSolver] title isn't string in TOneTestItemSource.`;
        }

        tests[2] = tests[2].trim();

        if (tests[2].length > 0) {
          return setTitle(tests[2]);
        }
      }

      /* no title, set a test value */
      return setTitle((<TTestSource>tests)[0]);
    })((r: string) => this._title);

    /* generate id */
    crypto.subtle
      .digest(
        "SHA-256",
        new TextEncoder().encode(
          this.isGroup() ? this.title : this.test.expression,
        ),
      )
      .then((r) => this._id);
  }

  private throwIfNotStartedTest(): boolean {
    if (typeof this._test === undefined) {
      throw "[testSolver] this getter (.test) was called before the definition in the class constructor.";
    }

    return false;
  }

  /**
   *
   * @param x
   */
  public isGroup(): boolean {
    return !this.throwIfNotStartedTest() && this._test === null;
  }

  /**
   *
   * @param x
   */
  public isTest(): boolean {
    return !this.isGroup();
  }

  /**
   *
   */
  public get title(): string {
    return this._title;
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
  public get test(): TOneExplicitTest {
    this.throwIfNotStartedTest();

    if (typeof this._test === null) {
      throw "[testSolver] this getter (.test) was called on group test.";
    }

    return <TOneExplicitTest>this._test;
  }

  /**
   *
   */
  public get status(): TTestResult {
    return this._status;
  }

  private set status(v: TTestResult) {
    this._status = v;
    this.triggerStatusChange(this);
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
    this._indexTest = 0;
  }

  /**
   *
   * @param item
   */
  private triggerStatusChange(item: ItestSolver) {
    typeof this.onStatusChange === "function" &&
      this.onStatusChange(item.id, item.status, item);
  }

  /**
   *
   */
  public onMyFinishChild(
    id: string,
    resp: TTestResult,
    item?: ItestSolver,
  ): void {
    if (id.trim().length === 0) {
      throw "[testSolver] onMyFinishChild receive an empty 'id' of child.";
    }

    if (resp !== true && resp !== false) {
      throw "[testSolver] onMyFinishChild receive an uncompleted 'resp'.";
    }

    item && this.triggerStatusChange(item);

    this.updateStatus(resp);

    if (this._indexTest < this.length) {
      return this.at(this._indexTest++)?.run();
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

    if (this.isGroup()) {
      if (this.length === 0) {
        throw "[testSolver] is empty, but this._test is also null.";
      }

      return this.at(this._indexTest++)?.run();
    }

    /* run myself test */

    if (this.length > 0) {
      throw "[testSolver] values ​​defined simultaneously as individual and group in '.run()'.";
    }

    this.solver(this.test.expression).then((r: TPrintableEvalResult) => {
      /* if it is a number or string, normalizes both as string */
      this.finished(String(this.test.expectedResult) === String(r));
    });
  }
}
