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

export type TNextedSubItems = (TOneTestItemSource | TNestedTestGroupSource)[];

export type TNestedTestGroupSource = [title: string, tests: TNextedSubItems];

export enum EIdentifyTTestGroupSource {
  isTNestedTestGroupSource = 0,
  itsNotAGroup = 1,
  isEmptyGroup = 2,
  notAValidContentTests = 3,
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

export type TonTestStatusChange = (
  /* the id of the test that generated the event */
  targetId: string,
  /* the status of the test that generated the event */
  targetStatus: TTestResult,
  /* true it is a non-conclusive event */
  partial: boolean,
  /* the test object that generated the event */
  ref?: ItestSolver,
) => void;

export type TSolverCall = (str: string) => Promise<TPrintableEvalResult>;

export type TTestMode = "group" | TOneExplicitTest;

export type TCreatedTests = {
  ids: string[];
  tests: testSolver[];
};

export class testSolver extends TIterator<testSolver> implements ItestSolver {
  private static __inputs: TCreatedTests = { ids: [], tests: [] };
  private _test: undefined | TTestMode = undefined;
  private group: undefined | TNestedTestGroupSource = undefined;
  private _status: TTestResult = "not_started";
  private _approved: boolean = true;
  private _indexTest: number = 0;
  private _id: string = "";
  private _title: string = "";

  constructor(
    tests: testSolver[] | TTestSource,
    private readonly solver: TSolverCall,
    private onStatusChange: TonTestStatusChange | TonTestStatusChange[] = [],
    private delayBetween: number = 0,
  ) {
    super(<testSolver[]>[]);
    this.__startMe(tests);
  }

  /**
   * recursive constructor
   *
   * @param tests
   * @returns
   */
  private __startMe(tests: testSolver[] | TTestSource): void {
    const setTitle = (r: string) =>
      r.trim().length > 0 ? (this._title = r.trim()) : false;

    const terminate = (title: string = "") => {
      setTitle(title);

      /* try generate title */
      if (this.title.length === 0 && !this.isGroup()) {
        setTitle(this.test.expression);
      }

      this._test = typeof this._test === "undefined" ? "group" : this._test;

      const uuid = () => {
        return "uid10000000100040008000100000000000".replace(/[018]/g, (x) => {
          const c: any = <any>x;
          return (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16);
        });
      };

      const generateUniqueIDforMe = (force: boolean = false) => {
        /* generate id */
        new Promise<any>((R0, R_0) => {
          if (force) {
            return R0(uuid());
          }
          crypto.subtle
            .digest(
              "SHA-256",
              new TextEncoder().encode(
                this.title.length > 0 ? this.title : uuid(),
              ),
            )
            .then((r) => R0(r));
        }).then((r) => {
          const new_uid =
            typeof r === "string"
              ? r
              : "i" +
                Array.from(new Uint8Array(r))
                  .map((b) => b.toString(16).padStart(2, "0"))
                  .join("");

          const isUnique: boolean =
            testSolver.__inputs.ids.indexOf(new_uid) < 0;

          if (!isUnique && !force && this.isGroup()) {
            return generateUniqueIDforMe(true);
          }

          if (!isUnique) {
            console.error(`[testSolver] duplicated test, '${this.title}'`);
          }

          testSolver.__inputs.tests[testSolver.__inputs.ids.push(new_uid)] =
            this;

          this._id = new_uid;
        });
      };

      generateUniqueIDforMe();
    };

    const T: EIdentifyTTestGroupSource =
      testSolver.identifyTTestGroupSource(tests);

    /**
     * It's not a group
     */
    if (T === EIdentifyTTestGroupSource.itsNotAGroup) {
      if (typeof tests !== "object" || !Array.isArray(tests)) {
        throw "[testSolver] tests parameter isn't object array.";
      }

      if ([...tests].length === 0) {
        throw "[testSolver] tests parameter is empty.";
      }

      /*
       * 1/3: It's probably the testSolver[], pass this to the iterator
       */
      if (typeof tests[0] !== "string") {
        if (typeof tests[0] !== "object" || !(tests[0] instanceof testSolver)) {
          throw "[testSolver] tests[0] was expected to be a testSolver.";
        }

        this.recreateFrom(<testSolver[]>tests);
        return terminate();
      }

      /**
       * 2/3: is probably a TOneTestItemSource
       */

      if ([...tests].length < 2) {
        throw "[testSolver] test size is less than 2.";
      }

      if (testSolver.isTOneTestItemSource(tests)) {
        this._test = <TOneExplicitTest>{
          expression: tests[0],
          expectedResult: tests[1],
        };

        if (tests.length > 2) {
          this._title = <string>(<TOneTestItemSource>tests)[2];
        }

        return terminate();
      }

      throw "[testSolver] parameters tests in testSolver.constructor is not valid (unexpected error).";
    }

    /**
     * 3/3: A. Group with only one element
     */
    if ((<TNestedTestGroupSource>tests)[1].length === 1) {
      /* reset tests to one sub test */
      return this.__startMe(<TTestSource>(<TNestedTestGroupSource>tests)[1][0]);
    }

    /**
     * 3/3: B. It's probably a group with many elements
     */
    setTitle((<TNestedTestGroupSource>tests)[0]);

    (<TNestedTestGroupSource>tests)[1].map((item) => {
      this.push(
        new testSolver(
          item,
          this.solver,
          (
            targetId: string,
            targetStatus: TTestResult,
            partial: boolean,
            ref?: ItestSolver,
          ) => {
            this.updateParcialStatus(targetId, targetStatus, partial);
          },
          this.delayBetween,
        ),
      );
    });

    return terminate();
  }

