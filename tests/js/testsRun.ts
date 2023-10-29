import * as T from "../../src/definitions";
import {
  TTestSource,
  TonTestStatusChange,
  testSolver,
} from "./models/tester.js";

export function createTest(
  tests: testSolver[] | TTestSource,
  onStatusChange: TonTestStatusChange | TonTestStatusChange[] = [],
): Promise<testSolver> {
  function evaluate(str: string): Promise<T.TPrintableEvalResult> {
    return new Promise<T.TPrintableEvalResult>((R0, R_0) => {
      R0(1);
    });
  }

  const r = new testSolver(tests, evaluate, onStatusChange);

  return new Promise<testSolver>((R0, R_0) => {
    function __whilteNoId(): any {
      return r.id.trim().length === 0 ? setTimeout(__whilteNoId, 1) : R0(r);
    }

    if (typeof r !== "object") {
      throw ["[index.ts (main)] is not object.", r];
    }

    __whilteNoId();
  });
}

export function load(): Promise<object> {
  return new Promise<Object>((R0, R_0) => {
    console.log("Loading tests.");

    window
      .fetch("tests.json")
      .then((r: any) => r.json())
      .then((r: object) => {
        console.log("Tests is loaded.");
        R0(r);
      })
      .catch((r: any) => {
        console.log("Fail load tests.");
      });
  });
}
