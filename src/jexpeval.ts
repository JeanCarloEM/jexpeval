import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
import { Literal } from "./types/Literal";
import * as unknowParser from "./unknowParser.js";

/**
 * https://ericsmekens.github.io/unknowParser/
 */
export class jexpeval extends baseProcessor {
  /**
   *
   * @param input
   * @returns
   */
  public eval(input: string | unknowParser.Expression): Promise<D.TEvalResult> {
    if (typeof input !== "string") {
      throw "Eval input in jexpeval isnot string";
    }

    return new Promise<D.TEvalResult>((R0, R_0) => {
      this._parser(input).then((r: any) => {
        let tp: null | unknowParser.ExpressionType = (
          this.constructor as typeof jexpeval
        ).getType(r);

        if (tp === null) {
          throw "Invalid type in lex eval.";
        }

        (<baseProcessor>(
          new (<any>global)[tp](this._parser, this._caller, this._values)
        ))
          .eval(<unknowParser.Expression>r)
          .then((r1) => R0(r1))
          .catch((r2) => R_0(r2));
      });
    });
  }
}
