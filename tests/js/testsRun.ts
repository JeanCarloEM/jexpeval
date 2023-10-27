import * as T from "../../src/definitions";
import {
  TTestSource,
  TonTestStatusChange,
  testSolver,
} from "./models/tester.js";

export function createTest(
  tests: testSolver[] | TTestSource,
  onStatusChange: null | TonTestStatusChange = null,
): testSolver {
  function evaluate(str: string): Promise<T.TPrintableEvalResult> {
    return new Promise<T.TPrintableEvalResult>((R0, R_0) => {
      R0(0);
    });
  }

  return new testSolver(tests, evaluate, onStatusChange);
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
