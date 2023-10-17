import * as T from "./tdefs.js";
import * as D from "../../src/definitions.js";
import { jexpeval } from "../../src/jexpeval.js";
import * as unknowParser from "../../src/unknowParser.js";
import * as jsep from "jsep";

/**
 * https://ericsmekens.github.io/jsep/
 */
export class tests {
  /**
   *
   * @param input
   * @param onItem
   * @returns
   */
  public static run_item(
    input: T.TItemTest[],
    onItem: null | T.TOnItem = null,
    pre_r: boolean = true,
  ): Promise<boolean> {
    if (!Array.isArray(input)) {
      throw "input in test.run_item is not array";
    }

    return new Promise<boolean>((R0, R_0) => {
      if (input.length === 0) {
        return R0(pre_r);
      }

      let gi: T.TItemTest | undefined = input.shift();

      if (typeof gi === "undefined") {
        throw "item in test.run_item is undefined";
      }

      if (!Array.isArray(gi)) {
        throw "item in test.run_item is not array";
      }

      if (gi.length < 2) {
        throw "item in test.run_item len is less 2";
      }

      new jexpeval(
        /* PARSER */
        (i: string): Promise<unknowParser.Expression> => {
          console.log("z");
          return jexpeval.genericCallerUnknowParser(jsep, i);
        },
      )
        .eval(<string>gi[0])
        .then((r: D.TDefaultBaseType) => {
          let rr: boolean = Array.isArray(gi) && gi.length > 1 && r === gi[1];
          onItem !== null && onItem((<T.TItemTest>gi)[0], rr);

          this.run_item(input, onItem, pre_r && rr).then((r1) => R0(r1));
        });
    });
  }

  /**
   *
   * @param input
   * @param onItem
   * @param onGroup
   * @param onGoupFinish
   * @returns
   */
  public static run(
    input: T.TItemGroup[],
    onItem: null | T.TOnItem = null,
    onGroup: null | T.TOnGroup = null,
    onGoupFinish: null | T.TOnFinish = null,
    pre_r: boolean = true,
  ): Promise<boolean> {
    if (!Array.isArray(input)) {
      throw "input in test.run isnot array";
    }

    return new Promise<boolean>((R0, R_0) => {
      if (input.length === 0) {
        return R0(pre_r);
      }

      let gv: T.TItemGroup | undefined = input.shift();

      if (typeof gv === "undefined") {
        throw "item in test.run is undefined";
      }

      onGroup !== null && onGroup(gv.name);

      this.run_item(gv.t, onItem).then((r: boolean) => {
        onGoupFinish !== null && onGoupFinish((<T.TItemGroup>gv).name, r);

        this.run(input, onItem, onGroup, onGoupFinish, pre_r && r).then((r) =>
          R0(r),
        );
      });
    });
  }
}
