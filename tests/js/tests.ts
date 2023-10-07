import jsep from "jsep";
import * as T from "./tdefs.js";
import * as D from "../../src/definitions.js";
import { jexpeval } from "../../src/jexpeval.js";

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
        (i: string): Promise<jsep.Expression> => {
          return new Promise<jsep.Expression>((R1, R_1) => {
            if (typeof jsep !== "function") {
              throw "JSEP is not defined";
            }

            let resp: jsep.Expression = jsep(i);

            if (typeof resp !== "object") {
              throw "Value returned in JSEP is not array";
            }

            if (!resp.hasOwnProperty("type")) {
              throw "Value returned in JSEP dont contain 'type' item.";
            }

            R1(resp);
          });
        },

        /* CALLER */
        (name: string, args: any[]): Promise<D.TDefaultBaseType> => {
          return new Promise<D.TDefaultBaseType>((R2, R_2) => {
            if (name.trim().toLowerCase() === "tester") {
              return R2("_executided_");
            }

            R2(`\`${name}\``);
          });
        },

        /* VALUES */
        (name: string): Promise<D.TDefaultBaseType> => {
          return new Promise<D.TDefaultBaseType>((R3, R_3) => {
            if (
              (<T.TItemTest>gi).length > 2 &&
              typeof (<T.TItemTest>gi)[2] === "object" &&
              (<object>(<T.TItemTest>gi)[2]).hasOwnProperty(name)
            ) {
              return R3((<D.TStringKeyMap>(<T.TItemTest>gi)[2])[name]);
            }

            R3(`\`${name}\``);
          });
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
