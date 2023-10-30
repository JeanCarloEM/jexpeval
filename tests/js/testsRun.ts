import jsep from "jsep";
import * as T from "../../src/definitions";
import { jexpeval } from "../../src/jexpeval.js";
import * as unknowParser from "../../src/unknowParser.js";
import {
  TTestSource,
  TonTestStatusChange,
  testSolver,
} from "./models/tester.js";

export function createTest(
  tests: testSolver[] | TTestSource,
  onStatusChange: TonTestStatusChange | TonTestStatusChange[] = [],
  delayBetween: number = 0,
): Promise<testSolver> {
  function evaluator(str: string): Promise<T.TPrintableEvalResult> {
    /*
    function _jsepEval(input: string): Promise<unknowParser.Expression> {
      return new Promise<unknowParser.Expression>((R1, R_1) => {

      });
    }
*/
    return new Promise<T.TPrintableEvalResult>((R0) => {
      R0(1);
      //jexpeval.runAsWorker(str, true, _jsepEval).then((r) => R0(r));
    });
  }

  const r = new testSolver(tests, evaluator, onStatusChange, delayBetween);

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

export function load(
  onStatusChange: TonTestStatusChange | TonTestStatusChange[] = [],
  delayBetween: number = 0,
): Promise<object> {
  return new Promise<Object>((R0, R_0) => {
    console.log("Loading tests.");

    window
      .fetch("tests.json")
      .catch((r: any) => {
        throw "Fail to download tests;json.";
      })
      .then((r: any) => r.json())
      .catch((r: any) => {
        throw "Fail load tests as json.";
      })
      .then((r: object) => {
        return new Promise<Object>((R1) => {
          console.log("Tests is loaded.");
          R1(r);
        });
      })
      .then((r1) => createTest(<TTestSource>r1, onStatusChange, delayBetween))
      .catch((r: any) => {
        throw "Fail to create test from json.";
      })
      .then((r) => R0(r));
  });
}