  /**
   *
   * @param id
   * @returns
   */
  public static getIfIdExists(id: string): false | testSolver {
    const pos: number = testSolver.__inputs.ids.indexOf(id);

    if (pos < 0) {
      return false;
    }

    return testSolver.__inputs.tests[pos];
  }

  /**
   * check if X is compatible with [string, TPrintableEvalResult, string?]
   *
   * @param x
   * @returns
   */
  public static isTOneTestItemSource(x: any): boolean {
    return (
      /* is a array */
      typeof x === "object" &&
      Array.isArray(x) &&
      /* is a compatible array [string, TPrintableEvalResult, string?] */
      x.length >= 2 &&
      /* [1] is compatible  TPrintableEvalResult */
      typeof x[0] === "string" &&
      (typeof x[1] === "string" ||
        typeof x[1] === "number" ||
        typeof x[1] === "bigint") &&
      /* [2] is compatible string */
      (x.length === 2 || (x.length === 3 && typeof x[2] === "string"))
    );
  }

  /**
   * check if X is compatibility with [string, []]
   *
   * @param x
   * @returns
   */
  public static itsSuperficialGroupCompatibility(x: any): boolean {
    return (
      /* is a array */
      typeof x === "object" &&
      Array.isArray(x) &&
      /* is not a compatible array [string, []] */
      x.length === 2 &&
      typeof x[0] === "string" &&
      typeof x[1] === "object" &&
      Array.isArray(x[1])
    );
  }

  /**
   *
   * @param input
   * @returns
   */
  public static identifyTTestGroupSource(
    input: any,
  ): EIdentifyTTestGroupSource {
    /**
     * FIRST compatibility check
     */

    if (!testSolver.itsSuperficialGroupCompatibility(input)) {
      return EIdentifyTTestGroupSource.itsNotAGroup;
    }

    /**
     * is PROBABLY compatible with a group
     */

    const tests: TNextedSubItems = input[1];

    if (tests.length === 0) {
      return EIdentifyTTestGroupSource.isEmptyGroup;
    }

    /**
     * IS compatible with a group
     * Check whether inputs[1] (tests) is compatible with TOneTestItemSource or TNestedTestGroupSource
     */
    return EIdentifyTTestGroupSource.isTNestedTestGroupSource;
  }

