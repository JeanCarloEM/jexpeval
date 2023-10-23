import * as T from "./tester.js";

export class testItem extends T.testSolver {
  constructor(
    input: T.TTestItemSource,
    finish: T.TFinishTest
  ) {
    super(<T.TTestItemSource[]>[input], finish);
  }
}
