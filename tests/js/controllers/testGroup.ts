import * as I from "./testItem.js";
import * as T from "./tester.js";

export type TTestGroup = {
  name: string;
  t: T.TTestItemSource[];
};

export class itemGroup extends T.testSolver {
  private _t: I.testItem[] = [];
  private readonly caption: string;

  constructor(
    finish: T.TFinishTest,
    captionOrOrigin: TTestGroup | string,
    tests: T.TTestItemSource[] = []
  ) {
    super((typeof captionOrOrigin !== "string") ? captionOrOrigin.t : tests, finish);

    if (typeof captionOrOrigin !== "string") {

      this.caption = captionOrOrigin.name;
    } else {
      this.caption = <string>captionOrOrigin;
    }
  }

  /**
     *
     */
  public toString(): string {
    return JSON.stringify(this.at(0));
  }
}