  /**
   *
   * @returns
   */
  private throwIfNotStartedTest(): boolean {
    if (typeof this._test === "undefined") {
      throw "[testSolver] this getter (.test) was called before the definition in the class constructor.";
    }

    return false;
  }

  /**
   *
   * @param x
   */
  public isGroup(): boolean {
    return !this.throwIfNotStartedTest() && this._test === "group";
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
    return this._title.trim();
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
    if (this._status !== v) {
      this._status = v;

      console.log(`'${this.title}' finished.`);

      this.triggerStatusChange(
        this,
        this.isGroup() && this._indexTest < this.length,
      );
    }
  }

  /**
   *
   * @param targetStatus
   */
  protected updateParcialStatus(
    targetId: string,
    targetStatus: TTestResult,
    partial: boolean = false,
  ): void {
    if (targetStatus === false || targetStatus === true) {
      if (!this.isGroup()) {
        this.status = targetStatus;
        return;
      }

      this._approved = this._approved && targetStatus;

      if (partial) {
        return this.triggerStatusChange(targetId, targetStatus, true);
      }

      if (this._indexTest < this.length) {
        console.warn(`'${this.title}' rodou o próximo.`);
        this.triggerStatusChange(targetId, targetStatus, true);
        ((run) => {
          if (this.delayBetween > 0) {
            return setTimeout(run, this.delayBetween);
          }

          run();
        })(() => {
          this.at(this._indexTest++)?.run();
        });
        return;
      }

      this.status = this._approved;
    }
  }

  /**
   *
   * @param newOnStatusChange
   */
  public addOnStatusChange(newOnStatusChange: TonTestStatusChange): void {
    if (typeof newOnStatusChange !== "function") {
      throw "[testSolver] newOnStatusChange is not a function.";
    }

    if (typeof this.onStatusChange === "function") {
      this.onStatusChange = [this.onStatusChange];
    }

    (<TonTestStatusChange[]>this.onStatusChange).push(newOnStatusChange);
  }

  /**
   *
   * @param item the test object that caused the event
   */
  private triggerStatusChange(target: ItestSolver, partial: boolean): void;

  /**
   *
   * @param targetIs the id of the test that generated the event
   * @param targetStatus the status of the test that generated the event
   * @param red the test object that caused the event
   */
  private triggerStatusChange(
    targetId: string,
    targetStatus: TTestResult,
    partial: boolean,
  ): void;

  /**
   *
   * @param target the id of the test that generated the event or the object test itself
   * @param status the status of the test that generated the event or the test itself
   * @param ref the test object that caused the event
   */
  private triggerStatusChange(
    target: string | ItestSolver,
    statusOrPartial?: TTestResult | boolean,
    partial: boolean = false,
  ): void {
    this.onStatusChange =
      typeof this.onStatusChange === "function"
        ? [this.onStatusChange]
        : this.onStatusChange;

    (<TonTestStatusChange[]>this.onStatusChange).map((f) => {
      if (typeof target === "object") {
        if (typeof statusOrPartial !== "boolean") {
          throw [
            `[testSolver] triggerStatusChange: statusOrPartial parameter is invalid.`,
            statusOrPartial,
          ];
        }

        return f(
          (<ItestSolver>target).id,
          (<ItestSolver>target).status,
          <boolean>statusOrPartial,
          this,
        );
      }

      if (typeof statusOrPartial === "undefined") {
        throw [
          `[testSolver] statusOrPartial: resp parameter is invalid.`,
          statusOrPartial,
        ];
      }

      if (typeof target === "string") {
        return f(target, <TTestResult>statusOrPartial, partial, this);
      }

      throw [
        `[testSolver] triggerStatusChange: target parameter is invalid.`,
        target,
      ];
    });
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
      return this.updateParcialStatus(this.id, this.status, false);
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
      this.updateParcialStatus(
        this.id,
        String(this.test.expectedResult) === String(r),
        false,
      );
    });
  }
}
